from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
import hashlib
from datetime import datetime

from app.database import get_db
from app.models.models import AnalysisHistory, UserPreference
from app.schemas.schemas import AnalysisRequest, AnalysisResponse, IngredientInfo
from app.services.ocr_service import ocr_service
from app.services.ai_service import ai_service

router = APIRouter()


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_product(
    file: UploadFile = File(...),
    session_id: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Analyze a product image:
    1. Extract text using OCR
    2. Parse ingredients
    3. Analyze using AI
    4. Store in database
    """
    try:
        # Read image file
        image_bytes = await file.read()
        
        # Generate hash for deduplication
        image_hash = hashlib.sha256(image_bytes).hexdigest()
        
        # Step 1: OCR - Extract text from image
        ocr_result = await ocr_service.extract_text_from_image(image_bytes)
        extracted_text = ocr_result.get("extracted_text", "")
        ocr_confidence = ocr_result.get("confidence", 0.0)
        
        if not extracted_text:
            raise HTTPException(
                status_code=400,
                detail="No text could be extracted from the image. Please ensure the image is clear and contains readable text."
            )
        
        # Step 2: Parse ingredients from extracted text
        ingredients_list = ocr_service.preprocess_ingredient_text(extracted_text)
        
        if not ingredients_list:
            raise HTTPException(
                status_code=400,
                detail="No ingredients could be identified in the text. Please ensure the image contains an ingredient list."
            )
        
        # Step 3: Get user preferences if session_id provided
        user_prefs = None
        if session_id:
            user_pref_record = db.query(UserPreference).filter(
                UserPreference.session_id == session_id
            ).first()
            
            if user_pref_record:
                user_prefs = {
                    "health_concerns": user_pref_record.health_concerns,
                    "allergens": user_pref_record.allergens,
                    "dietary_restrictions": user_pref_record.dietary_restrictions
                }
        
        # Step 4: AI Analysis
        analysis_result = await ai_service.analyze_ingredients(
            ingredients_list,
            user_prefs
        )
        
        # Step 5: Store analysis in database
        analysis_record = AnalysisHistory(
            session_id=session_id,
            image_hash=image_hash,
            extracted_text=extracted_text,
            ingredients_found=ingredients_list,
            analysis_result={
                "overall_rating": analysis_result["overall_rating"],
                "recommendations": analysis_result["recommendations"],
                "warnings": analysis_result["warnings"]
            },
            confidence_score=min(ocr_confidence, analysis_result["confidence_score"])
        )
        
        db.add(analysis_record)
        db.commit()
        db.refresh(analysis_record)
        
        # Step 6: Return response
        return AnalysisResponse(
            extracted_text=extracted_text,
            ingredients=analysis_result["ingredients"],
            overall_rating=analysis_result["overall_rating"],
            recommendations=analysis_result["recommendations"],
            warnings=analysis_result["warnings"],
            confidence_score=analysis_record.confidence_score,
            analysis_id=analysis_record.id
        )
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Analysis error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during analysis: {str(e)}"
        )


@router.get("/history/{session_id}")
async def get_analysis_history(
    session_id: str,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get analysis history for a session"""
    history = db.query(AnalysisHistory).filter(
        AnalysisHistory.session_id == session_id
    ).order_by(
        AnalysisHistory.created_at.desc()
    ).limit(limit).all()
    
    return {"history": history}

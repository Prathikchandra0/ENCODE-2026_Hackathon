from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.models import UserPreference
from app.schemas.schemas import UserPreferenceCreate, UserPreferenceResponse, UserPreferenceBase

router = APIRouter()


@router.post("/preferences", response_model=UserPreferenceResponse)
async def create_or_update_preferences(
    preferences: UserPreferenceCreate,
    db: Session = Depends(get_db)
):
    """Create or update user preferences"""
    
    # Check if preferences already exist
    existing = db.query(UserPreference).filter(
        UserPreference.session_id == preferences.session_id
    ).first()
    
    if existing:
        # Update existing
        existing.health_concerns = preferences.health_concerns
        existing.dietary_restrictions = preferences.dietary_restrictions
        existing.allergens = preferences.allergens
        existing.preferences = preferences.preferences
        db.commit()
        db.refresh(existing)
        return existing
    else:
        # Create new
        new_pref = UserPreference(
            session_id=preferences.session_id,
            health_concerns=preferences.health_concerns,
            dietary_restrictions=preferences.dietary_restrictions,
            allergens=preferences.allergens,
            preferences=preferences.preferences
        )
        db.add(new_pref)
        db.commit()
        db.refresh(new_pref)
        return new_pref


@router.get("/preferences/{session_id}", response_model=UserPreferenceResponse)
async def get_preferences(
    session_id: str,
    db: Session = Depends(get_db)
):
    """Get user preferences by session ID"""
    
    preferences = db.query(UserPreference).filter(
        UserPreference.session_id == session_id
    ).first()
    
    if not preferences:
        raise HTTPException(status_code=404, detail="Preferences not found")
    
    return preferences


@router.delete("/preferences/{session_id}")
async def delete_preferences(
    session_id: str,
    db: Session = Depends(get_db)
):
    """Delete user preferences"""
    
    preferences = db.query(UserPreference).filter(
        UserPreference.session_id == session_id
    ).first()
    
    if not preferences:
        raise HTTPException(status_code=404, detail="Preferences not found")
    
    db.delete(preferences)
    db.commit()
    
    return {"message": "Preferences deleted successfully"}

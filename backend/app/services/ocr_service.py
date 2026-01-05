import easyocr
import numpy as np
from PIL import Image
import io
from typing import List, Optional
from app.config import settings


class OCRService:
    def __init__(self):
        """Initialize EasyOCR reader with configured languages"""
        self.reader = None
        self.languages = settings.OCR_LANGUAGES
    
    def _get_reader(self):
        """Lazy load the OCR reader"""
        if self.reader is None:
            print(f"Initializing EasyOCR with languages: {self.languages}")
            self.reader = easyocr.Reader(self.languages, gpu=False)
        return self.reader
    
    async def extract_text_from_image(self, image_bytes: bytes) -> dict:
        """
        Extract text from image using EasyOCR
        
        Args:
            image_bytes: Image file as bytes
            
        Returns:
            dict with extracted_text and confidence score
        """
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Convert to numpy array for EasyOCR
            image_array = np.array(image)
            
            # Perform OCR
            reader = self._get_reader()
            results = reader.readtext(image_array)
            
            # Extract text and confidence scores
            extracted_texts = []
            confidences = []
            
            for (bbox, text, confidence) in results:
                extracted_texts.append(text)
                confidences.append(confidence)
            
            # Combine all text
            full_text = " ".join(extracted_texts)
            
            # Calculate average confidence
            avg_confidence = sum(confidences) / len(confidences) if confidences else 0.0
            
            return {
                "extracted_text": full_text,
                "confidence": avg_confidence,
                "raw_results": results
            }
            
        except Exception as e:
            print(f"OCR Error: {str(e)}")
            return {
                "extracted_text": "",
                "confidence": 0.0,
                "error": str(e)
            }
    
    def preprocess_ingredient_text(self, text: str) -> List[str]:
        """
        Parse and clean ingredient text into a list of ingredients
        
        Args:
            text: Raw extracted text
            
        Returns:
            List of cleaned ingredient names
        """
        # Common keywords that indicate ingredient list
        keywords = ["ingredients:", "contains:", "composition:"]
        
        # Convert to lowercase for processing
        text_lower = text.lower()
        
        # Find ingredient section
        start_idx = 0
        for keyword in keywords:
            idx = text_lower.find(keyword)
            if idx != -1:
                start_idx = idx + len(keyword)
                break
        
        # Extract ingredient portion
        ingredient_text = text[start_idx:].strip()
        
        # Split by common separators
        ingredients = []
        
        # Try comma separation first
        parts = ingredient_text.split(',')
        
        for part in parts:
            # Clean up each ingredient
            ingredient = part.strip()
            
            # Remove parenthetical information for now
            if '(' in ingredient:
                ingredient = ingredient[:ingredient.find('(')].strip()
            
            # Remove percentage information
            if '%' in ingredient:
                ingredient = ingredient[:ingredient.find('%')].strip()
            
            if ingredient and len(ingredient) > 2:
                ingredients.append(ingredient)
        
        return ingredients


# Singleton instance
ocr_service = OCRService()

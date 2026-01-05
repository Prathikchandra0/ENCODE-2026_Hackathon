from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


class UserPreferenceBase(BaseModel):
    health_concerns: List[str] = []
    dietary_restrictions: List[str] = []
    allergens: List[str] = []
    preferences: Dict[str, Any] = {}


class UserPreferenceCreate(UserPreferenceBase):
    session_id: str


class UserPreferenceResponse(UserPreferenceBase):
    id: int
    session_id: str
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True


class IngredientInfo(BaseModel):
    name: str
    category: Optional[str] = None
    description: Optional[str] = None
    safety_rating: str
    health_effects: List[str] = []
    allergen: bool = False
    confidence: float


class AnalysisRequest(BaseModel):
    session_id: Optional[str] = None
    user_preferences: Optional[UserPreferenceBase] = None


class AnalysisResponse(BaseModel):
    extracted_text: str
    ingredients: List[IngredientInfo]
    overall_rating: str
    recommendations: List[str]
    warnings: List[str]
    confidence_score: float
    analysis_id: int


class HealthStatus(BaseModel):
    status: str = "healthy"
    message: str = "Backend is running"

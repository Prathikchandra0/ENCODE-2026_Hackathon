from sqlalchemy import Column, Integer, String, Text, Float, DateTime, JSON, Boolean
from sqlalchemy.sql import func
from app.database import Base


class Ingredient(Base):
    __tablename__ = "ingredients"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True, nullable=False)
    common_names = Column(JSON, default=[])  # Alternative names
    category = Column(String(100))  # e.g., "preservative", "colorant", "fragrance"
    description = Column(Text)
    safety_rating = Column(String(50))  # "safe", "moderate", "concerning"
    health_effects = Column(JSON, default=[])  # List of potential effects
    allergen = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class UserPreference(Base):
    __tablename__ = "user_preferences"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), unique=True, index=True, nullable=False)
    health_concerns = Column(JSON, default=[])  # List of health concerns
    dietary_restrictions = Column(JSON, default=[])  # List of restrictions
    allergens = Column(JSON, default=[])  # Known allergens to avoid
    preferences = Column(JSON, default={})  # Additional preferences
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class AnalysisHistory(Base):
    __tablename__ = "analysis_history"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), index=True)
    image_hash = Column(String(64))  # Hash of uploaded image
    extracted_text = Column(Text)
    ingredients_found = Column(JSON, default=[])
    analysis_result = Column(JSON)  # Full analysis result
    confidence_score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

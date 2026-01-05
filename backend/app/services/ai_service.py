from groq import Groq
from typing import List, Dict, Any, Optional
import json
from app.config import settings
from app.schemas.schemas import IngredientInfo


class AIService:
    def __init__(self):
        """Initialize Groq client"""
        self.client = None
        self.model = "llama-3.3-70b-versatile"  # Updated model (Jan 2026)
    
    def _get_client(self):
        """Lazy load the Groq client"""
        if self.client is None:
            if not settings.GROQ_API_KEY:
                raise ValueError("GROQ_API_KEY not set in environment variables")
            self.client = Groq(api_key=settings.GROQ_API_KEY)
        return self.client
    
    async def analyze_ingredients(
        self,
        ingredients: List[str],
        user_preferences: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Analyze ingredients using Groq LLM
        
        Args:
            ingredients: List of ingredient names
            user_preferences: User's skin concerns, allergies, etc.
            
        Returns:
            Analysis results with ratings, warnings, and recommendations
        """
        try:
            client = self._get_client()
            
            # Build prompt with user context
            prompt = self._build_analysis_prompt(ingredients, user_preferences)
            
            # Call Groq API
            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert food scientist and nutritionist. Analyze food product ingredients, providing safety ratings, health effects, and personalized dietary recommendations. Always respond in valid JSON format."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.3,
                max_tokens=2000,
                response_format={"type": "json_object"}
            )
            
            # Parse response
            result = json.loads(response.choices[0].message.content)
            
            # Format ingredients with standardized structure
            formatted_ingredients = self._format_ingredients(result.get("ingredients", []))
            
            return {
                "ingredients": formatted_ingredients,
                "overall_rating": result.get("overall_rating", "unknown"),
                "recommendations": result.get("recommendations", []),
                "warnings": result.get("warnings", []),
                "confidence_score": 0.85  # Groq confidence is generally high
            }
            
        except Exception as e:
            print(f"AI Analysis Error: {str(e)}")
            # Fallback to basic analysis
            return self._basic_analysis(ingredients)
    
    def _build_analysis_prompt(
        self,
        ingredients: List[str],
        user_preferences: Optional[Dict[str, Any]]
    ) -> str:
        """Build detailed prompt for ingredient analysis"""
        
        prompt = f"""Analyze the following food product ingredients:

Ingredients: {', '.join(ingredients)}
"""
        
        if user_preferences:
            prompt += f"\nUser Profile:"
            if user_preferences.get("health_concerns"):
                prompt += f"\n- Health Concerns: {', '.join(user_preferences['health_concerns'])}"
            if user_preferences.get("allergens"):
                prompt += f"\n- Known Allergens: {', '.join(user_preferences['allergens'])}"
            if user_preferences.get("dietary_restrictions"):
                prompt += f"\n- Dietary Restrictions: {', '.join(user_preferences['dietary_restrictions'])}"
        
        prompt += """

Provide a comprehensive analysis in the following JSON format:
{
  "ingredients": [
    {
      "name": "ingredient name",
      "category": "preservative|sweetener|additive|flavor|colorant|nutrient|other",
      "description": "brief description of function",
      "safety_rating": "safe|moderate|concerning|harmful",
      "health_effects": ["effect1", "effect2"],
      "allergen": true/false,
      "confidence": 0.0-1.0
    }
  ],
  "overall_rating": "excellent|good|moderate|poor|harmful",
  "recommendations": ["recommendation1", "recommendation2"],
  "warnings": ["warning1", "warning2"]
}

Consider:
1. Nutritional value and health impact
2. Potential allergens
3. Known health risks
4. Additives and processing
5. User's dietary restrictions and health concerns
6. Scientific evidence for each ingredient
"""
        
        return prompt
    
    def _format_ingredients(self, ingredients_data: List[Dict]) -> List[IngredientInfo]:
        """Format ingredients into standardized schema"""
        formatted = []
        
        for ing in ingredients_data:
            try:
                ingredient_info = IngredientInfo(
                    name=ing.get("name", "Unknown"),
                    category=ing.get("category"),
                    description=ing.get("description"),
                    safety_rating=ing.get("safety_rating", "unknown"),
                    health_effects=ing.get("health_effects", []),
                    allergen=ing.get("allergen", False),
                    confidence=ing.get("confidence", 0.7)
                )
                formatted.append(ingredient_info)
            except Exception as e:
                print(f"Error formatting ingredient: {e}")
                continue
        
        return formatted
    
    def _basic_analysis(self, ingredients: List[str]) -> Dict[str, Any]:
        """Fallback basic analysis when AI fails"""
        
        # Simple keyword-based analysis
        concerning_keywords = ["paraben", "sulfate", "phthalate", "formaldehyde", "petroleum"]
        moderate_keywords = ["alcohol", "fragrance", "parfum", "dye"]
        
        formatted_ingredients = []
        warnings = []
        
        for ing in ingredients:
            ing_lower = ing.lower()
            safety = "safe"
            
            if any(keyword in ing_lower for keyword in concerning_keywords):
                safety = "concerning"
                warnings.append(f"{ing} may be potentially harmful")
            elif any(keyword in ing_lower for keyword in moderate_keywords):
                safety = "moderate"
            
            formatted_ingredients.append(
                IngredientInfo(
                    name=ing,
                    category="unknown",
                    description="Analysis unavailable",
                    safety_rating=safety,
                    health_effects=[],
                    allergen=False,
                    confidence=0.5
                )
            )
        
        return {
            "ingredients": formatted_ingredients,
            "overall_rating": "moderate",
            "recommendations": ["AI analysis unavailable. Please consult a nutritionist or dietitian."],
            "warnings": warnings,
            "confidence_score": 0.5
        }


# Singleton instance
ai_service = AIService()

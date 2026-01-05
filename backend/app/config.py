from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://dermacare_user:dermacare_password@localhost:5432/dermacare_db"
    
    # API Keys
    GROQ_API_KEY: str = ""
    
    # Application
    APP_NAME: str = "DermaCare API"
    DEBUG: bool = True
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS
    FRONTEND_URL: str = "http://localhost:3000"
    
    # OCR
    OCR_LANGUAGES: List[str] = ["en"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

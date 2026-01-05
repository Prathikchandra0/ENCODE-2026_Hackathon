from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routes import analysis, user
from app.schemas.schemas import HealthStatus

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description="AI-powered food ingredient analysis API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analysis.router, prefix="/api/analysis", tags=["Analysis"])
app.include_router(user.router, prefix="/api/user", tags=["User"])


@app.get("/", response_model=HealthStatus)
async def root():
    """Health check endpoint"""
    return HealthStatus(
        status="healthy",
        message=f"{settings.APP_NAME} is running"
    )


@app.get("/health", response_model=HealthStatus)
async def health_check():
    """Detailed health check"""
    return HealthStatus(
        status="healthy",
        message="All systems operational"
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )

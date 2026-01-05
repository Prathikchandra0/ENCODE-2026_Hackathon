# System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:3000                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │ (Image Upload + Preferences)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      REACT FRONTEND                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ ImageUpload  │  │ UserProfile  │  │  Ingredient  │         │
│  │  Component   │  │  Component   │  │   Insights   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              App.js (Main Logic)                         │  │
│  │  - State Management                                      │  │
│  │  - API Integration (Axios)                               │  │
│  │  - Session Management                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Axios HTTP
                             │ POST /api/analysis/analyze
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    FASTAPI BACKEND                               │
│                  http://localhost:8000                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      main.py                             │  │
│  │  - CORS Middleware                                       │  │
│  │  - Route Registration                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                    │
│  ┌──────────────────────────▼──────────────────────────────┐  │
│  │                    API ROUTES                            │  │
│  │                                                          │  │
│  │  ┌────────────────┐        ┌────────────────┐          │  │
│  │  │  analysis.py   │        │    user.py     │          │  │
│  │  │  - /analyze    │        │  - /preferences│          │  │
│  │  │  - /history    │        │                │          │  │
│  │  └────────┬───────┘        └────────┬───────┘          │  │
│  └───────────┼──────────────────────────┼──────────────────┘  │
│              │                          │                      │
│  ┌───────────▼──────────────────────────▼──────────────────┐  │
│  │                    SERVICES LAYER                        │  │
│  │                                                          │  │
│  │  ┌─────────────────┐         ┌─────────────────┐       │  │
│  │  │  ocr_service.py │         │  ai_service.py  │       │  │
│  │  │                 │         │                 │       │  │
│  │  │  - EasyOCR      │         │  - Groq Client  │       │  │
│  │  │  - Extract Text │         │  - LLaMA 3.1    │       │  │
│  │  │  - Parse        │         │  - JSON Format  │       │  │
│  │  └────────┬────────┘         └────────┬────────┘       │  │
│  └───────────┼──────────────────────────┼─────────────────┘  │
│              │                          │                     │
│              │ Text                     │ Analysis Request    │
│              │                          │                     │
└──────────────┼──────────────────────────┼─────────────────────┘
               │                          │
               │                          │
    ┌──────────▼──────────┐    ┌─────────▼──────────┐
    │                     │    │                     │
    │   EasyOCR Models    │    │   Groq Cloud API    │
    │   (Local Storage)   │    │  (LLaMA Models)     │
    │                     │    │                     │
    │  - English Model    │    │  - Fast Inference   │
    │  - ~100MB           │    │  - 30 req/min free  │
    │  - Offline OCR      │    │  - JSON responses   │
    └─────────────────────┘    └─────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              PostgreSQL Database                         │  │
│  │              localhost:5432                              │  │
│  │                                                          │  │
│  │  ┌──────────────────┐  ┌──────────────────┐            │  │
│  │  │   ingredients    │  │ user_preferences │            │  │
│  │  │                  │  │                  │            │  │
│  │  │  - id            │  │  - id            │            │  │
│  │  │  - name          │  │  - session_id    │            │  │
│  │  │  - category      │  │  - skin_concerns │            │  │
│  │  │  - safety_rating │  │  - allergens     │            │  │
│  │  └──────────────────┘  └──────────────────┘            │  │
│  │                                                          │  │
│  │  ┌──────────────────┐                                   │  │
│  │  │ analysis_history │                                   │  │
│  │  │                  │                                   │  │
│  │  │  - id            │                                   │  │
│  │  │  - session_id    │                                   │  │
│  │  │  - extracted_text│                                   │  │
│  │  │  - ingredients   │                                   │  │
│  │  │  - analysis_result                                   │  │
│  │  └──────────────────┘                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘


                        DATA FLOW
                        ─────────

1. User uploads image → Frontend (React)

2. Frontend sends FormData → Backend (FastAPI)
   ├─ File: image bytes
   └─ session_id: user identifier

3. Backend → OCR Service (EasyOCR)
   ├─ Extracts text from image
   ├─ Parses ingredient list
   └─ Returns: extracted_text, confidence

4. Backend → AI Service (Groq)
   ├─ Sends ingredients + user preferences
   ├─ LLaMA model analyzes safety
   └─ Returns: ratings, warnings, recommendations

5. Backend → Database (PostgreSQL)
   ├─ Stores analysis result
   ├─ Links to user session
   └─ Creates history record

6. Backend → Frontend
   ├─ JSON response with analysis
   ├─ Ingredient safety ratings
   └─ Personalized recommendations

7. Frontend displays results
   ├─ Color-coded concerns
   ├─ Overall health score
   └─ Actionable insights


                    DEPLOYMENT ARCHITECTURE
                    ───────────────────────

Development:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  React Dev   │────▶│  FastAPI     │────▶│  PostgreSQL  │
│  :3000       │     │  :8000       │     │  :5432       │
│  (npm start) │     │  (python)    │     │  (Docker)    │
└──────────────┘     └──────────────┘     └──────────────┘


Production (Recommended):
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Vercel     │────▶│  Render.com  │────▶│  Render DB   │
│  (Frontend)  │     │  (Backend)   │     │  (PostgreSQL)│
│   Free Tier  │     │   Free Tier  │     │   Free Tier  │
└──────────────┘     └──────────────┘     └──────────────┘


Alternative Production:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Netlify    │────▶│  Railway.app │────▶│  Railway DB  │
│  (Frontend)  │     │  (Backend)   │     │  (PostgreSQL)│
│   Free Tier  │     │  $5/mo free  │     │  Included    │
└──────────────┘     └──────────────┘     └──────────────┘


                    TECHNOLOGY STACK
                    ────────────────

Frontend:
  ├─ React 18 (UI Framework)
  ├─ Axios (HTTP Client)
  ├─ CSS3 (Styling)
  └─ localStorage (Session Management)

Backend:
  ├─ FastAPI (Web Framework)
  ├─ Uvicorn (ASGI Server)
  ├─ EasyOCR (OCR Engine)
  ├─ Groq SDK (LLM Client)
  ├─ SQLAlchemy (ORM)
  └─ Pydantic (Validation)

Database:
  ├─ PostgreSQL 15
  └─ psycopg2 (Driver)

DevOps:
  ├─ Docker (Containerization)
  ├─ Docker Compose (Orchestration)
  └─ Git (Version Control)

External Services:
  ├─ Groq Cloud (LLM Inference)
  └─ (Optional) Cloud Storage for images


                    SECURITY LAYERS
                    ───────────────

1. Environment Variables
   ├─ API keys in .env (not committed)
   ├─ Database credentials secured
   └─ CORS restricted to frontend URL

2. Input Validation
   ├─ File type checking (images only)
   ├─ File size limits (< 10MB)
   ├─ Pydantic schema validation
   └─ SQL injection prevention (ORM)

3. API Security
   ├─ HTTPS in production
   ├─ Rate limiting (Groq: 30/min)
   └─ Session-based tracking

4. Database Security
   ├─ User permissions (least privilege)
   ├─ Prepared statements (SQLAlchemy)
   └─ Connection pooling
```

# DermaCare - Complete Setup Guide

This project consists of a React frontend and FastAPI backend with PostgreSQL database.

## 🎯 Quick Start (Recommended - Docker)

### Prerequisites
- Docker Desktop installed
- Get a free Groq API key from https://console.groq.com

### Setup Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Start the backend services**
   ```bash
   docker-compose up --build
   ```
   
   This will start:
   - PostgreSQL database on port 5432
   - FastAPI backend on port 8000
   - API docs at http://localhost:8000/docs

4. **In a new terminal, start the frontend**
   ```bash
   cd ..  # Back to root directory
   npm start
   ```
   
   Frontend will open at http://localhost:3000

## 🔧 Manual Setup (Without Docker)

### Backend Setup

1. **Install Python 3.11+**

2. **Navigate to backend**
   ```bash
   cd backend
   ```

3. **Create virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Mac/Linux
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Install and start PostgreSQL**
   - Download from https://www.postgresql.org/download/
   - Create database:
     ```sql
     CREATE DATABASE dermacare_db;
     CREATE USER dermacare_user WITH PASSWORD 'dermacare_password';
     GRANT ALL PRIVILEGES ON DATABASE dermacare_db TO dermacare_user;
     ```

6. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database URL and Groq API key

7. **Run backend**
   ```bash
   cd app
   python main.py
   ```
   Or with uvicorn:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. **Navigate to root directory**
   ```bash
   cd ..  # From backend directory
   ```

2. **Install dependencies** (if not done already)
   ```bash
   npm install
   ```

3. **Configure API URL**
   - Copy `.env.example` to `.env` (already created)
   - Default is `http://localhost:8000`

4. **Start frontend**
   ```bash
   npm start
   ```

## 📚 API Endpoints

### Backend API (http://localhost:8000)

- `GET /` - Health check
- `GET /docs` - Swagger API documentation
- `POST /api/analysis/analyze` - Analyze product image
- `GET /api/analysis/history/{session_id}` - Get analysis history
- `POST /api/user/preferences` - Save user preferences
- `GET /api/user/preferences/{session_id}` - Get user preferences

## 🔑 Getting Groq API Key (FREE)

1. Visit https://console.groq.com
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy and paste into backend `.env` file

## 🧪 Testing the Application

1. **Start both backend and frontend**
2. **Open browser** at http://localhost:3000
3. **Upload a food label image**
4. **Set your preferences** (optional)
5. **Click "Decode This Label"**
6. **View AI-powered analysis**

## 📦 Project Structure

```
ENCODE-2026_Hackathon/
├── backend/
│   ├── app/
│   │   ├── routes/          # API endpoints
│   │   ├── models/          # Database models
│   │   ├── services/        # OCR and AI services
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── config.py        # Configuration
│   │   ├── database.py      # Database connection
│   │   └── main.py          # FastAPI app
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile          # Docker configuration
│   ├── docker-compose.yml  # Docker Compose
│   └── .env.example        # Environment template
├── src/
│   ├── components/         # React components
│   ├── App.js             # Main React app
│   └── index.js           # Entry point
├── package.json           # Node dependencies
└── README.md             # This file
```

## 🐛 Troubleshooting

### Backend Issues

1. **Port 8000 already in use**
   ```bash
   # Change PORT in backend/.env
   PORT=8001
   ```

2. **Database connection error**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in `.env`
   - For Docker: `docker-compose down -v` then `docker-compose up`

3. **Groq API error**
   - Verify API key is correct
   - Check internet connection
   - Try regenerating key on Groq console

4. **OCR not working**
   - First run downloads EasyOCR models (~100MB)
   - Wait for download to complete
   - Check image quality (clear, well-lit)

### Frontend Issues

1. **CORS errors**
   - Ensure backend is running
   - Check FRONTEND_URL in backend/.env
   - Restart both frontend and backend

2. **Cannot connect to backend**
   - Verify REACT_APP_API_URL in frontend `.env`
   - Check backend is running on port 8000
   - Test backend at http://localhost:8000/docs

## 🚀 Deployment

### Backend Deployment (Render.com - FREE)

1. Push code to GitHub
2. Go to Render.com
3. Create new Web Service
4. Connect repository
5. Set environment variables
6. Deploy

### Frontend Deployment (Vercel - FREE)

1. Push code to GitHub
2. Go to Vercel.com
3. Import project
4. Add environment variable: `REACT_APP_API_URL`
5. Deploy

## 📖 Tech Stack

### Frontend
- React 18
- Axios for API calls
- CSS3 for styling

### Backend
- FastAPI (Python web framework)
- EasyOCR (OCR engine)
- Groq API (LLM inference)
- PostgreSQL (database)
- SQLAlchemy (ORM)
- Docker (containerization)

## 🤝 Contributing

This is an open-source project. Contributions welcome!

## 📄 License

MIT License

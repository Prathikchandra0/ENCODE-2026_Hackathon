# 🚀 Quick Start Commands

## First Time Setup

### 1. Get Groq API Key (FREE)
Visit: https://console.groq.com → Create account → Get API key

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Edit .env and add: GROQ_API_KEY=your_key_here
```

### 3. Start with Docker (Easiest)
```bash
docker-compose up --build
```

### 4. Start Frontend (New Terminal)
```bash
cd ..
npm install  # Only first time
npm start
```

## Daily Usage

### Start Backend (Docker)
```bash
cd backend
docker-compose up
```

### Start Backend (Manual)
```bash
cd backend
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
cd app
python main.py
```

### Start Frontend
```bash
npm start
```

### Stop Everything
- Press `Ctrl+C` in each terminal
- For Docker: `docker-compose down`

## Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main application |
| Backend API | http://localhost:8000 | REST API |
| API Docs | http://localhost:8000/docs | Swagger UI |
| Database | localhost:5432 | PostgreSQL |

## Useful Commands

### Backend
```bash
# View logs
docker-compose logs -f

# Restart backend only
docker-compose restart backend

# Stop and remove all containers
docker-compose down -v

# Install new Python package
pip install package_name
pip freeze > requirements.txt
```

### Frontend
```bash
# Install new npm package
npm install package-name

# Build for production
npm run build

# Clear cache
npm cache clean --force
```

### Database
```bash
# Connect to PostgreSQL (Docker)
docker exec -it dermacare_db psql -U dermacare_user -d dermacare_db

# View tables
\dt

# Exit
\q
```

## Troubleshooting

### Backend won't start
```bash
cd backend
docker-compose down -v
docker-compose up --build
```

### Frontend errors
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Port already in use
```bash
# Windows - Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

### Database connection error
Check .env file has correct DATABASE_URL:
```
DATABASE_URL=postgresql://dermacare_user:dermacare_password@localhost:5432/dermacare_db
```

For Docker, use:
```
DATABASE_URL=postgresql://dermacare_user:dermacare_password@db:5432/dermacare_db
```

## Testing

### Test Backend API
```bash
# Health check
curl http://localhost:8000/health

# Or open in browser
http://localhost:8000/docs
```

### Test Frontend
```bash
# Just open browser
http://localhost:3000
```

## Environment Files

### backend/.env
```env
DATABASE_URL=postgresql://dermacare_user:dermacare_password@localhost:5432/dermacare_db
GROQ_API_KEY=gsk_your_key_here
FRONTEND_URL=http://localhost:3000
DEBUG=True
PORT=8000
```

### .env (root directory)
```env
REACT_APP_API_URL=http://localhost:8000
```

## File Structure

```
ENCODE-2026_Hackathon/
├── backend/              # Python FastAPI
│   ├── app/             # Application code
│   ├── .env            # Environment variables
│   ├── requirements.txt # Python packages
│   └── docker-compose.yml
├── src/                 # React frontend
├── .env                # Frontend environment
└── package.json        # Node packages
```

## Git Commands

```bash
# Don't commit .env files!
git add .
git commit -m "Your message"
git push origin main
```

## Documentation

- Full setup: `SETUP_GUIDE.md`
- Project summary: `PROJECT_SUMMARY.md`
- Backend docs: `backend/README.md`
- Main README: `README.md`

## Support

- Backend API docs: http://localhost:8000/docs
- Groq Console: https://console.groq.com
- GitHub Issues: (your repo URL)

---

**That's it! You're ready to go! 🎉**

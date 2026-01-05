# DermaCare Backend API

AI-powered skincare and cosmetic ingredient analysis backend built with FastAPI.

## Features

- 🔍 **OCR Text Extraction** - Extract ingredients from product labels using EasyOCR
- 🤖 **AI Analysis** - Analyze ingredients using Groq's LLaMA models
- 💾 **PostgreSQL Database** - Store analysis history and user preferences
- 🐳 **Docker Support** - Easy deployment with Docker Compose
- 📚 **API Documentation** - Auto-generated Swagger docs

## Tech Stack

- **FastAPI** - Modern Python web framework
- **EasyOCR** - Open-source OCR engine
- **Groq API** - Fast LLM inference with open models
- **PostgreSQL** - Relational database
- **SQLAlchemy** - ORM for database operations
- **Docker** - Containerization

## Setup

### Option 1: Docker (Recommended)

1. **Get Groq API Key** (FREE)
   - Visit https://console.groq.com
   - Sign up and get your API key

2. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Groq API key:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Start services**
   ```bash
   docker-compose up --build
   ```

4. **Access API**
   - API: http://localhost:8000
   - Docs: http://localhost:8000/docs
   - Database: localhost:5432

### Option 2: Local Development

1. **Install Python 3.11+**

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL**
   - Install PostgreSQL
   - Create database: `dermacare_db`
   - Update `DATABASE_URL` in `.env`

5. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

6. **Run the server**
   ```bash
   cd app
   python main.py
   ```
   Or with uvicorn:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Endpoints

### Analysis
- `POST /api/analysis/analyze` - Analyze product image
- `GET /api/analysis/history/{session_id}` - Get analysis history

### User Preferences
- `POST /api/user/preferences` - Create/update preferences
- `GET /api/user/preferences/{session_id}` - Get preferences
- `DELETE /api/user/preferences/{session_id}` - Delete preferences

### Health Check
- `GET /` - Root health check
- `GET /health` - Detailed health status

## Usage Example

```python
import requests

# Analyze a product image
with open('product_label.jpg', 'rb') as f:
    files = {'file': f}
    data = {'session_id': 'user123'}
    response = requests.post(
        'http://localhost:8000/api/analysis/analyze',
        files=files,
        data=data
    )
    result = response.json()
    print(result)
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `GROQ_API_KEY` | Groq API key for LLM | Required |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `DEBUG` | Debug mode | `True` |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `8000` |

## Database Schema

### Tables
- **ingredients** - Known ingredient information
- **user_preferences** - User skin concerns and allergies
- **analysis_history** - Past analysis results

## Development

### Run tests
```bash
pytest
```

### Format code
```bash
black app/
```

### Type checking
```bash
mypy app/
```

## Deployment

### Deploy to Render.com (FREE)
1. Create account on Render.com
2. Connect GitHub repository
3. Create new Web Service
4. Set environment variables
5. Deploy

### Deploy to Railway.app (FREE)
1. Install Railway CLI
2. Run `railway init`
3. Run `railway up`

## License

Open Source - MIT License

## Contributing

Contributions welcome! Please open an issue or submit a PR.

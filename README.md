# FoodSense AI - Ingredient Intelligence Co-Pilot

An AI-powered web application that translates complex food ingredients into clear, actionable insights. Built with **React frontend** and **FastAPI backend** using **EasyOCR** for text extraction and **Groq LLM** for intelligent analysis.

## 🎯 Problem Statement

**The Consumer Health Information Gap**

Food labels are optimized for regulatory compliance, not human understanding. Consumers face:
- Long, complex ingredient lists
- Unfamiliar chemical names
- Conflicting or evolving health guidance
- Cognitive overload at decision time

## 💡 Solution

FoodSense AI provides an intelligent co-pilot that:
- ✅ **Real OCR**: Extracts text from food label images using EasyOCR
- ✅ **AI Analysis**: Uses Groq's LLaMA models to analyze ingredients
- ✅ **Database**: Stores analysis history and user preferences
- ✅ **Personalized**: Recommendations based on your health profile
- ✅ **Open Source**: All components are free and open source

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **FastAPI** - Python web framework
- **EasyOCR** - Open-source OCR engine
- **Groq API** - Fast LLM inference (free tier)
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **Docker** - Containerization

## ⚡ Quick Start

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

### Option 1: Docker (Recommended)

1. Get free Groq API key from https://console.groq.com
2. Configure backend:
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your GROQ_API_KEY
   docker-compose up --build
   ```
3. Start frontend:
   ```bash
   cd ..
   npm install
   npm start
   ```

### Option 2: Manual Setup

1. **Backend**:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   # Set up PostgreSQL and configure .env
   cd app
   python main.py
   ```

2. **Frontend**:
   ```bash
   npm install
   npm start
   ```

## Features

### 📸 Smart Image Upload
- Upload photos of food labels
- Real OCR text extraction using EasyOCR
- Drag-and-drop support

### 👤 Personalization
- Dietary restrictions (Vegan, Vegetarian, Gluten-Free, etc.)
- Health goals (Weight Management, Heart Health, etc.)
- Special considerations (Children, Pregnancy, Athletes)
- Saved to database for future use

### 🔬 AI-Powered Analysis
- **Real-time OCR**: Extract ingredients from images
- **LLM Analysis**: Groq's LLaMA models analyze safety
- **Overall Health Score**: Visual scoring system (0-10)
- **Concern Detection**: Identifies problematic ingredients
- **Confidence Levels**: Transparent about certainty
- **History Tracking**: View past analyses

### 📊 Multi-Tab Insights
1. **Overview**: Quick summary with detected ingredients
2. **Concerns**: Detailed breakdown of problematic ingredients
3. **Positives**: Beneficial aspects and alternatives
4. **Uncertainties**: Transparent about incomplete information

## 📚 API Documentation

Once backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Install Dependencies**
   ```powershell
   npm install
   ```

3. **Start Development Server**
   ```powershell
   npm start
   ```

4. **Open in Browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to that URL

## Usage

1. **Upload Image**: Click the upload area or drag and drop a skin condition image
2. **Select Symptoms**: Choose all applicable symptoms from the grid
3. **Analyze**: Click the "Analyze Skin Condition" button
4. **View Results**: Review the preliminary assessment, description, and reference images
5. **Consult Professional**: Use the "Find a Dermatologist Near You" button or the "Learn More Online" button

## Technology Stack

- **Frontend**: React 18.2
- **Styling**: CSS3 with gradients and animations
- **Image Handling**: FileReader API
- **State Management**: React Hooks

## Design Philosophy

### 🎨 AI-Native Approach
- Focus on interpretation, not just data presentation
- Context over raw information
- Personalized insights based on user needs

### 🤝 Honest Communication
- Explicit confidence levels for each insight
- Dedicated "Uncertainties" section
- No false promises or absolute claims

### 🧠 Cognitive Load Reduction
- Visual scoring system
- Tabbed interface for organized information
- Color-coded concern levels
- Quick summary cards

## Project Structure

```
foodsense-ai/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ImageUpload.js
│   │   ├── ImageUpload.css
│   │   ├── UserProfile.js
│   │   ├── UserProfile.css
│   │   ├── IngredientInsights.js
│   │   └── IngredientInsights.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Future Enhancements

- Real OCR integration for ingredient extraction
- Machine learning models for better analysis
- Database of 10,000+ ingredients
- Barcode scanning
- Nutrition facts analysis
- Community ratings and reviews
- Shopping list integration
- Recipe alternatives

## Limitations & Transparency

This is a **demonstration prototype**. We intentionally:
- Don't claim scientific completeness
- Focus on clarity over comprehensiveness
- Acknowledge uncertainty
- Prioritize user understanding

For actual health decisions, always consult qualified healthcare professionals.

## Contributing

This project was built for the ENCODE 2026 Hackathon. Contributions welcome!

## License

Educational/Hackathon Project

---

**Built with ❤️ for better food transparency**

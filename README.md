# FoodSense AI - Ingredient Intelligence Co-Pilot

An AI-native web application that reimagines how consumers understand food product ingredients. Built with React, this intelligent co-pilot translates complex ingredient lists into clear, human-level insights while honestly communicating uncertainty.

## 🎯 Problem Statement

**The Consumer Health Information Gap**

Food labels are optimized for regulatory compliance, not human understanding. Consumers face:
- Long, complex ingredient lists
- Unfamiliar chemical names
- Conflicting or evolving health guidance
- Cognitive overload at decision time

## 💡 Solution

FoodSense AI provides an intelligent co-pilot that:
- ✅ Interprets ingredient information on your behalf
- ✅ Translates scientific/regulatory context into plain language
- ✅ Communicates uncertainty honestly and intuitively
- ✅ Minimizes cognitive load with clear, actionable insights
- ✅ Personalizes recommendations based on dietary needs and health goals

## Features

### 📸 Smart Image Upload
- Upload photos of food labels via click or drag-and-drop
- OCR-ready for ingredient extraction (simulated in demo)

### 👤 Personalization
- Dietary restrictions (Vegan, Vegetarian, Gluten-Free, Dairy-Free, Halal, Kosher)
- Health goals (Weight Management, Heart Health, Blood Sugar Control, etc.)
- Special considerations (Children, Pregnancy, Senior Health, Athletes)

### 🔬 Intelligent Analysis
- **Overall Health Score**: Visual scoring system (0-10)
- **Concern Detection**: Identifies problematic ingredients with confidence levels
- **Positive Aspects**: Highlights beneficial ingredients
- **Uncertainty Communication**: Honest about what we don't know

### 📊 Multi-Tab Insights
1. **Overview**: Quick summary with detected ingredients
2. **Concerns**: Detailed breakdown of problematic ingredients
3. **Positives**: Beneficial aspects and alternatives
4. **Uncertainties**: Transparent about incomplete information

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

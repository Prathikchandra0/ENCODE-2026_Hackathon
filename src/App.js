import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import UserProfile from './components/UserProfile';
import IngredientInsights from './components/IngredientInsights';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userPreferences, setUserPreferences] = useState({
    dietaryRestrictions: [],
    healthGoals: [],
    concerns: []
  });
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
    setAnalysis(null);
  };

  const handlePreferencesChange = (preferences) => {
    setUserPreferences(preferences);
  };

  const analyzeIngredients = async () => {
    if (!uploadedImage) {
      alert('Please upload a food label image first');
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis (in production, this would call OCR + AI API)
    setTimeout(() => {
      const result = performIngredientAnalysis(userPreferences);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 2500);
  };

  const performIngredientAnalysis = (preferences) => {
    // Simulated ingredient extraction and analysis
    const mockIngredients = [
      'Enriched Wheat Flour',
      'High Fructose Corn Syrup',
      'Partially Hydrogenated Soybean Oil',
      'Modified Corn Starch',
      'Sodium Benzoate (Preservative)',
      'Natural and Artificial Flavors',
      'Yellow 5',
      'Red 40',
      'BHT (Butylated Hydroxytoluene)'
    ];

    const insights = {
      overallScore: 4.5,
      maxScore: 10,
      ingredients: mockIngredients,
      concerns: [
        {
          level: 'high',
          ingredient: 'Partially Hydrogenated Soybean Oil',
          reason: 'Contains trans fats',
          explanation: 'Trans fats are linked to increased risk of heart disease and should be avoided. The FDA has determined that partially hydrogenated oils are not safe for consumption.',
          confidence: 'high'
        },
        {
          level: 'medium',
          ingredient: 'High Fructose Corn Syrup',
          reason: 'Added sugar',
          explanation: 'High fructose corn syrup is a processed sweetener linked to obesity, diabetes, and metabolic issues when consumed in excess. Consider limiting daily intake.',
          confidence: 'high'
        },
        {
          level: 'medium',
          ingredient: 'Yellow 5 & Red 40',
          reason: 'Artificial food coloring',
          explanation: 'Some studies suggest artificial dyes may cause hyperactivity in sensitive children. While FDA-approved, their necessity is debated.',
          confidence: 'medium'
        },
        {
          level: 'low',
          ingredient: 'Modified Corn Starch',
          reason: 'Highly processed',
          explanation: 'Modified starches are chemically altered for texture. Generally recognized as safe but offer minimal nutritional value.',
          confidence: 'medium'
        }
      ],
      positives: [
        {
          ingredient: 'Enriched Wheat Flour',
          benefit: 'Fortified with B vitamins and iron',
          note: 'While enriched, whole grain alternatives provide more fiber and nutrients'
        }
      ],
      alternatives: [
        'Look for products with whole grain flour listed first',
        'Choose items without hydrogenated oils',
        'Seek natural sweeteners like honey or maple syrup',
        'Opt for products with no artificial colors'
      ],
      uncertainties: [
        '"Natural Flavors" is a broad term that can include 100+ compounds - specific composition not disclosed',
        'Long-term effects of consuming multiple additives together are not fully understood',
        'Individual sensitivity varies - what works for others may not work for you'
      ],
      personalizedNotes: generatePersonalizedNotes(preferences)
    };

    return insights;
  };

  const generatePersonalizedNotes = (preferences) => {
    const notes = [];
    
    if (preferences.dietaryRestrictions.includes('vegan')) {
      notes.push('⚠️ This product may contain animal-derived ingredients in "Natural Flavors"');
    }
    
    if (preferences.healthGoals.includes('weight-loss')) {
      notes.push('❗ High fructose corn syrup may hinder weight loss goals');
    }
    
    if (preferences.healthGoals.includes('heart-health')) {
      notes.push('🚫 Trans fats are particularly harmful for cardiovascular health');
    }
    
    if (preferences.concerns.includes('children')) {
      notes.push('⚠️ Artificial colors have been linked to hyperactivity in some children');
    }

    return notes;
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysis(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>🥗 FoodSense AI</h1>
          <p className="tagline">Your Intelligent Ingredient Co-Pilot</p>
          <p className="subtitle">Translating food labels into human insight</p>
        </div>
      </header>

      <main className="App-main">
        <div className="intro-section">
          <h2>Understanding Food Labels, Simplified</h2>
          <p className="intro-text">
            Food labels are designed for compliance, not clarity. We bridge that gap by 
            interpreting ingredients on your behalf—turning complex chemical names and 
            regulatory jargon into actionable, personalized insights.
          </p>
        </div>

        <UserProfile 
          onPreferencesChange={handlePreferencesChange}
          preferences={userPreferences}
        />

        <ImageUpload 
          onImageUpload={handleImageUpload} 
          uploadedImage={uploadedImage}
        />

        {uploadedImage && (
          <button 
            className="analyze-button"
            onClick={analyzeIngredients}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="spinner"></span> Analyzing Ingredients...
              </>
            ) : (
              '🔍 Decode This Label'
            )}
          </button>
        )}

        {analysis && (
          <>
            <IngredientInsights analysis={analysis} preferences={userPreferences} />
            <button className="reset-button" onClick={resetAnalysis}>
              Analyze Another Product
            </button>
          </>
        )}
      </main>

      <footer className="App-footer">
        <div className="footer-content">
          <p className="disclaimer">
            💡 <strong>How to use this tool:</strong> This AI co-pilot helps you understand 
            ingredients by translating scientific terminology into plain language. We communicate 
            uncertainty honestly and provide context—not absolute answers. For specific health 
            conditions or allergies, always consult healthcare professionals.
          </p>
          <p className="transparency-note">
            🔬 <strong>Our approach:</strong> We don't claim scientific completeness. Instead, 
            we focus on clarity, minimizing your cognitive load at decision time.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

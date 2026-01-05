import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ImageUpload from './components/ImageUpload';
import UserProfile from './components/UserProfile';
import IngredientInsights from './components/IngredientInsights';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [userPreferences, setUserPreferences] = useState({
    dietaryRestrictions: [],
    healthGoals: [],
    concerns: []
  });
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessionId] = useState(() => {
    // Generate or retrieve session ID
    let id = localStorage.getItem('foodsense_session_id');
    if (!id) {
      id = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('foodsense_session_id', id);
    }
    return id;
  });

  const handleImageUpload = (imageData, file) => {
    setUploadedImage(imageData);
    setImageFile(file);
    setAnalysis(null);
  };

  const handlePreferencesChange = (preferences) => {
    setUserPreferences(preferences);
    // Save preferences to backend
    saveUserPreferences(preferences);
  };

  const saveUserPreferences = async (preferences) => {
    try {
      await axios.post(`${API_BASE_URL}/api/user/preferences`, {
        session_id: sessionId,
        health_concerns: preferences.concerns || [],
        dietary_restrictions: preferences.dietaryRestrictions || [],
        allergens: preferences.healthGoals || [],
        preferences: {}
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const analyzeIngredients = async () => {
    if (!uploadedImage || !imageFile) {
      alert('Please upload a food label image first');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('session_id', sessionId);

      // Call backend API
      const response = await axios.post(
        `${API_BASE_URL}/api/analysis/analyze`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Transform backend response to match frontend format
      const result = transformAnalysisResponse(response.data);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
      alert(error.response?.data?.detail || 'An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const transformAnalysisResponse = (data) => {
    // Transform backend response to match frontend format
    const ratingMap = {
      'excellent': 9,
      'good': 7,
      'moderate': 5,
      'poor': 3,
      'harmful': 1
    };

    const overallScore = ratingMap[data.overall_rating] || 5;

    // Convert ingredients to concerns format
    const concerns = [];
    const positives = [];

    data.ingredients.forEach(ing => {
      if (ing.safety_rating === 'concerning' || ing.safety_rating === 'harmful') {
        concerns.push({
          level: ing.safety_rating === 'harmful' ? 'high' : 'medium',
          ingredient: ing.name,
          reason: ing.category || 'Unknown',
          explanation: ing.description || 'No detailed information available',
          confidence: ing.confidence > 0.8 ? 'high' : 'medium'
        });
      } else if (ing.safety_rating === 'safe' && ing.health_effects.length > 0) {
        positives.push({
          ingredient: ing.name,
          benefit: ing.health_effects.join(', '),
          note: ing.description || ''
        });
      }
    });

    return {
      overallScore: overallScore,
      maxScore: 10,
      ingredients: data.ingredients.map(i => i.name),
      concerns: concerns,
      positives: positives,
      alternatives: data.recommendations || [],
      uncertainties: [],
      personalizedNotes: data.warnings || [],
      extractedText: data.extracted_text,
      confidenceScore: data.confidence_score
    };
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

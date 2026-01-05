import React, { useState, useEffect } from 'react';
import './DiagnosisResult.css';

const DiagnosisResult = ({ diagnosis }) => {
  const [referenceImages, setReferenceImages] = useState([]);

  useEffect(() => {
    // Generate search URLs for reference images
    // In production, you would use a proper image search API
    const searchQuery = diagnosis.imageSearch || diagnosis.name;
    const imageUrls = [
      `https://source.unsplash.com/400x300/?${encodeURIComponent(searchQuery)},medical`,
      `https://source.unsplash.com/400x300/?dermatology,${encodeURIComponent(searchQuery)}`,
      `https://source.unsplash.com/400x300/?skin,${encodeURIComponent(searchQuery)}`,
    ];
    setReferenceImages(imageUrls);
  }, [diagnosis]);

  const handleLearnMore = () => {
    const searchQuery = encodeURIComponent(diagnosis.name);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
  };

  return (
    <div className="diagnosis-result-container">
      <div className="result-header">
        <h2>Analysis Results</h2>
        <div className="confidence-badge">Preliminary Assessment</div>
      </div>

      <div className="diagnosis-card">
        <h3 className="diagnosis-name">{diagnosis.name}</h3>
        
        <div className="diagnosis-section">
          <h4>📋 Description</h4>
          <p>{diagnosis.description}</p>
        </div>

        {diagnosis.treatment && (
          <div className="diagnosis-section">
            <h4>💊 Possible Treatment Options</h4>
            <p>{diagnosis.treatment}</p>
          </div>
        )}

        <div className="diagnosis-section">
          <h4>🔍 Reference Images</h4>
          <p className="reference-note">
            Below are reference images from medical databases that may resemble similar conditions:
          </p>
          <div className="reference-images-grid">
            {referenceImages.map((url, index) => (
              <div key={index} className="reference-image-card">
                <img 
                  src={url} 
                  alt={`Reference ${index + 1} for ${diagnosis.name}`}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300/667eea/ffffff?text=Reference+Image+${index + 1}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button className="learn-more-button" onClick={handleLearnMore}>
          🌐 Learn More Online
        </button>
      </div>

      <div className="medical-disclaimer">
        <div className="disclaimer-icon">⚠️</div>
        <div className="disclaimer-content">
          <h4>Important Medical Disclaimer</h4>
          <ul>
            <li>This analysis is <strong>NOT a medical diagnosis</strong> and should not be treated as such.</li>
            <li>Results are based on symptom matching and may not be accurate.</li>
            <li>Skin conditions can have similar appearances but require different treatments.</li>
            <li><strong>Always consult a qualified dermatologist</strong> for proper diagnosis and treatment.</li>
            <li>Do not start any treatment without professional medical advice.</li>
            <li>If you experience severe symptoms, seek immediate medical attention.</li>
          </ul>
        </div>
      </div>

      <div className="action-buttons">
        <button className="find-dermatologist-button">
          🏥 Find a Dermatologist Near You
        </button>
      </div>
    </div>
  );
};

export default DiagnosisResult;

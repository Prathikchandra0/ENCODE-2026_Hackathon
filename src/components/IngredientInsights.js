import React, { useState } from 'react';
import './IngredientInsights.css';

const IngredientInsights = ({ analysis, preferences }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getConcernColor = (level) => {
    switch (level) {
      case 'high': return '#d32f2f';
      case 'medium': return '#f57c00';
      case 'low': return '#fbc02d';
      default: return '#666';
    }
  };

  const getConcernIcon = (level) => {
    switch (level) {
      case 'high': return '🚫';
      case 'medium': return '⚠️';
      case 'low': return '⚡';
      default: return '💡';
    }
  };

  const getConfidenceBadge = (confidence) => {
    const badges = {
      high: { text: 'High Confidence', color: '#43cea2' },
      medium: { text: 'Medium Confidence', color: '#f57c00' },
      low: { text: 'Low Confidence', color: '#999' }
    };
    return badges[confidence] || badges.medium;
  };

  const ScoreCircle = ({ score, maxScore }) => {
    const percentage = (score / maxScore) * 100;
    const strokeColor = percentage > 70 ? '#43cea2' : percentage > 40 ? '#f57c00' : '#d32f2f';
    
    return (
      <div className="score-circle-container">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="12"
          />
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke={strokeColor}
            strokeWidth="12"
            strokeDasharray={`${2 * Math.PI * 70}`}
            strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            transform="rotate(-90 90 90)"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="score-text">
          <div className="score-value">{score}</div>
          <div className="score-max">out of {maxScore}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="ingredient-insights-container">
      <div className="insights-header">
        <h2>🔬 Ingredient Analysis</h2>
        <div className="score-section">
          <ScoreCircle score={analysis.overallScore} maxScore={analysis.maxScore} />
          <div className="score-interpretation">
            <h3>Health Score</h3>
            <p>
              {analysis.overallScore > 7 
                ? 'This product has relatively clean ingredients with minimal concerns.'
                : analysis.overallScore > 4
                ? 'This product has some ingredients worth being aware of.'
                : 'This product contains several ingredients that may warrant caution.'}
            </p>
          </div>
        </div>
      </div>

      {analysis.personalizedNotes && analysis.personalizedNotes.length > 0 && (
        <div className="personalized-alerts">
          <h3>👤 Personalized Alerts</h3>
          {analysis.personalizedNotes.map((note, index) => (
            <div key={index} className="alert-item">
              {note}
            </div>
          ))}
        </div>
      )}

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'concerns' ? 'active' : ''}`}
            onClick={() => setActiveTab('concerns')}
          >
            Concerns ({analysis.concerns.length})
          </button>
          <button 
            className={`tab ${activeTab === 'positives' ? 'active' : ''}`}
            onClick={() => setActiveTab('positives')}
          >
            Positives
          </button>
          <button 
            className={`tab ${activeTab === 'uncertainty' ? 'active' : ''}`}
            onClick={() => setActiveTab('uncertainty')}
          >
            Uncertainties
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="ingredient-list-section">
                <h3>📋 Detected Ingredients</h3>
                <div className="ingredient-chips">
                  {analysis.ingredients.map((ingredient, index) => (
                    <span key={index} className="ingredient-chip">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="quick-summary">
                <h3>⚡ Quick Summary</h3>
                <div className="summary-grid">
                  <div className="summary-card red">
                    <div className="summary-number">{analysis.concerns.filter(c => c.level === 'high').length}</div>
                    <div className="summary-label">High Concerns</div>
                  </div>
                  <div className="summary-card orange">
                    <div className="summary-number">{analysis.concerns.filter(c => c.level === 'medium').length}</div>
                    <div className="summary-label">Medium Concerns</div>
                  </div>
                  <div className="summary-card green">
                    <div className="summary-number">{analysis.positives.length}</div>
                    <div className="summary-label">Positive Aspects</div>
                  </div>
                  <div className="summary-card blue">
                    <div className="summary-number">{analysis.uncertainties.length}</div>
                    <div className="summary-label">Uncertainties</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'concerns' && (
            <div className="concerns-content">
              {analysis.concerns.map((concern, index) => (
                <div 
                  key={index} 
                  className="concern-card"
                  style={{ borderLeftColor: getConcernColor(concern.level) }}
                >
                  <div className="concern-header">
                    <span className="concern-icon">{getConcernIcon(concern.level)}</span>
                    <h4>{concern.ingredient}</h4>
                    <span 
                      className="confidence-badge"
                      style={{ backgroundColor: getConfidenceBadge(concern.confidence).color }}
                    >
                      {getConfidenceBadge(concern.confidence).text}
                    </span>
                  </div>
                  <div className="concern-reason">
                    <strong>Why it matters:</strong> {concern.reason}
                  </div>
                  <div className="concern-explanation">
                    {concern.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'positives' && (
            <div className="positives-content">
              {analysis.positives.map((positive, index) => (
                <div key={index} className="positive-card">
                  <div className="positive-header">
                    <span className="positive-icon">✅</span>
                    <h4>{positive.ingredient}</h4>
                  </div>
                  <div className="positive-benefit">
                    <strong>Benefit:</strong> {positive.benefit}
                  </div>
                  {positive.note && (
                    <div className="positive-note">
                      💡 <em>{positive.note}</em>
                    </div>
                  )}
                </div>
              ))}

              <div className="alternatives-section">
                <h3>🔄 Consider These Alternatives</h3>
                <ul className="alternatives-list">
                  {analysis.alternatives.map((alt, index) => (
                    <li key={index}>{alt}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'uncertainty' && (
            <div className="uncertainty-content">
              <div className="uncertainty-intro">
                <h3>🤔 What We're Uncertain About</h3>
                <p>
                  Science is evolving, and complete transparency means acknowledging what we don't know. 
                  Here are areas where information is incomplete or uncertain:
                </p>
              </div>
              {analysis.uncertainties.map((uncertainty, index) => (
                <div key={index} className="uncertainty-card">
                  <span className="uncertainty-icon">❓</span>
                  <p>{uncertainty}</p>
                </div>
              ))}
              <div className="uncertainty-footer">
                <p>
                  <strong>Our philosophy:</strong> We believe in honest communication. When scientific 
                  consensus is unclear or data is incomplete, we tell you. This helps you make informed 
                  decisions based on your personal risk tolerance.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientInsights;

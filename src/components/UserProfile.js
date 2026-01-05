import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = ({ onPreferencesChange, preferences }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dietaryOptions = [
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
    { id: 'dairy-free', label: 'Dairy-Free', icon: '🥛' },
    { id: 'halal', label: 'Halal', icon: '☪️' },
    { id: 'kosher', label: 'Kosher', icon: '✡️' }
  ];

  const healthGoals = [
    { id: 'weight-loss', label: 'Weight Management', icon: '⚖️' },
    { id: 'heart-health', label: 'Heart Health', icon: '❤️' },
    { id: 'diabetes', label: 'Blood Sugar Control', icon: '🩺' },
    { id: 'clean-eating', label: 'Clean Eating', icon: '🥗' },
    { id: 'allergies', label: 'Allergy Management', icon: '🚫' }
  ];

  const concerns = [
    { id: 'children', label: 'For Children', icon: '👶' },
    { id: 'pregnancy', label: 'Pregnancy', icon: '🤰' },
    { id: 'elderly', label: 'Senior Health', icon: '👴' },
    { id: 'athletes', label: 'Athletic Performance', icon: '💪' }
  ];

  const toggleOption = (category, optionId) => {
    const updatedPreferences = { ...preferences };
    const categoryArray = updatedPreferences[category];
    
    if (categoryArray.includes(optionId)) {
      updatedPreferences[category] = categoryArray.filter(id => id !== optionId);
    } else {
      updatedPreferences[category] = [...categoryArray, optionId];
    }
    
    onPreferencesChange(updatedPreferences);
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2>⚙️ Personalize Your Experience</h2>
        <p className="profile-subtitle">
          Optional: Tell us about your dietary needs and health goals for personalized insights
        </p>
        <button className="expand-button">
          {isExpanded ? '▲ Hide Options' : '▼ Show Options'}
        </button>
      </div>

      {isExpanded && (
        <div className="profile-content">
          <div className="preference-section">
            <h3>Dietary Restrictions</h3>
            <div className="options-grid">
              {dietaryOptions.map(option => (
                <div
                  key={option.id}
                  className={`option-card ${preferences.dietaryRestrictions.includes(option.id) ? 'selected' : ''}`}
                  onClick={() => toggleOption('dietaryRestrictions', option.id)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="preference-section">
            <h3>Health Goals</h3>
            <div className="options-grid">
              {healthGoals.map(option => (
                <div
                  key={option.id}
                  className={`option-card ${preferences.healthGoals.includes(option.id) ? 'selected' : ''}`}
                  onClick={() => toggleOption('healthGoals', option.id)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="preference-section">
            <h3>Special Considerations</h3>
            <div className="options-grid">
              {concerns.map(option => (
                <div
                  key={option.id}
                  className={`option-card ${preferences.concerns.includes(option.id) ? 'selected' : ''}`}
                  onClick={() => toggleOption('concerns', option.id)}
                >
                  <span className="option-icon">{option.icon}</span>
                  <span className="option-label">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

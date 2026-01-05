import React from 'react';
import './SymptomSelector.css';

const SymptomSelector = ({ onSymptomChange, selectedSymptoms }) => {
  const symptoms = [
    { id: 'itching', label: 'Itching', icon: '🤚' },
    { id: 'redness', label: 'Redness', icon: '🔴' },
    { id: 'scaling', label: 'Scaling/Flaking', icon: '❄️' },
    { id: 'dryness', label: 'Dryness', icon: '🏜️' },
    { id: 'inflammation', label: 'Inflammation/Swelling', icon: '💢' },
    { id: 'pimples', label: 'Pimples/Bumps', icon: '🔸' },
    { id: 'visible_blood_vessels', label: 'Visible Blood Vessels', icon: '🩸' }
  ];

  const handleSymptomToggle = (symptomId) => {
    let updatedSymptoms;
    if (selectedSymptoms.includes(symptomId)) {
      updatedSymptoms = selectedSymptoms.filter(s => s !== symptomId);
    } else {
      updatedSymptoms = [...selectedSymptoms, symptomId];
    }
    onSymptomChange(updatedSymptoms);
  };

  return (
    <div className="symptom-selector-container">
      <h2>Select Symptoms</h2>
      <p className="symptom-instruction">Choose all symptoms that apply to your condition</p>
      
      <div className="symptoms-grid">
        {symptoms.map(symptom => (
          <div
            key={symptom.id}
            className={`symptom-card ${selectedSymptoms.includes(symptom.id) ? 'selected' : ''}`}
            onClick={() => handleSymptomToggle(symptom.id)}
          >
            <div className="symptom-icon">{symptom.icon}</div>
            <div className="symptom-label">{symptom.label}</div>
            <div className="checkmark">{selectedSymptoms.includes(symptom.id) ? '✓' : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SymptomSelector;

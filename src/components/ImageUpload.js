import React, { useRef } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageUpload, uploadedImage }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="image-upload-container">
      <h2>📷 Upload Food Label</h2>
      <p className="upload-description">
        Snap a photo of the ingredient list or nutrition label
      </p>
      <div 
        className="upload-area"
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {uploadedImage ? (
          <div className="uploaded-image-preview">
            <img src={uploadedImage} alt="Uploaded food label" />
            <p className="change-image-text">Click to change image</p>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">🍽️</div>
            <p>Upload a photo of the food label</p>
            <p className="upload-hint">Click to browse or drag & drop</p>
            <p className="upload-hint">PNG, JPG, JPEG • Max 10MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default ImageUpload;

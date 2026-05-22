import React, { useState, useRef } from 'react';
import './Forms.css';

const ModernForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    course: '',
    languages: [],
    description: '',
    photo: null
  });

  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const courses = [
    'Computer Science',
    'Data Science',
    'Web Development'
  ];

  const languages = [
    'English',
    'Japanese',
    'Arabic'
  ];

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'gender':
        if (!value) {
          error = 'Gender selection is required';
        }
        break;
      case 'course':
        if (!value) {
          error = 'Course selection is required';
        }
        break;
      case 'languages':
        if (value.length === 0) {
          error = 'At least one language must be selected';
        }
        break;
      case 'description':
        if (!value.trim()) {
          error = 'Description is required';
        } else if (value.trim().split(/\s+/).length > 100) {
          error = 'Description must not exceed 100 words';
        }
        break;
      case 'photo':
        if (!value) {
          error = 'Photo is required';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLanguageChange = (language) => {
    const updatedLanguages = formData.languages.includes(language)
      ? formData.languages.filter(lang => lang !== language)
      : [...formData.languages, language];
    
    setFormData(prev => ({
      ...prev,
      languages: updatedLanguages
    }));

    if (errors.languages) {
      setErrors(prev => ({
        ...prev,
        languages: ''
      }));
    }
  };

  const handleFileChange = (file) => {
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        setErrors(prev => ({
          ...prev,
          photo: 'File size must be less than 1MB'
        }));
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          photo: 'Please select an image file'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        photo: file
      }));

      if (errors.photo) {
        setErrors(prev => ({
          ...prev,
          photo: ''
        }));
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
      alert('Form submitted successfully!');
    }
  };

  const getWordCount = () => {
    return formData.description.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Forms</h1>
        <p>Fill in your details to get started</p>
      </div>

      <div className="modern-form">
        {/* Name Field with Floating Label */}
        <div className="form-group">
          <div className="floating-input-wrapper">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`floating-input ${errors.name ? 'error' : ''}`}
              placeholder=" "
            />
            <label htmlFor="name" className="floating-label">Name</label>
          </div>
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Gender Field */}
        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            {['Male', 'Female', 'Other'].map((gender) => (
              <label key={gender} className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleInputChange}
                />
                <span className="radio-custom"></span>
                {gender}
              </label>
            ))}
          </div>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>

        {/* Course Field */}
        <div className="form-group">
          <label htmlFor="course">Course</label>
          <div className="select-wrapper">
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className={`form-select ${errors.course ? 'error' : ''}`}
            >
              <option value="">Select your course</option>
              {courses.map((course) => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          {errors.course && <span className="error-message">{errors.course}</span>}
        </div>

        {/* Languages Field */}
        <div className="form-group">
          <label>Languages Known</label>
          <div className="checkbox-grid">
            {languages.map((language) => (
              <label key={language} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.languages.includes(language)}
                  onChange={() => handleLanguageChange(language)}
                />
                <span className="checkbox-custom"></span>
                {language}
              </label>
            ))}
          </div>
          {errors.languages && <span className="error-message">{errors.languages}</span>}
        </div>

        {/* Description Field with Floating Label */}
        <div className="form-group">
          <div className="floating-textarea-wrapper">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`floating-textarea ${errors.description ? 'error' : ''}`}
              placeholder=" "
              rows="4"
            ></textarea>
            <label htmlFor="description" className="floating-label">Description</label>
            <div className="word-counter">
              <span className={getWordCount() > 100 ? 'over-limit' : ''}>
                {getWordCount()}/100 words
              </span>
            </div>
          </div>
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        {/* Photo Upload Field */}
        <div className="form-group">
          <label>Photo</label>
          <div
            className={`file-upload-area ${isDragging ? 'dragging' : ''} ${errors.photo ? 'error' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current.click()}
          >
            <div className="upload-content">
              {isDragging ? (
                <div className="wave-animation">
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
              ) : (
                <>
                  <div className="upload-icon">📁</div>
                  {formData.photo ? (
                    <div className="file-info">
                      <p className="file-name">{formData.photo.name}</p>
                      <p className="file-size">{(formData.photo.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <div>
                      <p>Drop your photo here or click to browse</p>
                      <span className="file-limit">Max size: 1MB</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files[0])}
            accept="image/*"
            style={{ display: 'none' }}
          />
          {errors.photo && <span className="error-message">{errors.photo}</span>}
        </div>

        {/* Submit Button */}
        <button type="button" onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ModernForm;
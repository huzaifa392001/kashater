import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    course: '',
    languages: [],
    description: '',
    photo: null
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      const updatedLanguages = checked
        ? [...formData.languages, value]
        : formData.languages.filter(lang => lang !== value);
      
      setFormData(prev => ({ ...prev, languages: updatedLanguages }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, photo: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      setFormData(prev => ({ ...prev, photo: files[0] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div className="app">
      <h1>Form</h1>
      <form onSubmit={handleSubmit} className="form-container">
        {/* Name Field */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="animated-input"
            required
          />
        </div>

        {/* Gender Field */}
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
                required
              />
              <span className="radio-custom"></span>
              Male
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              <span className="radio-custom"></span>
              Female
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleInputChange}
              />
              <span className="radio-custom"></span>
              Other
            </label>
          </div>
        </div>

        {/* Course Field */}
        <div className="form-group">
          <label>Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="animated-select"
            required
          >
            <option value="">Select a course</option>
            <option value="computer-science">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business Administration</option>
            <option value="arts">Arts & Humanities</option>
            <option value="medicine">Medicine</option>
          </select>
        </div>

        {/* Languages Known Field */}
        <div className="form-group">
          <label>Languages Known:</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="languages"
                value="english"
                checked={formData.languages.includes('english')}
                onChange={handleInputChange}
              />
              <span className="checkbox-custom"></span>
              English
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="languages"
                value="spanish"
                checked={formData.languages.includes('spanish')}
                onChange={handleInputChange}
              />
              <span className="checkbox-custom"></span>
              Spanish
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="languages"
                value="french"
                checked={formData.languages.includes('french')}
                onChange={handleInputChange}
              />
              <span className="checkbox-custom"></span>
              French
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="languages"
                value="german"
                checked={formData.languages.includes('german')}
                onChange={handleInputChange}
              />
              <span className="checkbox-custom"></span>
              German
            </label>
          </div>
        </div>

       {/* Description Field */}
<div className="form-group">
  <label>Description:</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={(e) => {
      const words = e.target.value.trim().split(/\s+/);

      if (words.length > 100) {
        alert("You have reached the 100 word limit!");
        return; // stop updating state
      }

      handleInputChange(e); // update state normally
    }}
    className="animated-textarea"
    rows="4"
  ></textarea>
  <small>
    {formData.description.trim() === ""
      ? "0"
      : formData.description.trim().split(/\s+/).length} / 100 words
  </small>
</div>

        {/* Photo Upload Field */}
<div className="form-group">
  <label>Photo:</label>
  <div 
    className={`file-upload ${isDragging ? 'dragging' : ''}`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
  >
    <div className="wave-container">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
    </div>
    <div className="upload-content">
      <p>Drag & drop or click to <br />upload the file</p>
      <input
        type="file"
        name="photo"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const maxSize = 1 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
              alert("File size exceeds 10MB. Please choose a smaller file.");
              e.target.value = ""; // clear the input
              return;
            }
            handleInputChange(e); // process valid file
          }
        }}
        className="file-input"
        accept="image/*"
      />
    </div>
    {formData.photo && (
      <p className="file-name">Selected file: {formData.photo.name}</p>
    )}
  </div>
</div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit Form</button>
      </form>
    </div>
  );
};

export default App;
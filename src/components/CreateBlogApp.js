import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createBlogStyle.css';

const CreateBlogApp = () => {
  const [formData, setFormData] = useState({
    title: '',
    section: '',
    author: '',
    content: ''
  });

  const [errors, setErrors] = useState({
    title: '',
    section: '',
    author: '',
    content: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const sectionOptions = [
    'IT',
    'Joke',
    'Technology',
    'Beauty',
    'Health',
    'Travel',
    'Food',
    'Fashion',
    'Lifestyle',
    'Sports',
    'Animals',
    'Other'
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' }); // Clear error message when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/blogs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle successful submission
      alert('Blog created successfully!');
      setFormData({
        title: '',
        section: '',
        author: '',
        content: ''
      });

      navigate('/'); // Redirect to the main page upon successful submission
    } catch (error) {
      console.error('Error:', error);
      // Handle error states or display error message to user
      alert('Failed to create blog. Please try again.');
    }
  };

  const validateForm = () => {
    let valid = true;

    if (!formData.title.trim()) {
      setErrors({ ...errors, title: 'Title is required' });
      valid = false;
    }

    if (!formData.section.trim()) {
      setErrors({ ...errors, section: 'Section is required' });
      valid = false;
    }

    if (!formData.author.trim()) {
      setErrors({ ...errors, author: 'Author is required' });
      valid = false;
    }

    if (!formData.content.trim()) {
      setErrors({ ...errors, content: 'Content is required' });
      valid = false;
    }

    return valid;
  };

  return (
    <div className='main-div'>
      <div className="form">
        <div className="title">Create New Blog</div>
        <form onSubmit={handleSubmit}>
          <div className="input-container ic1">
            <input
              id="title"
              className="input"
              type="text"
              placeholder=" "
              value={formData.title}
              onChange={handleChange}
            />
            <div className="cut cut-one" />
            <label htmlFor="title" className="placeholder">
              Title
            </label>
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>
          <div className="input-container ic2">
            <select
              id="section"
              className="input"
              value={formData.section}
              onChange={handleChange}
            >
              <option value="">Select Section</option>
              {sectionOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            
           
            {errors.section && <div className="error-message">{errors.section}</div>}
          </div>
          <div className="input-container ic2">
            <input
              id="author"
              className="input"
              type="text"
              placeholder=" "
              value={formData.author}
              onChange={handleChange}
            />
            <div className="cut cut-short" />
            <label htmlFor="author" className="placeholder">
              Author
            </label>
            {errors.author && <div className="error-message">{errors.author}</div>}
          </div>
          <div className="input-container ic2">
            <input
              id="content"
              className="input"
              type="text"
              placeholder=" "
              value={formData.content}
              onChange={handleChange}
            />
            <div className="cut cut-short pmd" />
            <label htmlFor="content" className="placeholder">
              Content
            </label>
            {errors.content && <div className="error-message">{errors.content}</div>}
          </div>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogApp;

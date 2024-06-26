import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createBlogStyle.css';

const EditBlog = ({ initialData }) => {
    const [formData, setFormData] = useState({
        id: initialData.id,
        title: initialData.title || '',
        section: initialData.section || '',
        author: initialData.author || '',
        content: initialData.content || '',
        likes: initialData.likes || 0,
        dislikes: initialData.dislikes || 0,
        creationDate: initialData.creationDate || ''
    });

    const [errors, setErrors] = useState({
        title: '',
        section: '',
        author: '',
        content: ''
    });

    const navigate = useNavigate(); 

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
        setErrors({ ...errors, [id]: '' }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/blogs/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

           
            alert('Blog updated successfully!');
            navigate('/'); 
        } catch (error) {
            console.error('Error:', error);
            
            alert('Failed to update blog. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/blogs/delete/${formData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Blog deleted successfully!');
            navigate('/'); 
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete blog. Please try again.');
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
            <div className="form form-ed">
                <div className="title">Edit Blog</div>
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
                        {errors.content && <div className="error-message">{errors.content}</div>}
                    </div>
                    <button type="submit" className="submit">
                        Update
                    </button>

                    <button type="button" className="delete-btn" onClick={handleDelete}>
                        Delete
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;

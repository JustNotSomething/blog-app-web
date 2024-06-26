import React, { useEffect, useState } from 'react';
import '../App.css';  
import { useNavigate } from 'react-router-dom';

const BlogApp = ({ showFilters }) => {
    const [blogs, setBlogs] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    const navigate = useNavigate(); 

    const fetchBlogs = () => {
        fetch('http://localhost:8080/blogs/getAll')
            .then(response => response.json())
            .then(data => {
                const sortedBlogs = data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                setBlogs(sortedBlogs);
                setFilteredBlogs(sortedBlogs); 
            })
            .catch(error => console.error('Error fetching blogs:', error));
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleLike = (id) => {
        fetch(`http://localhost:8080/blogs/like/${id}`, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    fetchBlogs();
                } else {
                    console.error('Error liking blog:', response.statusText);
                }
            })
            .catch(error => console.error('Error liking blog:', error));
    };

    const handleDislike = (id) => {
        fetch(`http://localhost:8080/blogs/dislike/${id}`, { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    fetchBlogs();
                } else {
                    console.error('Error disliking blog:', response.statusText);
                }
            })
            .catch(error => console.error('Error disliking blog:', error));
    };

    const filterBlogsBySection = (section) => {
        if (section === selectedSection) {
            setSelectedSection(null);
            setFilteredBlogs(blogs); 
        } else {
            setSelectedSection(section);
            const filtered = blogs.filter(blog => blog.section === section);
            setFilteredBlogs(filtered);
        }
    };

    const resetFilters = () => {
        setSelectedSection(null);
        setFilteredBlogs(blogs); 
    };


    const handleEdit = (id) => {
        navigate(`/edit-blog/${id}`);
    };

    return (
        <div className="main-div">
            <div className="grid">
                {filteredBlogs.map(blog => (
                    <div key={blog.id} className="card">
                        <span className='section-blog-name'>{blog.section}</span>
                        <h4>{blog.title}</h4>
                        <p className="blog-description">{blog.content}</p>
                        <p className="blog-meta">Author: {blog.author}</p>
                        <div className='blok-like-container'>
                            <div className='sm-like' onClick={() => handleLike(blog.id)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white w6-like" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"/>
                                </svg>
                                <p className='blog-likes'>{blog.likes}</p>
                            </div>
                            <div className='sm-dislike' onClick={() => handleDislike(blog.id)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white w6-dis" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087c-.205.095-.388.233-.537.406a1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"/>
                                </svg>
                                <p className='blog-dislikes'>{blog.dislikes}</p>
                            </div>
                        </div>

                        <div className='edit-cont' onClick={() => handleEdit(blog.id)}>
                            <svg className="w-6 h-6 text-dark-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd"/>
                                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <div className="shine"></div>
                        <div className="background">
                            <div className="tiles">
                                <div className="tile tile-1"></div>
                                <div className="tile tile-2"></div>
                                <div className="tile tile-3"></div>
                                <div className="tile tile-4"></div>
                                <div className="tile tile-5"></div>
                                <div className="tile tile-6"></div>
                                <div className="tile tile-7"></div>
                                <div className="tile tile-8"></div>
                                <div className="tile tile-9"></div>
                                <div className="tile tile-10"></div>
                            </div>
                            <div className="line line-1"></div>
                            <div className="line line-2"></div>
                            <div className="line line-3"></div>
                        </div>
                    </div>
                ))}
            </div>

            {showFilters && (
                <div className='filter-items'>
                    <button className="button-85" onClick={() => filterBlogsBySection('IT')} role="button">IT</button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Joke')} role="button">Joke</button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Technology')} role="button">Technology</button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Beauty')} role="button">Beauty</button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Health')} role="button">Health</button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Travel')} role="button">Travel</button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Food')} role="button">Food </button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Fashion')} role="button">Fashion </button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Lifestyle')} role="button">Lifestyle</button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Sports')} role="button">Sports </button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Animals')} role="button">Animals</button>
                    <button className="button-85" onClick={() => filterBlogsBySection('Other')} role="button">Other</button>
                </div>
            )}
        </div>
    );
};

export default BlogApp;

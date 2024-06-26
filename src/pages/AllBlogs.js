import React, { useState } from 'react';
import '../App.css'; 
import BlogApp from '../components/BlogApp'; 
import Nav from '../components/Nav';

function AllBlogs() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null); // State to track selected section

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setSelectedSection(null);
    
  };

  return (
    <div className="AllBlogs">
      <Nav toggleFilters={toggleFilters} showFilters={showFilters} resetFilters={resetFilters} />
      <BlogApp showFilters={showFilters} selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
    </div>
  );
}

export default AllBlogs;

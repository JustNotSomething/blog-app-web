import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateBlogPage from './pages/CreateBlog'; 
import AllBlogsPage from './pages/AllBlogs'; 
import EditPage from './pages/EditPage';

const App = () => {
  return (
    <Router>
    <Routes>
       <Route path="/" element={<AllBlogsPage />} />
       <Route path="/create-blog" element={<CreateBlogPage />} />
       <Route path="/edit-blog/:id" element={<EditPage />} />

    </Routes>
 </Router>
  );
};

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const NavCustom = () => (
  <div className="container">
    <h2 className="header-logo">Blog Application</h2>
    <ul className="nav-links">
      <li><Link to="/">All blogs</Link></li>
      <li className="center"><Link to="/create-blog">Create Blog</Link></li>
      
    </ul>
  </div>
);

export default NavCustom;

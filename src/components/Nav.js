import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Nav = ({ toggleFilters, showFilters, resetFilters }) => (
  <div className="container">
    <h2 className="header-logo">Blog Application</h2>
    <ul className="nav-links">
      <li><Link to="/" onClick={resetFilters}>All blogs</Link></li>
      <li className="center"><Link to="/create-blog">Create Blog</Link></li>
      <li className="forward">
        <a href="#" onClick={toggleFilters}>
          {showFilters ? 'Hide Filters' : 'Filter'}
        </a>
      </li>
    </ul>
  </div>
);

export default Nav;

import React from 'react';
import './Navbar.css';
import logo from '../Logos/300x300_notext_logo.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="JobJotter Logo" className="navbar-logo" />
        <h1 style={{ color: '#0056b3' }}>JobJotter</h1>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#analytics">Analytics</a></li>
        <li><a href="#applications">Applications</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
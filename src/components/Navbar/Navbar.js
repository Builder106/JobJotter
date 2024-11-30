import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Logos/300x300_notext_logo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="JobJotter Logo" className="navbar-logo" />
        <h1 style={{ color: '#0056b3' }}>JobJotter</h1>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#analytics">Analytics</a></li>
        <li><a href="#applications">Applications</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
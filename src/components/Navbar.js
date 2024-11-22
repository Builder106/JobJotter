import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>JobJotter</h1>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#analytics">Analytics</a></li>
        <li><a href="#applications">Applications</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
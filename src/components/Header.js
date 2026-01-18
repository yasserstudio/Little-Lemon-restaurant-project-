import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Nav from './Nav';

/**
 * Header component containing the logo and navigation
 * Includes accessibility features and responsive design
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Toggles mobile menu visibility
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header" role="banner">
      {/* Skip link for accessibility - allows keyboard users to skip to main content */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="container">
        {/* Restaurant Logo */}
        <Link to="/" aria-label="Little Lemon Home">
          <div className="logo-text">
            Little Lemon
            <span>Chicago</span>
          </div>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="menu-button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="main-nav"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        
        {/* Main Navigation */}
        <Nav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}

export default Header;

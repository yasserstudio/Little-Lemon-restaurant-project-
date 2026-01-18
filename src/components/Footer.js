import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component with navigation, contact info, and social links
 * Uses semantic HTML and accessibility features
 */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Logo Section */}
        <div className="footer-section">
          <div className="logo-text" style={{ color: '#fff' }}>
            Little Lemon
            <span>Chicago</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Footer navigation">
          <h4>Navigation</h4>
          <ul className="footer-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/booking">Reservations</Link></li>
          </ul>
        </nav>

        {/* Contact Information */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <address>
            <p>123 Main Street</p>
            <p>Chicago, IL 60601</p>
            <p>
              <a href="tel:+13125551234" aria-label="Call us at (312) 555-1234">
                (312) 555-1234
              </a>
            </p>
            <p>
              <a href="mailto:info@littlelemon.com" aria-label="Email us at info@littlelemon.com">
                info@littlelemon.com
              </a>
            </p>
          </address>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <h4>Connect With Us</h4>
          <ul className="footer-nav">
            <li>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page (opens in new tab)"
              >
                Facebook
              </a>
            </li>
            <li>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our Instagram page (opens in new tab)"
              >
                Instagram
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit our Twitter page (opens in new tab)"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="container" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p style={{ marginBottom: 0 }}>
          © {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

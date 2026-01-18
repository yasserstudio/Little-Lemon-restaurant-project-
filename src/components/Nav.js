import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navigation component with accessible links
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether mobile menu is open
 * @param {function} props.onClose - Function to close mobile menu
 */
function Nav({ isOpen, onClose }) {
  /**
   * Navigation items configuration
   */
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/booking', label: 'Reservations' },
  ];

  return (
    <nav id="main-nav" aria-label="Main navigation">
      <ul className={`nav-list ${isOpen ? 'active' : ''}`} role="menubar">
        {navItems.map((item) => (
          <li key={item.path} role="none">
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
              role="menuitem"
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;

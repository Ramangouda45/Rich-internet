import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ eventsCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Event Catalog' },
    { to: '/book', label: 'Book Celebration' },
    { to: '/create', label: '+ Create Theme' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-logo-icon">
            <span>✨</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">Celebration<span className="brand-highlight">Craft</span></span>
            <span className="brand-tagline">Bespoke Milestone Celebrations</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-only">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
            >
              {link.label}
              {link.to === '/events' && (
                <span className="nav-pill-badge">{eventsCount}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="navbar-actions desktop-only">
          <Link to="/book" className="btn btn-primary btn-sm">
            <span>🎉 Plan Event</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-menu-toggle"
          aria-label="Toggle Navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="container mobile-menu-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-nav-link ${isActive(link.to) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                {link.to === '/events' && (
                  <span className="nav-pill-badge">{eventsCount}</span>
                )}
              </Link>
            ))}
            <Link
              to="/book"
              className="btn btn-primary"
              style={{ marginTop: '1rem', width: '100%' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              🎉 Book an Event Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

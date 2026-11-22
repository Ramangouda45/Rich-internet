import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <span className="brand-logo-icon">✨</span>
              <span className="brand-title">Celebration<span className="brand-highlight">Craft</span></span>
            </div>
            <p className="footer-desc">
              Transforming life's greatest milestones into breathtaking memories. From sacred haldis and fairytale weddings to milestone birthdays and sweet baby showers.
            </p>
            <div className="footer-badges-list">
              <span className="badge badge-gold">⭐ 4.9/5 Rating</span>
              <span className="badge badge-emerald">🛡️ Verified Planners</span>
            </div>
          </div>

          {/* Milestone Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Milestones</h4>
            <ul className="footer-links">
              <li><Link to="/events?category=Birthday">Birthday Bashes</Link></li>
              <li><Link to="/events?category=Haldi">Traditional Haldi</Link></li>
              <li><Link to="/events?category=Marriage">Royal Marriages</Link></li>
              <li><Link to="/events?category=Baby Shower">Baby Showers</Link></li>
              <li><Link to="/create">Design Custom Theme</Link></li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/events">All Packages</Link></li>
              <li><Link to="/book">Instant Booking</Link></li>
              <li><Link to="/create">+ Add New Theme</Link></li>
            </ul>
          </div>

          {/* Concierge & Guarantees */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Promise</h4>
            <div className="footer-promise-card">
              <div className="promise-item">
                <span className="promise-icon">🎨</span>
                <div>
                  <strong>Bespoke Artistry</strong>
                  <p>Every single theme is customized to your family aesthetic.</p>
                </div>
              </div>
              <div className="promise-item">
                <span className="promise-icon">⏱️</span>
                <div>
                  <strong>Flawless Punctuality</strong>
                  <p>Venue decor completed 2 hours prior to guest arrival.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CelebrationCraft. All rights reserved. Crafting extraordinary milestones with love.</p>
          <div className="footer-bottom-links">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Concierge Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

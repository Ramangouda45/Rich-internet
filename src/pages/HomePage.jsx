import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../assets/events/hero.jpg';
import { categoryMetadata } from '../data/initialEvents';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/events?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge-pill animate-float">
              <span className="sparkle-icon">✨</span>
              <span>Where Milestones Become Timeless Art</span>
            </div>

            <h1 className="hero-title font-display">
              Crafting Life’s Most <br />
              <span className="text-gradient-gold">Unforgettable Milestones</span>
            </h1>

            <p className="hero-subtitle">
              Welcome to <strong>CelebrationCraft</strong>. We design bespoke, awe-inspiring atmospheres for your sacred moments — from radiant Haldi ceremonies and royal weddings to milestone birthdays and starlit baby showers.
            </p>

            <div className="hero-actions">
              <Link to="/events" className="btn btn-primary btn-lg" id="hero-browse-events-btn">
                <span>Explore Packages</span>
                <span className="btn-arrow">→</span>
              </Link>
              <Link to="/book" className="btn btn-outline btn-lg" id="hero-book-now-btn">
                <span>Book a Celebration</span>
              </Link>
            </div>

            {/* Metric counters */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-number">1,250+</span>
                <span className="stat-label">Milestones Hosted</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.95 ★</span>
                <span className="stat-label">Client Love Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Tailored Themes</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="hero-visual-wrapper">
            <div className="hero-image-frame glass-card animate-glow">
              <img
                src={heroImg}
                alt="Luxury Celebration Setup by CelebrationCraft"
                className="hero-main-img"
              />
              <div className="hero-image-overlay"></div>

              {/* Floating aesthetic badges */}
              <div className="floating-card floating-top-left">
                <span className="floating-icon">🌼</span>
                <div>
                  <strong>Haldi Bliss</strong>
                  <small>Auspicious Marigold Elegance</small>
                </div>
              </div>

              <div className="floating-card floating-bottom-right">
                <span className="floating-icon">💍</span>
                <div>
                  <strong>Royal Vows</strong>
                  <small>Grand Mandap Artistry</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Preview Cards Section */}
      <section className="categories-section" id="categories-preview">
        <div className="container">
          <div className="section-header text-center">
            <span className="badge badge-gold">Cherished Milestones</span>
            <h2 className="section-title font-display">
              Browse Signature <span className="text-gradient-gold">Celebration Categories</span>
            </h2>
            <p className="section-subtitle">
              Choose your special milestone below to explore curated packages with transparent base pricing, full decor setups, and customizable options.
            </p>
          </div>

          {/* 4 Static Category Preview Cards */}
          <div className="category-cards-grid">
            {categoryMetadata.map((cat) => (
              <div
                key={cat.id}
                className="category-preview-card glass-card"
                id={`category-card-${cat.id}`}
                onClick={() => handleCategoryClick(cat.name)}
              >
                {/* Media Image */}
                <div className="category-card-media">
                  <img
                    src={cat.image}
                    alt={`${cat.name} Celebration Packages`}
                    className="category-card-img"
                  />
                  <div className="category-card-overlay"></div>
                  
                  {/* Category Pill */}
                  <div className="category-card-top">
                    <span className="category-icon-pill">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="category-starting-price">
                      From {cat.priceFrom}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="category-card-body">
                  <h3 className="category-card-name">{cat.name} Celebrations</h3>
                  <p className="category-card-tagline">{cat.tagline}</p>
                  <p className="category-card-desc">{cat.description}</p>

                  <div className="category-card-action">
                    <button
                      type="button"
                      className="btn btn-outline btn-sm category-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(cat.name);
                      }}
                      id={`explore-cat-${cat.id}`}
                    >
                      <span>Browse {cat.name} Packages</span>
                      <span className="arrow-icon">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The CelebrationCraft Experience - Why Us */}
      <section className="experience-section">
        <div className="container">
          <div className="glass-card experience-banner">
            <div className="experience-content">
              <span className="badge badge-rose">Flawless Delivery</span>
              <h2 className="font-display experience-title">
                Have a Unique Vision in Mind? <br />
                <span className="text-gradient-gold">Add Your Own Custom Celebration Theme</span>
              </h2>
              <p className="experience-desc">
                From milestone wedding anniversaries to graduation galas and housewarmings, CelebrationCraft lets you dynamically introduce custom milestone packages with live state management.
              </p>
              <div className="experience-actions">
                <Link to="/create" className="btn btn-primary" id="home-create-theme-cta">
                  <span>✨ Design Custom Theme</span>
                </Link>
                <Link to="/events" className="btn btn-outline" id="home-catalog-cta">
                  <span>Browse Full Catalog</span>
                </Link>
              </div>
            </div>

            <div className="experience-features-list">
              <div className="exp-feature-box">
                <div className="exp-icon">🎨</div>
                <div className="exp-details">
                  <h4>100% Tailored Themes</h4>
                  <p>Custom backdrop builds, flower arrangements, and color stories crafted to your preference.</p>
                </div>
              </div>
              <div className="exp-feature-box">
                <div className="exp-icon">💎</div>
                <div className="exp-details">
                  <h4>Transparent Pricing</h4>
                  <p>Upfront base quotes with no hidden charges or surprise surcharges.</p>
                </div>
              </div>
              <div className="exp-feature-box">
                <div className="exp-icon">🥂</div>
                <div className="exp-details">
                  <h4>Day-Of Event Lead</h4>
                  <p>Dedicated supervisor on-site from venue setup until final teardown.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

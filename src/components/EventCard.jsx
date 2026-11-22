import React from 'react';
import './EventCard.css';

/**
 * EventCard Component
 * Renders an individual event package card using props.
 * @param {Object} props
 * @param {Object} props.event - The event data object
 * @param {Function} props.onBookNow - Callback when "Book Now" button is clicked
 */
export default function EventCard({ event, onBookNow }) {
  if (!event) return null;

  const {
    id,
    title,
    category,
    price,
    guestCapacity,
    rating = 4.9,
    reviewsCount = 100,
    badge,
    tagline,
    description,
    features = [],
    image,
    themeColor
  } = event;

  const getCategoryBadgeClass = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'birthday':
        return 'badge-gold';
      case 'haldi':
        return 'badge-gold';
      case 'marriage':
        return 'badge-rose';
      case 'baby shower':
        return 'badge-purple';
      default:
        return 'badge-emerald';
    }
  };

  return (
    <div className="event-card glass-card" id={`event-card-${id}`}>
      {/* Card Image Banner */}
      <div className="event-card-media">
        <img
          src={image}
          alt={title}
          className="event-card-img"
          loading="lazy"
        />
        <div className="media-overlay"></div>
        
        {/* Category & Badge Top Row */}
        <div className="media-badges">
          <span className={`badge ${getCategoryBadgeClass(category)}`}>
            {category}
          </span>
          {badge && (
            <span className="badge badge-gold" style={{ borderColor: themeColor }}>
              ⭐ {badge}
            </span>
          )}
        </div>

        {/* Guest capacity pill */}
        <div className="media-bottom-info">
          <span className="guest-pill">
            👥 {guestCapacity || 'Custom Capacity'}
          </span>
          <span className="rating-pill">
            ★ {rating} <small>({reviewsCount})</small>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="event-card-body">
        <h3 className="event-card-title">{title}</h3>
        {tagline && <p className="event-card-tagline">{tagline}</p>}
        <p className="event-card-desc">{description}</p>

        {/* Feature Highlights */}
        {features && features.length > 0 && (
          <ul className="event-features-list">
            {features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="feature-item">
                <span className="feature-check">✓</span>
                <span>{feat}</span>
              </li>
            ))}
            {features.length > 3 && (
              <li className="feature-more">+{features.length - 3} more bespoke perks</li>
            )}
          </ul>
        )}
      </div>

      {/* Card Footer: Pricing and Book Now */}
      <div className="event-card-footer">
        <div className="price-container">
          <span className="price-label">Starting Base Price</span>
          <div className="price-value">
            <span className="currency">₹</span>
            <span className="amount">{Number(price).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button
          type="button"
          id={`book-btn-${id}`}
          className="btn btn-primary btn-sm book-now-btn"
          onClick={() => onBookNow(event)}
        >
          <span>Book Now</span>
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

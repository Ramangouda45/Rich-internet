import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import './EventCatalogPage.css';

export default function EventCatalogPage({ events = [], onSelectForBooking }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Sync category filter from URL query params (e.g. /events?category=Haldi)
  useEffect(() => {
    const categoryQuery = searchParams.get('category');
    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    }
  }, [searchParams]);

  // Extract dynamic categories from live events list
  const availableCategories = useMemo(() => {
    const categoriesSet = new Set(events.map((e) => e.category));
    return ['All', ...Array.from(categoriesSet)];
  }, [events]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        // Category check
        const matchesCategory =
          selectedCategory === 'All' ||
          event.category.toLowerCase() === selectedCategory.toLowerCase();

        // Search text check
        const searchLower = searchTerm.trim().toLowerCase();
        if (!searchLower) return matchesCategory;

        const matchesTitle = event.title.toLowerCase().includes(searchLower);
        const matchesCat = event.category.toLowerCase().includes(searchLower);
        const matchesDesc = event.description.toLowerCase().includes(searchLower);
        const matchesFeature = event.features?.some((f) =>
          f.toLowerCase().includes(searchLower)
        );

        return matchesCategory && (matchesTitle || matchesCat || matchesDesc || matchesFeature);
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured / default order
      });
  }, [events, selectedCategory, searchTerm, sortBy]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('featured');
    setSearchParams({});
  };

  const handleBookNow = (event) => {
    if (onSelectForBooking) {
      onSelectForBooking(event);
    }
    navigate(`/book?eventId=${event.id}&type=${encodeURIComponent(event.category)}`);
  };

  return (
    <div className="catalog-page">
      {/* Catalog Header */}
      <section className="catalog-header-section">
        <div className="container">
          <div className="catalog-header-content">
            <span className="badge badge-gold">✨ Celebration Packages</span>
            <h1 className="font-display catalog-page-title">
              Explore Our <span className="text-gradient-gold">Milestone Collections</span>
            </h1>
            <p className="catalog-page-subtitle">
              Browse transparent packages crafted for Birthdays, Haldi rituals, Grand Weddings, and Baby Showers. Select any package to reserve your date with our dedicated coordinators.
            </p>
          </div>

          {/* Search Bar & Controls Bar */}
          <div className="catalog-controls glass-card">
            {/* Search Bar */}
            <div className="search-bar-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                id="events-search-input"
                className="search-input"
                placeholder="Search by event name, category (e.g. Haldi, Birthday), or feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear Search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrapper">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                className="form-select sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Packages</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated (★ 5.0)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="category-chips-row">
            <div className="chips-scroll">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  id={`filter-chip-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`category-chip ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat === 'All' ? '🎉 All Celebrations' : cat}
                  <span className="chip-count">
                    {cat === 'All'
                      ? events.length
                      : events.filter((e) => e.category.toLowerCase() === cat.toLowerCase()).length}
                  </span>
                </button>
              ))}
            </div>

            <Link to="/create" className="btn btn-outline btn-sm custom-theme-btn">
              <span>+ Add Custom Theme</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="catalog-grid-section">
        <div className="container">
          {/* Results Summary */}
          <div className="results-summary-row">
            <p className="results-count">
              Showing <strong>{filteredEvents.length}</strong> of {events.length} milestone packages
              {selectedCategory !== 'All' && <span> in <em>{selectedCategory}</em></span>}
              {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
            </p>

            {(selectedCategory !== 'All' || searchTerm || sortBy !== 'featured') && (
              <button
                type="button"
                className="reset-filters-link"
                onClick={handleClearFilters}
              >
                Reset all filters ✕
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="catalog-empty-state glass-card">
              <span className="empty-icon">✨</span>
              <h3 className="empty-title">No celebration packages found</h3>
              <p className="empty-desc">
                We couldn't find any packages matching "<strong>{searchTerm || selectedCategory}</strong>".
                Try adjusting your search criteria or create a brand new custom theme to add to our live catalog!
              </p>
              <div className="empty-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClearFilters}
                >
                  Show All Packages
                </button>
                <Link to="/create" className="btn btn-outline">
                  Create Custom Theme
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

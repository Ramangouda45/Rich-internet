import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './BookingFormPage.css';

export default function BookingFormPage({ events = [], preselectedEvent = null }) {
  const [searchParams] = useSearchParams();

  // Initial event detection from query params or prop
  const paramEventId = searchParams.get('eventId');
  const paramType = searchParams.get('type');

  const initialEvent = useMemo(() => {
    if (preselectedEvent) return preselectedEvent;
    if (paramEventId) {
      return events.find((e) => e.id === paramEventId) || null;
    }
    if (paramType) {
      return events.find((e) => e.category.toLowerCase() === paramType.toLowerCase()) || null;
    }
    return events[0] || null;
  }, [events, paramEventId, paramType, preselectedEvent]);

  // Form State using useState
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guestCount: 50,
    celebrationType: initialEvent ? initialEvent.title : (events[0]?.title || ''),
    specialRequests: '',
  });

  // Selected Add-ons State
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Form Errors State using useState
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Sync when initialEvent loads
  useEffect(() => {
    if (initialEvent) {
      setFormData((prev) => ({
        ...prev,
        celebrationType: initialEvent.title
      }));
    }
  }, [initialEvent]);

  // Available addons
  const availableAddons = [
    { id: 'photo', name: 'Candid Photography & Cinematic Video', price: 25000, icon: '📸' },
    { id: 'cake', name: 'Artisanal 3-Tier Cake & Dessert Bar', price: 8500, icon: '🎂' },
    { id: 'music', name: 'Live Acoustic Ensemble / Punjabi Dhol', price: 15000, icon: '🥁' },
    { id: 'fog', name: 'Dry-Ice Cloud Fog & Cold Sparkulars', price: 7500, icon: '✨' },
  ];

  // Currently selected event object from celebrationType
  const currentSelectedEvent = useMemo(() => {
    return events.find((e) => e.title === formData.celebrationType) || events[0] || null;
  }, [events, formData.celebrationType]);

  // Calculation for total estimate
  const estimatedCost = useMemo(() => {
    const base = currentSelectedEvent ? Number(currentSelectedEvent.price) : 35000;
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const found = availableAddons.find((a) => a.id === addonId);
      return sum + (found ? found.price : 0);
    }, 0);
    // Slight hospitality buffer for large guest counts above 50
    const extraGuests = Math.max(0, Number(formData.guestCount || 0) - 50);
    const guestBuffer = extraGuests * 350;
    return base + addonsTotal + guestBuffer;
  }, [currentSelectedEvent, selectedAddons, formData.guestCount]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field once user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Toggle addons
  const handleToggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Form Validation using useState
  const validateForm = () => {
    const newErrors = {};

    // 1. Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    // 2. Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    // 3. Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact phone number is required.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    // 4. Date validation
    if (!formData.date) {
      newErrors.date = 'Event date is required.';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate <= today) {
        newErrors.date = 'Please pick a future celebration date.';
      }
    }

    // 5. Guest Count validation
    if (!formData.guestCount) {
      newErrors.guestCount = 'Guest count is required.';
    } else if (Number(formData.guestCount) < 5) {
      newErrors.guestCount = 'Guest count must be at least 5 guests.';
    } else if (Number(formData.guestCount) > 3000) {
      newErrors.guestCount = 'Please contact our VIP team for events over 3,000 guests.';
    }

    // 6. Celebration Type validation
    if (!formData.celebrationType) {
      newErrors.celebrationType = 'Please choose a celebration type.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const randomBookingId = `CC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const bookingRecord = {
        id: randomBookingId,
        ...formData,
        addons: selectedAddons.map((id) => availableAddons.find((a) => a.id === id)?.name),
        totalEstimate: estimatedCost,
        packageName: currentSelectedEvent?.title || formData.celebrationType,
        category: currentSelectedEvent?.category || 'Celebration',
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      };

      setConfirmedBooking(bookingRecord);
      setIsSubmitted(true);
    }
  };

  const handleBookAnother = () => {
    setIsSubmitted(false);
    setConfirmedBooking(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      guestCount: 50,
      celebrationType: events[0]?.title || '',
      specialRequests: '',
    });
    setSelectedAddons([]);
    setErrors({});
  };

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrowString = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  return (
    <div className="booking-page">
      <div className="container">
        {/* Header */}
        <div className="booking-header text-center">
          <span className="badge badge-gold">Reserve Your Date</span>
          <h1 className="font-display booking-title">
            Book Your <span className="text-gradient-gold">Milestone Celebration</span>
          </h1>
          <p className="booking-subtitle">
            Fill out the details below to lock in your preferred date and design team. We offer guaranteed date protection, dedicated concierge support, and flexible planning.
          </p>
        </div>

        {/* Two-Column Booking Layout */}
        <div className="booking-layout-grid">
          {/* Left: Interactive Validated Form */}
          <div className="booking-form-wrapper glass-card">
            <div className="form-card-header">
              <h2 className="form-heading">Celebration Booking Details</h2>
              <p className="form-subheading">Fields marked with <span className="text-rose">*</span> are required for booking confirmation.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate id="celebration-booking-form">
              {/* Celebration Type / Package */}
              <div className="form-group">
                <label htmlFor="celebrationType" className="form-label">
                  <span>Selected Celebration Package <span className="text-rose">*</span></span>
                  {currentSelectedEvent && (
                    <span className="badge badge-gold badge-sm">
                      Base: ₹{Number(currentSelectedEvent.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </label>
                <select
                  id="celebrationType"
                  name="celebrationType"
                  className={`form-select ${errors.celebrationType ? 'input-error' : ''}`}
                  value={formData.celebrationType}
                  onChange={handleChange}
                >
                  <option value="">-- Choose Celebration Package --</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.title}>
                      [{event.category}] {event.title} - ₹{Number(event.price).toLocaleString('en-IN')}
                    </option>
                  ))}
                </select>
                {errors.celebrationType && (
                  <p className="error-message">⚠️ {errors.celebrationType}</p>
                )}
              </div>

              {/* User Name */}
              <div className="form-group">
                <label htmlFor="userName" className="form-label">
                  Your Full Name <span className="text-rose">*</span>
                </label>
                <input
                  type="text"
                  id="userName"
                  name="name"
                  placeholder="e.g. Eleanor Vance or Rajesh Sharma"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="error-message">⚠️ {errors.name}</p>}
              </div>

              {/* Email and Phone Grid */}
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="userEmail" className="form-label">
                    Email Address <span className="text-rose">*</span>
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    name="email"
                    placeholder="name@example.com"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="error-message">⚠️ {errors.email}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="userPhone" className="form-label">
                    Phone Number <span className="text-rose">*</span>
                  </label>
                  <input
                    type="tel"
                    id="userPhone"
                    name="phone"
                    placeholder="e.g. +1 (555) 019-2834"
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className="error-message">⚠️ {errors.phone}</p>}
                </div>
              </div>

              {/* Event Date and Guest Count Grid */}
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="eventDate" className="form-label">
                    Celebration Date <span className="text-rose">*</span>
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="date"
                    min={tomorrowString}
                    className={`form-input ${errors.date ? 'input-error' : ''}`}
                    value={formData.date}
                    onChange={handleChange}
                  />
                  {errors.date && <p className="error-message">⚠️ {errors.date}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="guestCount" className="form-label">
                    Estimated Guest Count <span className="text-rose">*</span>
                  </label>
                  <div className="stepper-input-wrapper">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          guestCount: Math.max(10, Number(prev.guestCount || 0) - 10)
                        }))
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      min="5"
                      max="3000"
                      className={`form-input stepper-input ${errors.guestCount ? 'input-error' : ''}`}
                      value={formData.guestCount}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          guestCount: Number(prev.guestCount || 0) + 10
                        }))
                      }
                    >
                      +
                    </button>
                  </div>
                  {errors.guestCount && <p className="error-message">⚠️ {errors.guestCount}</p>}
                </div>
              </div>

              {/* Optional Add-on Experiences */}
              <div className="form-group">
                <label className="form-label">Optional Bespoke Add-ons</label>
                <div className="addons-grid">
                  {availableAddons.map((addon) => (
                    <div
                      key={addon.id}
                      className={`addon-chip ${selectedAddons.includes(addon.id) ? 'selected' : ''}`}
                      onClick={() => handleToggleAddon(addon.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => {}}
                        className="addon-checkbox"
                        aria-label={addon.name}
                      />
                      <span className="addon-icon">{addon.icon}</span>
                      <div className="addon-details">
                        <span className="addon-title">{addon.name}</span>
                        <span className="addon-price">+₹{addon.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div className="form-group">
                <label htmlFor="specialRequests" className="form-label">
                  Special Custom Requests or Venue Details (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows="3"
                  placeholder="Share color preferences, venue address, timing restrictions, or dietary needs..."
                  className="form-textarea"
                  value={formData.specialRequests}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-booking-btn"
                className="btn btn-primary btn-lg submit-booking-btn"
              >
                <span>Confirm & Reserve Booking</span>
                <span>✨</span>
              </button>
            </form>
          </div>

          {/* Right: Live Quote Summary & Concierge Guarantee */}
          <div className="booking-summary-wrapper">
            <div className="glass-card summary-card">
              <div className="summary-header">
                <span className="badge badge-gold">Live Package Quote</span>
                <h3 className="summary-title">Reservation Summary</h3>
              </div>

              {currentSelectedEvent && (
                <div className="summary-event-preview">
                  <img
                    src={currentSelectedEvent.image}
                    alt={currentSelectedEvent.title}
                    className="summary-event-img"
                  />
                  <div className="summary-event-meta">
                    <span className="summary-category">{currentSelectedEvent.category}</span>
                    <h4 className="summary-event-title">{currentSelectedEvent.title}</h4>
                    <span className="summary-capacity">👥 {currentSelectedEvent.guestCapacity}</span>
                  </div>
                </div>
              )}

              <div className="summary-breakdown">
                <div className="breakdown-row">
                  <span>Base Package Fee:</span>
                  <strong>₹{currentSelectedEvent ? Number(currentSelectedEvent.price).toLocaleString('en-IN') : 0}</strong>
                </div>

                <div className="breakdown-row">
                  <span>Guest Hospitality Buffer ({formData.guestCount} guests):</span>
                  <span>
                    {formData.guestCount > 50
                      ? `+₹${((formData.guestCount - 50) * 350).toLocaleString('en-IN')}`
                      : 'Included'}
                  </span>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="breakdown-row">
                    <span>Selected Add-ons ({selectedAddons.length}):</span>
                    <span>
                      +₹
                      {selectedAddons.reduce((sum, id) => {
                        const a = availableAddons.find((item) => item.id === id);
                        return sum + (a ? a.price : 0);
                      }, 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="breakdown-divider"></div>

                <div className="breakdown-total">
                  <div>
                    <span className="total-label">Estimated Investment</span>
                    <small>All taxes & stage styling included</small>
                  </div>
                  <span className="total-amount">₹{estimatedCost.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="summary-trust-bullets">
                <div className="trust-bullet">
                  <span>🛡️</span>
                  <p><strong>Free Date Rescheduling</strong> up to 14 days prior.</p>
                </div>
                <div className="trust-bullet">
                  <span>🎨</span>
                  <p><strong>Complimentary 3D Mood Board</strong> sent within 24 hours.</p>
                </div>
                <div className="trust-bullet">
                  <span>🥂</span>
                  <p><strong>Dedicated On-Site Lead</strong> on event day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Success Modal */}
      {isSubmitted && confirmedBooking && (
        <div className="booking-modal-overlay" role="dialog" aria-modal="true">
          <div className="booking-modal glass-card animate-glow">
            <div className="modal-confetti">🎉</div>
            <span className="badge badge-emerald">Booking Confirmed!</span>

            <h2 className="font-display modal-title">
              Congratulations, {confirmedBooking.name}!
            </h2>
            <p className="modal-subtitle">
              Your celebration request has been successfully registered in our system.
            </p>

            <div className="booking-receipt-box">
              <div className="receipt-header">
                <span className="receipt-id">Booking ID: <strong>{confirmedBooking.id}</strong></span>
                <span className="receipt-date">{confirmedBooking.submittedAt}</span>
              </div>

              <div className="receipt-grid">
                <div className="receipt-item">
                  <span className="receipt-label">Celebration Type</span>
                  <strong className="receipt-val">{confirmedBooking.packageName}</strong>
                </div>

                <div className="receipt-item">
                  <span className="receipt-label">Scheduled Date</span>
                  <strong className="receipt-val text-gold">{confirmedBooking.date}</strong>
                </div>

                <div className="receipt-item">
                  <span className="receipt-label">Guests Count</span>
                  <strong className="receipt-val">{confirmedBooking.guestCount} Guests</strong>
                </div>

                <div className="receipt-item">
                  <span className="receipt-label">Contact</span>
                  <strong className="receipt-val">{confirmedBooking.email}</strong>
                </div>
              </div>

              {confirmedBooking.addons && confirmedBooking.addons.length > 0 && (
                <div className="receipt-addons">
                  <span className="receipt-label">Included Add-ons:</span>
                  <div className="receipt-addon-tags">
                    {confirmedBooking.addons.map((addon, i) => (
                      <span key={i} className="addon-tag-pill">✓ {addon}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="receipt-total-row">
                <span>Total Estimated Quote:</span>
                <span className="receipt-price">₹{confirmedBooking.totalEstimate.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="modal-next-steps">
              <h4>What happens next?</h4>
              <p>Our senior celebration designer will call your phone number ({confirmedBooking.phone}) within 2 hours to confirm details and coordinate styling mockups.</p>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleBookAnother}
                id="book-another-btn"
              >
                Plan Another Event
              </button>
              <Link to="/events" className="btn btn-outline" id="view-catalog-after-book">
                Explore More Packages
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

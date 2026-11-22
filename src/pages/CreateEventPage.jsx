import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import birthdayImg from '../assets/events/birthday.jpg';
import haldiImg from '../assets/events/haldi.jpg';
import marriageImg from '../assets/events/marriage.jpg';
import babyshowerImg from '../assets/events/babyshower.jpg';
import './CreateEventPage.css';

export default function CreateEventPage({ onAddEvent }) {
  const navigate = useNavigate();

  // Image options for easy visual styling
  const imageThemes = [
    { label: 'Haldi Aura', img: haldiImg, defaultColor: '#F59E0B' },
    { label: 'Royal Wedding', img: marriageImg, defaultColor: '#E11D48' },
    { label: 'Birthday Glow', img: birthdayImg, defaultColor: '#EAB308' },
    { label: 'Pastel Baby Shower', img: babyshowerImg, defaultColor: '#8B5CF6' },
  ];

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Birthday',
    customCategory: '',
    price: '',
    guestCapacity: '50 - 100 Guests',
    badge: 'New Theme',
    tagline: '',
    description: '',
    featuresText: 'Custom Theme Backdrop, Mood Uplighting, Dedicated Stage Coordinator, Sound System',
    selectedImageIndex: 0,
    customImageUrl: '',
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [createdEventId, setCreatedEventId] = useState(null);

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Resolve active category
  const resolvedCategory =
    formData.category === 'Custom'
      ? formData.customCategory.trim() || 'Custom Milestone'
      : formData.category;

  // Resolve active image
  const resolvedImage =
    formData.customImageUrl.trim() ||
    imageThemes[formData.selectedImageIndex]?.img ||
    birthdayImg;

  // Resolve features array
  const resolvedFeatures = formData.featuresText
    ? formData.featuresText
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f.length > 0)
    : [];

  // Live preview event object
  const previewEvent = {
    id: 'preview-sample',
    title: formData.title.trim() || 'Your Bespoke Celebration Theme',
    category: resolvedCategory,
    price: Number(formData.price) || 45000,
    guestCapacity: formData.guestCapacity || '50 - 100 Guests',
    rating: 5.0,
    reviewsCount: 1,
    badge: formData.badge || 'New Theme',
    tagline: formData.tagline || 'Crafted with Artistry & Elegance',
    description:
      formData.description.trim() ||
      'Describe the unique decor, floral ambiance, lighting concept, and guest experience of this celebration package...',
    features: resolvedFeatures.length > 0 ? resolvedFeatures : ['Custom Floral Backdrop', 'Mood Lighting', 'Event Host'],
    image: resolvedImage,
    themeColor: imageThemes[formData.selectedImageIndex]?.defaultColor || '#F59E0B',
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event theme name is required.';
    } else if (formData.title.trim().length < 4) {
      newErrors.title = 'Theme title must be at least 4 characters.';
    }

    if (formData.category === 'Custom' && !formData.customCategory.trim()) {
      newErrors.customCategory = 'Please specify your custom category name.';
    }

    if (!formData.price) {
      newErrors.price = 'Base package price is required.';
    } else if (Number(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than zero.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a short description for the theme.';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Description should be at least 15 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newEventId = `custom-evt-${Date.now()}`;
      const newEvent = {
        id: newEventId,
        title: formData.title.trim(),
        category: resolvedCategory,
        price: Number(formData.price),
        guestCapacity: formData.guestCapacity.trim() || '50 - 100 Guests',
        rating: 5.0,
        reviewsCount: 1,
        badge: formData.badge.trim() || 'New Theme',
        tagline: formData.tagline.trim() || 'Custom Celebration Package',
        description: formData.description.trim(),
        features: resolvedFeatures,
        image: resolvedImage,
        themeColor: imageThemes[formData.selectedImageIndex]?.defaultColor || '#F59E0B',
      };

      // Add to live state list
      if (onAddEvent) {
        onAddEvent(newEvent);
      }

      setCreatedEventId(newEventId);
      setShowSuccessNotification(true);

      // Reset form fields
      setFormData({
        title: '',
        category: 'Birthday',
        customCategory: '',
        price: '',
        guestCapacity: '50 - 100 Guests',
        badge: 'New Theme',
        tagline: '',
        description: '',
        featuresText: 'Custom Theme Backdrop, Mood Uplighting, Dedicated Stage Coordinator, Sound System',
        selectedImageIndex: 0,
        customImageUrl: '',
      });
    }
  };

  return (
    <div className="create-event-page">
      <div className="container">
        {/* Header */}
        <div className="create-header text-center">
          <span className="badge badge-gold">Dynamic State Management</span>
          <h1 className="font-display create-title">
            Design & Add a <span className="text-gradient-gold">Custom Celebration Theme</span>
          </h1>
          <p className="create-subtitle">
            Need an anniversary soiree, traditional Sangeet, or corporate gala? Define your package details below to instantly inject it into CelebrationCraft’s live application state!
          </p>
        </div>

        {/* Success Alert Banner */}
        {showSuccessNotification && (
          <div className="success-banner glass-card animate-glow">
            <div className="success-banner-content">
              <span className="success-badge">🎉 Success!</span>
              <div>
                <h4>Your New Celebration Theme is Live!</h4>
                <p>The package has been added to React's live state list and is immediately viewable in the Event Catalog.</p>
              </div>
            </div>
            <div className="success-banner-actions">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/events')}
                id="view-in-catalog-btn"
              >
                View in Event Catalog →
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setShowSuccessNotification(false)}
              >
                Create Another
              </button>
            </div>
          </div>
        )}

        {/* Two-Column Form & Real-time Live Preview Grid */}
        <div className="create-layout-grid">
          {/* Left Form */}
          <div className="create-form-wrapper glass-card">
            <div className="form-card-header">
              <h2 className="form-heading">Package Specification</h2>
              <p className="form-subheading">Update any field to see the live preview card update simultaneously.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate id="create-event-form">
              {/* Package Title */}
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Package Name / Milestone Theme <span className="text-rose">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g. Silver Jubilee Candlelight Ball"
                  className={`form-input ${errors.title ? 'input-error' : ''}`}
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <p className="error-message">⚠️ {errors.title}</p>}
              </div>

              {/* Category & Custom Category */}
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="category" className="form-label">
                    Milestone Category <span className="text-rose">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Birthday">Birthday</option>
                    <option value="Haldi">Haldi Ceremony</option>
                    <option value="Marriage">Marriage / Wedding</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Custom">+ Custom Category...</option>
                  </select>
                </div>

                {formData.category === 'Custom' ? (
                  <div className="form-group">
                    <label htmlFor="customCategory" className="form-label">
                      Custom Category Name <span className="text-rose">*</span>
                    </label>
                    <input
                      type="text"
                      id="customCategory"
                      name="customCategory"
                      placeholder="e.g. Anniversary or Sangeet"
                      className={`form-input ${errors.customCategory ? 'input-error' : ''}`}
                      value={formData.customCategory}
                      onChange={handleChange}
                    />
                    {errors.customCategory && (
                      <p className="error-message">⚠️ {errors.customCategory}</p>
                    )}
                  </div>
                ) : (
                  <div className="form-group">
                    <label htmlFor="badge" className="form-label">
                      Promotional Badge
                    </label>
                    <input
                      type="text"
                      id="badge"
                      name="badge"
                      placeholder="e.g. New Theme, Artisanal, VIP"
                      className="form-input"
                      value={formData.badge}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>

              {/* Base Price & Guest Capacity */}
              <div className="form-row-two">
                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    Base Package Price (₹ INR) <span className="text-rose">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="1000"
                    placeholder="e.g. 50000"
                    className={`form-input ${errors.price ? 'input-error' : ''}`}
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && <p className="error-message">⚠️ {errors.price}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="guestCapacity" className="form-label">
                    Estimated Guest Capacity
                  </label>
                  <input
                    type="text"
                    id="guestCapacity"
                    name="guestCapacity"
                    placeholder="e.g. 50 - 150 Guests"
                    className="form-input"
                    value={formData.guestCapacity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="form-group">
                <label htmlFor="tagline" className="form-label">
                  Catchy Theme Tagline
                </label>
                <input
                  type="text"
                  id="tagline"
                  name="tagline"
                  placeholder="e.g. Golden Elegance Under A Starlit Chandelier"
                  className="form-input"
                  value={formData.tagline}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Package Description <span className="text-rose">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Detail the floral palette, atmosphere, setup, and key experience..."
                  className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                {errors.description && <p className="error-message">⚠️ {errors.description}</p>}
              </div>

              {/* Features Inclusions */}
              <div className="form-group">
                <label htmlFor="featuresText" className="form-label">
                  Key Features & Inclusions (Comma-separated)
                </label>
                <input
                  type="text"
                  id="featuresText"
                  name="featuresText"
                  placeholder="Custom Arch, DJ Console, Crystal Lighting, Photo Booth"
                  className="form-input"
                  value={formData.featuresText}
                  onChange={handleChange}
                />
                <span className="form-hint">Separate each highlight with a comma.</span>
              </div>

              {/* Visual Aesthetic / Theme Image */}
              <div className="form-group">
                <label className="form-label">Select Visual Aesthetic Template</label>
                <div className="theme-images-selector">
                  {imageThemes.map((theme, index) => (
                    <div
                      key={theme.label}
                      className={`theme-img-card ${formData.selectedImageIndex === index && !formData.customImageUrl ? 'selected' : ''}`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedImageIndex: index,
                          customImageUrl: ''
                        }))
                      }
                    >
                      <img src={theme.img} alt={theme.label} />
                      <span className="theme-label">{theme.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional Custom Image URL */}
              <div className="form-group">
                <label htmlFor="customImageUrl" className="form-label">
                  Or Paste External Image URL (Optional)
                </label>
                <input
                  type="url"
                  id="customImageUrl"
                  name="customImageUrl"
                  placeholder="https://images.unsplash.com/..."
                  className="form-input"
                  value={formData.customImageUrl}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="add-custom-event-btn"
                className="btn btn-primary btn-lg submit-create-btn"
              >
                <span>+ Add Package to Live Catalog</span>
              </button>
            </form>
          </div>

          {/* Right Live Card Preview */}
          <div className="create-preview-wrapper">
            <div className="preview-sticky-box">
              <div className="preview-badge-header">
                <span className="badge badge-gold">⚡ Live Preview</span>
                <span className="preview-hint">Updates automatically</span>
              </div>

              <div className="preview-card-container">
                <EventCard
                  event={previewEvent}
                  onBookNow={() => {
                    alert('This is a preview card. Submit the form to add and book this theme!');
                  }}
                />
              </div>

              <div className="glass-card preview-tip-card">
                <h4>💡 Tip for Event Designers</h4>
                <p>
                  Once added, this package is stored in CelebrationCraft’s central React state. Users can filter by it, search for it, and book it in real time!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

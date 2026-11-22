import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventCatalogPage from './pages/EventCatalogPage';
import BookingFormPage from './pages/BookingFormPage';
import CreateEventPage from './pages/CreateEventPage';
import { initialEvents } from './data/initialEvents';
import './App.css';

function App() {
  // Live State List of Celebration Packages
  const [events, setEvents] = useState(initialEvents);

  // Selected event for booking
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null);

  // Handler to add a new custom event theme to live state
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  // Handler when user clicks "Book Now" on any card
  const handleSelectForBooking = (event) => {
    setSelectedEventForBooking(event);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar eventsCount={events.length} />

        {/* Main Routed Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/events"
              element={
                <EventCatalogPage
                  events={events}
                  onSelectForBooking={handleSelectForBooking}
                />
              }
            />
            <Route
              path="/book"
              element={
                <BookingFormPage
                  events={events}
                  preselectedEvent={selectedEventForBooking}
                />
              }
            />
            <Route
              path="/create"
              element={<CreateEventPage onAddEvent={handleAddEvent} />}
            />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

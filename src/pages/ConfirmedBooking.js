import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

/**
 * ConfirmedBooking component - Displays booking confirmation details
 * Shows reservation summary after successful form submission
 */
function ConfirmedBooking() {
  const location = useLocation();
  const bookingData = location.state;

  // Redirect to booking page if no booking data exists
  if (!bookingData) {
    return <Navigate to="/booking" replace />;
  }

  /**
   * Formats date string for display
   * @param {string} dateStr - Date string in YYYY-MM-DD format
   * @returns {string} - Formatted date string
   */
  const formatDate = (dateStr) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  /**
   * Formats occasion string for display
   * @param {string} occasion - Occasion value
   * @returns {string} - Formatted occasion string
   */
  const formatOccasion = (occasion) => {
    const occasions = {
      birthday: 'Birthday',
      anniversary: 'Anniversary',
      engagement: 'Engagement',
      business: 'Business',
      other: 'Other'
    };
    return occasions[occasion] || occasion;
  };

  return (
    <section className="confirmation-page" aria-labelledby="confirmation-title">
      <div className="container">
        <div className="confirmation-content">
          {/* Success Icon */}
          <div className="confirmation-icon" aria-hidden="true">
            ✓
          </div>
          
          <h1 id="confirmation-title">Booking Confirmed!</h1>
          <p>
            Thank you for your reservation, {bookingData.name}! 
            We're looking forward to serving you.
          </p>

          {/* Booking Details */}
          <div className="confirmation-details" role="region" aria-label="Booking details">
            <h3>Reservation Details</h3>
            
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span>{formatDate(bookingData.date)}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Time:</span>
              <span>{bookingData.time}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Party Size:</span>
              <span>{bookingData.guests} {bookingData.guests === 1 ? 'guest' : 'guests'}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Occasion:</span>
              <span>{formatOccasion(bookingData.occasion)}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span>{bookingData.email}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span>{bookingData.phone}</span>
            </div>

            {bookingData.specialRequests && (
              <div className="detail-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <span className="detail-label">Special Requests:</span>
                <span style={{ marginTop: '0.5rem' }}>{bookingData.specialRequests}</span>
              </div>
            )}
          </div>

          {/* Confirmation Message */}
          <p style={{ marginBottom: '1.5rem' }}>
            A confirmation email has been sent to <strong>{bookingData.email}</strong>.
            <br />
            If you need to make any changes, please call us at <strong>(312) 555-1234</strong>.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              Return to Home
            </Link>
            <Link to="/booking" className="btn btn-secondary">
              Make Another Reservation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmedBooking;

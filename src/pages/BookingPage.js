import React from 'react';
import BookingForm from '../components/BookingForm';

/**
 * BookingPage component - Table reservation page
 * Contains the booking form with available times and submission handling
 * 
 * @param {Object} props - Component props
 * @param {Array<string>} props.availableTimes - Available booking times
 * @param {function} props.dispatch - Dispatch function to update times
 * @param {function} props.submitForm - Form submission handler
 */
function BookingPage({ availableTimes, dispatch, submitForm }) {
  return (
    <section className="booking-page" aria-labelledby="booking-title">
      <div className="container">
        <h1 id="booking-title">Table Reservations</h1>
        <p className="text-center mb-2" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          Book your table at Little Lemon and enjoy an unforgettable Mediterranean 
          dining experience. We recommend booking at least 24 hours in advance.
        </p>
        <BookingForm 
          availableTimes={availableTimes}
          dispatch={dispatch}
          submitForm={submitForm}
        />
      </div>
    </section>
  );
}

export default BookingPage;

import React, { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmedBooking from './pages/ConfirmedBooking';
import AboutPage from './pages/AboutPage';
import MenuPage from './pages/MenuPage';
import { fetchAPI, submitAPI } from './utils/api';
import './App.css';

/**
 * Updates available times based on the selected date
 * @param {Array} state - Current available times
 * @param {Object} action - Action with type and payload
 * @returns {Array} - Updated available times
 */
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return fetchAPI(new Date(action.payload));
    default:
      return state;
  }
};

/**
 * Initializes available times for today's date
 * @returns {Array} - Available times for today
 */
export const initializeTimes = () => {
  return fetchAPI(new Date());
};

/**
 * Main App component with routing and state management
 */
function App() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  /**
   * Handles form submission for booking
   * @param {Object} formData - Booking form data
   * @returns {boolean} - Success status
   */
  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      navigate('/confirmed', { state: formData });
    }
    return success;
  };

  return (
    <div className="app">
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/booking" 
            element={
              <BookingPage 
                availableTimes={availableTimes} 
                dispatch={dispatch}
                submitForm={submitForm}
              />
            } 
          />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

/**
 * BookingForm component for table reservations
 * Includes comprehensive form validation and accessibility features
 * 
 * @param {Object} props - Component props
 * @param {Array<string>} props.availableTimes - Available time slots
 * @param {function} props.dispatch - Dispatch function to update available times
 * @param {function} props.submitForm - Function to submit the form
 */
function BookingForm({ availableTimes, dispatch, submitForm }) {
  // Form state
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    occasion: '',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // Validation errors state
  const [errors, setErrors] = useState({});
  
  // Touch state for showing errors only after field interaction
  const [touched, setTouched] = useState({});
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Get today's date in YYYY-MM-DD format for min date validation
   */
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  /**
   * Validates email format using regex
   * @param {string} email - Email address to validate
   * @returns {boolean} - True if email is valid
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validates phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} - True if phone is valid
   */
  const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(phone);
  };

  /**
   * Validates a single form field
   * @param {string} name - Field name
   * @param {string|number} value - Field value
   * @returns {string} - Error message or empty string
   */
  const validateField = (name, value) => {
    switch (name) {
      case 'date':
        if (!value) return 'Date is required';
        if (new Date(value) < new Date(getTodayDate())) {
          return 'Date must be today or in the future';
        }
        return '';
        
      case 'time':
        if (!value) return 'Time is required';
        return '';
        
      case 'guests':
        if (!value) return 'Number of guests is required';
        if (value < 1) return 'At least 1 guest is required';
        if (value > 10) return 'Maximum 10 guests allowed';
        return '';
        
      case 'occasion':
        if (!value) return 'Please select an occasion';
        return '';
        
      case 'name':
        if (!value) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
        
      case 'email':
        if (!value) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return '';
        
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!isValidPhone(value)) return 'Please enter a valid phone number';
        return '';
        
      default:
        return '';
    }
  };

  /**
   * Validates entire form
   * @returns {Object} - Object containing all validation errors
   */
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'specialRequests') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    return newErrors;
  };

  /**
   * Checks if form is valid (no errors and all required fields filled)
   * @returns {boolean} - True if form is valid
   */
  const isFormValid = () => {
    const requiredFields = ['date', 'time', 'guests', 'occasion', 'name', 'email', 'phone'];
    return requiredFields.every((field) => {
      const error = validateField(field, formData[field]);
      return !error;
    });
  };

  /**
   * Handles input changes and validates the field
   * @param {Event} e - Change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Update available times when date changes
    if (name === 'date' && value) {
      dispatch({ type: 'UPDATE_TIMES', payload: value });
      // Reset time selection when date changes
      setFormData((prev) => ({ ...prev, time: '' }));
    }

    // Validate field on change if it's been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error
      }));
    }
  };

  /**
   * Handles input blur - marks field as touched and validates
   * @param {Event} e - Blur event
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  /**
   * Handles form submission
   * @param {Event} e - Submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const formErrors = validateForm();
    setErrors(formErrors);

    // If no errors, submit form
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      const success = submitForm(formData);
      if (!success) {
        setIsSubmitting(false);
        setErrors({ submit: 'Failed to submit reservation. Please try again.' });
      }
    }
  };

  return (
    <form 
      className="booking-form" 
      onSubmit={handleSubmit}
      aria-label="Table reservation form"
      noValidate
    >
      <h2 id="form-title">Reserve a Table</h2>
      
      {/* General form error */}
      {errors.submit && (
        <div className="error-message" role="alert" aria-live="polite">
          {errors.submit}
        </div>
      )}

      {/* Date and Time Row */}
      <div className="form-row">
        {/* Date Field */}
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className={`form-input ${errors.date && touched.date ? 'error' : ''}`}
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            min={getTodayDate()}
            required
            aria-required="true"
            aria-invalid={errors.date && touched.date ? 'true' : 'false'}
            aria-describedby={errors.date && touched.date ? 'date-error' : undefined}
          />
          {errors.date && touched.date && (
            <span id="date-error" className="error-message" role="alert">
              {errors.date}
            </span>
          )}
        </div>

        {/* Time Field */}
        <div className="form-group">
          <label htmlFor="time" className="form-label">
            Time <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="time"
            name="time"
            className={`form-select ${errors.time && touched.time ? 'error' : ''}`}
            value={formData.time}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!formData.date}
            required
            aria-required="true"
            aria-invalid={errors.time && touched.time ? 'true' : 'false'}
            aria-describedby={errors.time && touched.time ? 'time-error' : undefined}
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {!formData.date && (
            <span className="error-message" style={{ color: '#666' }}>
              Please select a date first
            </span>
          )}
          {errors.time && touched.time && (
            <span id="time-error" className="error-message" role="alert">
              {errors.time}
            </span>
          )}
        </div>
      </div>

      {/* Guests and Occasion Row */}
      <div className="form-row">
        {/* Number of Guests */}
        <div className="form-group">
          <label htmlFor="guests" className="form-label">
            Number of Guests <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            className={`form-input ${errors.guests && touched.guests ? 'error' : ''}`}
            value={formData.guests}
            onChange={handleChange}
            onBlur={handleBlur}
            min="1"
            max="10"
            required
            aria-required="true"
            aria-invalid={errors.guests && touched.guests ? 'true' : 'false'}
            aria-describedby={errors.guests && touched.guests ? 'guests-error' : undefined}
          />
          {errors.guests && touched.guests && (
            <span id="guests-error" className="error-message" role="alert">
              {errors.guests}
            </span>
          )}
        </div>

        {/* Occasion */}
        <div className="form-group">
          <label htmlFor="occasion" className="form-label">
            Occasion <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <select
            id="occasion"
            name="occasion"
            className={`form-select ${errors.occasion && touched.occasion ? 'error' : ''}`}
            value={formData.occasion}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={errors.occasion && touched.occasion ? 'true' : 'false'}
            aria-describedby={errors.occasion && touched.occasion ? 'occasion-error' : undefined}
          >
            <option value="">Select an occasion</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="engagement">Engagement</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
          {errors.occasion && touched.occasion && (
            <span id="occasion-error" className="error-message" role="alert">
              {errors.occasion}
            </span>
          )}
        </div>
      </div>

      {/* Contact Information Section */}
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend className="sr-only">Contact Information</legend>

        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="John Doe"
            required
            aria-required="true"
            aria-invalid={errors.name && touched.name ? 'true' : 'false'}
            aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
            autoComplete="name"
          />
          {errors.name && touched.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email and Phone Row */}
        <div className="form-row">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
              required
              aria-required="true"
              aria-invalid={errors.email && touched.email ? 'true' : 'false'}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            {errors.email && touched.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone <span aria-hidden="true">*</span>
              <span className="sr-only">(required)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(312) 555-1234"
              required
              aria-required="true"
              aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
              aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
              autoComplete="tel"
            />
            {errors.phone && touched.phone && (
              <span id="phone-error" className="error-message" role="alert">
                {errors.phone}
              </span>
            )}
          </div>
        </div>
      </fieldset>

      {/* Special Requests (Optional) */}
      <div className="form-group">
        <label htmlFor="specialRequests" className="form-label">
          Special Requests <span style={{ fontWeight: 'normal' }}>(optional)</span>
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          className="form-textarea"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any dietary restrictions, accessibility needs, or special requests..."
          rows="4"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary form-submit"
        disabled={isSubmitting || !isFormValid()}
        aria-disabled={isSubmitting || !isFormValid()}
      >
        {isSubmitting ? 'Submitting...' : 'Make Your Reservation'}
      </button>
    </form>
  );
}

export default BookingForm;

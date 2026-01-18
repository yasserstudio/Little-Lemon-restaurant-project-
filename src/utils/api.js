/**
 * API utility functions for Little Lemon Restaurant
 * These functions simulate API calls for the booking system
 */

/**
 * Generates a seeded random number based on a date
 * Used for consistent availability generation
 * @param {Date} date - The date to seed the random number
 * @returns {function} - Random number generator function
 */
const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

/**
 * Fetches available booking times for a given date
 * Returns an array of available time slots
 * @param {Date} date - The date to check availability
 * @returns {Array<string>} - Array of available time slots (e.g., ["17:00", "18:00"])
 */
export const fetchAPI = function (date) {
  let result = [];
  let random = seededRandom(date.getDate());

  // Generate random available times between 17:00 and 23:00
  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ':00');
    }
    if (random() < 0.5) {
      result.push(i + ':30');
    }
  }
  
  // Ensure at least some times are available
  if (result.length === 0) {
    result = ['17:00', '18:00', '19:00', '20:00', '21:00'];
  }
  
  return result;
};

/**
 * Submits booking form data to the server
 * @param {Object} formData - The booking form data
 * @param {string} formData.date - Reservation date
 * @param {string} formData.time - Reservation time
 * @param {number} formData.guests - Number of guests
 * @param {string} formData.occasion - Special occasion type
 * @param {string} formData.name - Customer name
 * @param {string} formData.email - Customer email
 * @param {string} formData.phone - Customer phone
 * @returns {boolean} - True if submission was successful
 */
export const submitAPI = function (formData) {
  // Validate required fields
  if (!formData.date || !formData.time || !formData.guests || !formData.name || !formData.email) {
    console.error('Missing required booking information');
    return false;
  }
  
  // Simulate successful API call
  console.log('Booking submitted:', formData);
  return true;
};

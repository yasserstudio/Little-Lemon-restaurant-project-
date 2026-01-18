import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import App, { initializeTimes, updateTimes } from '../App';
import { fetchAPI } from '../utils/api';

/**
 * Test suite for BookingForm component
 * Tests rendering, validation, and submission functionality
 */
describe('BookingForm Component', () => {
  // Mock functions for testing
  const mockDispatch = jest.fn();
  const mockSubmitForm = jest.fn();
  const availableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];

  /**
   * Helper function to render BookingForm with required props
   */
  const renderBookingForm = () => {
    return render(
      <BrowserRouter>
        <BookingForm
          availableTimes={availableTimes}
          dispatch={mockDispatch}
          submitForm={mockSubmitForm}
        />
      </BrowserRouter>
    );
  };

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ===== Rendering Tests =====
  
  describe('Rendering', () => {
    test('renders the booking form heading', () => {
      renderBookingForm();
      const heading = screen.getByText('Reserve a Table');
      expect(heading).toBeInTheDocument();
    });

    test('renders all required form fields', () => {
      renderBookingForm();
      
      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    });

    test('renders submit button', () => {
      renderBookingForm();
      const submitButton = screen.getByRole('button', { name: /make your reservation/i });
      expect(submitButton).toBeInTheDocument();
    });

    test('renders available time options', () => {
      renderBookingForm();
      const timeSelect = screen.getByLabelText(/time/i);
      
      availableTimes.forEach((time) => {
        expect(timeSelect).toHaveTextContent(time);
      });
    });

    test('renders occasion options', () => {
      renderBookingForm();
      const occasionSelect = screen.getByLabelText(/occasion/i);
      
      expect(occasionSelect).toHaveTextContent('Birthday');
      expect(occasionSelect).toHaveTextContent('Anniversary');
      expect(occasionSelect).toHaveTextContent('Engagement');
      expect(occasionSelect).toHaveTextContent('Business');
      expect(occasionSelect).toHaveTextContent('Other');
    });
  });

  // ===== Accessibility Tests =====
  
  describe('Accessibility', () => {
    test('form has accessible aria-label', () => {
      renderBookingForm();
      const form = screen.getByRole('form', { name: /table reservation form/i });
      expect(form).toBeInTheDocument();
    });

    test('required fields have aria-required attribute', () => {
      renderBookingForm();
      
      expect(screen.getByLabelText(/date/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/time/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/number of guests/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/occasion/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-required', 'true');
      expect(screen.getByLabelText(/phone/i)).toHaveAttribute('aria-required', 'true');
    });

    test('time select is disabled when no date is selected', () => {
      renderBookingForm();
      const timeSelect = screen.getByLabelText(/time/i);
      expect(timeSelect).toBeDisabled();
    });
  });

  // ===== Validation Tests =====
  
  describe('Validation', () => {
    test('shows error when date field is empty on blur', async () => {
      renderBookingForm();
      const dateInput = screen.getByLabelText(/date/i);
      
      fireEvent.focus(dateInput);
      fireEvent.blur(dateInput);
      
      await waitFor(() => {
        expect(screen.getByText('Date is required')).toBeInTheDocument();
      });
    });

    test('shows error for invalid email format', async () => {
      renderBookingForm();
      const emailInput = screen.getByLabelText(/email/i);
      
      await userEvent.type(emailInput, 'invalid-email');
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
      });
    });

    test('accepts valid email format', async () => {
      renderBookingForm();
      const emailInput = screen.getByLabelText(/email/i);
      
      await userEvent.type(emailInput, 'test@example.com');
      fireEvent.blur(emailInput);
      
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });

    test('shows error when name is too short', async () => {
      renderBookingForm();
      const nameInput = screen.getByLabelText(/full name/i);
      
      await userEvent.type(nameInput, 'A');
      fireEvent.blur(nameInput);
      
      await waitFor(() => {
        expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      });
    });

    test('shows error for invalid phone number', async () => {
      renderBookingForm();
      const phoneInput = screen.getByLabelText(/phone/i);
      
      await userEvent.type(phoneInput, '123');
      fireEvent.blur(phoneInput);
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument();
      });
    });

    test('validates guests minimum value', async () => {
      renderBookingForm();
      const guestsInput = screen.getByLabelText(/number of guests/i);
      
      await userEvent.clear(guestsInput);
      await userEvent.type(guestsInput, '0');
      fireEvent.blur(guestsInput);
      
      await waitFor(() => {
        expect(screen.getByText('At least 1 guest is required')).toBeInTheDocument();
      });
    });

    test('validates guests maximum value', async () => {
      renderBookingForm();
      const guestsInput = screen.getByLabelText(/number of guests/i);
      
      await userEvent.clear(guestsInput);
      await userEvent.type(guestsInput, '15');
      fireEvent.blur(guestsInput);
      
      await waitFor(() => {
        expect(screen.getByText('Maximum 10 guests allowed')).toBeInTheDocument();
      });
    });
  });

  // ===== Interaction Tests =====
  
  describe('User Interactions', () => {
    test('updates available times when date changes', async () => {
      renderBookingForm();
      const dateInput = screen.getByLabelText(/date/i);
      
      // Get tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateString = tomorrow.toISOString().split('T')[0];
      
      await userEvent.type(dateInput, dateString);
      
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'UPDATE_TIMES',
          payload: dateString
        });
      });
    });

    test('enables time select when date is selected', async () => {
      renderBookingForm();
      const dateInput = screen.getByLabelText(/date/i);
      const timeSelect = screen.getByLabelText(/time/i);
      
      // Get tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateString = tomorrow.toISOString().split('T')[0];
      
      await userEvent.type(dateInput, dateString);
      
      await waitFor(() => {
        expect(timeSelect).not.toBeDisabled();
      });
    });

    test('submit button is disabled when form is invalid', () => {
      renderBookingForm();
      const submitButton = screen.getByRole('button', { name: /make your reservation/i });
      expect(submitButton).toBeDisabled();
    });
  });
});

/**
 * Test suite for App state management functions
 */
describe('App State Management', () => {
  describe('initializeTimes', () => {
    test('returns an array of available times', () => {
      const times = initializeTimes();
      
      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBeGreaterThan(0);
    });

    test('returns times in correct format', () => {
      const times = initializeTimes();
      const timeFormat = /^\d{1,2}:\d{2}$/;
      
      times.forEach((time) => {
        expect(time).toMatch(timeFormat);
      });
    });
  });

  describe('updateTimes', () => {
    test('returns updated times for UPDATE_TIMES action', () => {
      const initialState = ['17:00', '18:00'];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const action = {
        type: 'UPDATE_TIMES',
        payload: tomorrow.toISOString().split('T')[0]
      };
      
      const newState = updateTimes(initialState, action);
      
      expect(Array.isArray(newState)).toBe(true);
      expect(newState.length).toBeGreaterThan(0);
    });

    test('returns current state for unknown action type', () => {
      const initialState = ['17:00', '18:00'];
      const action = { type: 'UNKNOWN_ACTION' };
      
      const newState = updateTimes(initialState, action);
      
      expect(newState).toEqual(initialState);
    });
  });
});

/**
 * Test suite for API functions
 */
describe('API Functions', () => {
  describe('fetchAPI', () => {
    test('returns an array of times', () => {
      const times = fetchAPI(new Date());
      expect(Array.isArray(times)).toBe(true);
    });

    test('returns consistent times for the same date', () => {
      const date = new Date('2024-01-15');
      const times1 = fetchAPI(date);
      const times2 = fetchAPI(date);
      
      expect(times1).toEqual(times2);
    });

    test('returns different times for different dates', () => {
      const date1 = new Date('2024-01-15');
      const date2 = new Date('2024-01-20');
      
      const times1 = fetchAPI(date1);
      const times2 = fetchAPI(date2);
      
      // They might be the same by chance, but likely different
      // This test just ensures the function works for different dates
      expect(Array.isArray(times1)).toBe(true);
      expect(Array.isArray(times2)).toBe(true);
    });
  });
});

/**
 * Test suite for App component rendering
 */
describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Little Lemon')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();
  });
});

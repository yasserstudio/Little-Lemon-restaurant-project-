# Little Lemon Restaurant - Table Booking Application

## Project Overview

This is the capstone project for the Meta Front-End Developer Professional Certificate. The application is a table reservation system for the Little Lemon restaurant, built with React.

## Features

- **Home Page**: Landing page with restaurant information, highlights, and testimonials
- **About Page**: Information about the restaurant's history and mission
- **Booking Page**: Functional table reservation form with validation
- **Confirmation Page**: Booking confirmation with reservation details

## Technical Features

- ✅ React 18 with functional components and hooks
- ✅ React Router for navigation
- ✅ Form validation with error handling
- ✅ Unit tests with Jest and React Testing Library
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ WCAG 2.1 accessibility compliance
- ✅ Semantic HTML5 elements
- ✅ CSS custom properties for theming

## Project Structure

```
little-lemon/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.js
│   │   ├── Nav.js
│   │   ├── Footer.js
│   │   ├── BookingForm.js
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── HomePage.js
│   │   ├── BookingPage.js
│   │   ├── ConfirmedBooking.js
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   └── useSubmit.js
│   ├── utils/               # Utility functions
│   │   └── api.js
│   ├── __tests__/           # Unit tests
│   │   └── BookingForm.test.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd little-lemon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Booking Form Validation

The booking form includes the following validations:

| Field | Validation Rules |
|-------|------------------|
| Date | Required, must be today or future date |
| Time | Required, must select from available slots |
| Guests | Required, minimum 1, maximum 10 |
| Occasion | Required |
| Name | Required, minimum 2 characters |
| Email | Required, valid email format |
| Phone | Required, valid phone format |

## Accessibility Features

- Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`)
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Focus management
- Color contrast compliance (WCAG AA)
- Screen reader friendly form labels and error messages
- Alt text for all images

## Testing

The project includes unit tests for:

- BookingForm component rendering
- Form validation logic
- Form submission functionality
- Available times initialization and updates
- Navigation functionality

Run tests with:
```bash
npm test
```

## Technologies Used

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **CSS3** - Styling with custom properties

## Design Resources

- Color Palette:
  - Primary Green: #495E57
  - Primary Yellow: #F4CE14
  - Secondary Orange: #EE9972
  - Secondary Peach: #FBDABB
  - Highlight Light: #EDEFEE
  - Highlight Dark: #333333

- Typography:
  - Headings: Markazi Text
  - Body: Karla

## Author

This project was created as part of the Meta Front-End Developer Professional Certificate on Coursera.

## License

This project is for educational purposes only.

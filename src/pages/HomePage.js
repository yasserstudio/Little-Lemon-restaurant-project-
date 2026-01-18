import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HomePage component - Landing page for Little Lemon Restaurant
 * Contains hero section, specials, testimonials, and about preview
 */
function HomePage() {
  // Featured menu items data
  const specials = [
    {
      id: 1,
      title: 'Greek Salad',
      price: '$12.99',
      description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Bruschetta',
      price: '$7.99',
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Lemon Dessert',
      price: '$6.99',
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop'
    }
  ];

  // Customer testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      text: 'Amazing food and great atmosphere! The Greek salad is the best I\'ve ever had.',
      avatar: 'https://i.pravatar.cc/100?img=1'
    },
    {
      id: 2,
      name: 'James K.',
      rating: 5,
      text: 'Perfect for date night. The service was impeccable and the food was delicious.',
      avatar: 'https://i.pravatar.cc/100?img=2'
    },
    {
      id: 3,
      name: 'Emily R.',
      rating: 5,
      text: 'The lemon dessert is to die for! I keep coming back just for that.',
      avatar: 'https://i.pravatar.cc/100?img=3'
    },
    {
      id: 4,
      name: 'Michael T.',
      rating: 4,
      text: 'Great Mediterranean cuisine with a modern twist. Highly recommend!',
      avatar: 'https://i.pravatar.cc/100?img=4'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <h1 id="hero-title">Little Lemon</h1>
            <p className="hero-subtitle">Chicago</p>
            <p className="hero-description">
              We are a family owned Mediterranean restaurant, focused on traditional 
              recipes served with a modern twist.
            </p>
            <Link to="/booking" className="btn btn-primary">
              Reserve a Table
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
            alt="Interior of Little Lemon restaurant showing elegant dining area"
            className="hero-image"
          />
        </div>
      </section>

      {/* Specials Section */}
      <section className="specials" aria-labelledby="specials-title">
        <div className="container">
          <div className="specials-header">
            <h2 id="specials-title">This Week's Specials!</h2>
            <Link to="/menu" className="btn btn-primary">
              Online Menu
            </Link>
          </div>
          <div className="specials-grid">
            {specials.map((item) => (
              <article key={item.id} className="card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-image"
                />
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{item.title}</h3>
                    <span className="card-price">{item.price}</span>
                  </div>
                  <p className="card-description">{item.description}</p>
                  <Link to="/menu" className="card-link">
                    Order a delivery →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" aria-labelledby="testimonials-title">
        <div className="container">
          <h2 id="testimonials-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="testimonial-card">
                <div className="testimonial-rating" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                  {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                </div>
                <img
                  src={testimonial.avatar}
                  alt=""
                  className="testimonial-avatar"
                  aria-hidden="true"
                />
                <p className="testimonial-name">{testimonial.name}</p>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" aria-labelledby="about-title">
        <div className="container">
          <div className="about-content">
            <h2 id="about-title">Little Lemon</h2>
            <p className="about-subtitle">Chicago</p>
            <p>
              Little Lemon opened in 1995 by two Italian brothers, Mario and Adrian, 
              who moved to the United States to pursue their shared dream of owning a restaurant.
            </p>
            <p>
              To this day, Little Lemon is owned by the two brothers and continues 
              to serve delicious Mediterranean-inspired dishes with a focus on 
              traditional recipes served with a modern twist.
            </p>
          </div>
          <div className="about-images">
            <img
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&h=300&fit=crop"
              alt="Chef preparing food in the kitchen"
            />
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
              alt="Beautifully plated dish"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;

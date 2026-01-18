import React from 'react';

/**
 * AboutPage component - Restaurant history and information
 */
function AboutPage() {
  return (
    <section className="about" style={{ minHeight: '80vh', paddingTop: '3rem' }} aria-labelledby="about-page-title">
      <div className="container">
        <div className="about-content">
          <h1 id="about-page-title" style={{ color: '#F4CE14' }}>About Little Lemon</h1>
          <p className="about-subtitle">Our Story</p>
          <p>
            Little Lemon opened in 1995 by two Italian brothers, Mario and Adrian, 
            who moved to the United States to pursue their shared dream of owning a restaurant.
          </p>
          <p>
            Growing up in a small village on the coast of Italy, the brothers learned 
            the art of Mediterranean cooking from their grandmother. Her recipes, 
            passed down through generations, form the heart of our menu today.
          </p>
          <p>
            To this day, Little Lemon is owned by the two brothers and continues 
            to serve delicious Mediterranean-inspired dishes with a focus on 
            traditional recipes served with a modern twist.
          </p>
          <h3 style={{ marginTop: '2rem', color: '#495E57' }}>Our Philosophy</h3>
          <p>
            At Little Lemon, we believe that great food brings people together. 
            Every dish is prepared with love, using only the freshest ingredients 
            sourced from local farmers and suppliers.
          </p>
          <p>
            We're committed to sustainability and reducing our environmental impact, 
            from composting food waste to using eco-friendly packaging for takeout orders.
          </p>
        </div>
        <div className="about-images">
          <img
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&h=300&fit=crop"
            alt="Chef Mario preparing food in the kitchen"
          />
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop"
            alt="Fresh Mediterranean ingredients"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutPage;

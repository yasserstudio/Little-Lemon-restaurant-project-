import React from 'react';

/**
 * MenuPage component - Restaurant menu display
 */
function MenuPage() {
  const menuCategories = [
    {
      name: 'Starters',
      items: [
        { name: 'Greek Salad', price: '$12.99', description: 'Crispy lettuce, peppers, olives, and feta cheese' },
        { name: 'Bruschetta', price: '$7.99', description: 'Grilled bread with garlic, olive oil, and tomatoes' },
        { name: 'Hummus', price: '$6.99', description: 'Creamy chickpea dip with olive oil and pita' },
      ]
    },
    {
      name: 'Main Courses',
      items: [
        { name: 'Grilled Fish', price: '$24.99', description: 'Fresh catch of the day with Mediterranean herbs' },
        { name: 'Lamb Kebabs', price: '$22.99', description: 'Tender lamb with grilled vegetables' },
        { name: 'Pasta Primavera', price: '$18.99', description: 'Fresh pasta with seasonal vegetables' },
      ]
    },
    {
      name: 'Desserts',
      items: [
        { name: 'Lemon Dessert', price: '$6.99', description: "Grandma's secret recipe lemon cake" },
        { name: 'Baklava', price: '$5.99', description: 'Layered pastry with honey and nuts' },
        { name: 'Tiramisu', price: '$7.99', description: 'Classic Italian coffee dessert' },
      ]
    }
  ];

  return (
    <section className="specials" style={{ minHeight: '80vh' }} aria-labelledby="menu-title">
      <div className="container">
        <h1 id="menu-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Menu</h1>
        
        {menuCategories.map((category) => (
          <div key={category.name} style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#495E57', marginBottom: '1.5rem' }}>{category.name}</h2>
            <div className="specials-grid">
              {category.items.map((item) => (
                <article key={item.name} className="card">
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="card-title">{item.name}</h3>
                      <span className="card-price">{item.price}</span>
                    </div>
                    <p className="card-description">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MenuPage;

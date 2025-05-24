# 🛒 Furniture Shopping App (React + Vite)

A modern, minimal React application for browsing and shopping furniture, built with Vite for fast development and optimized builds.

## 🔍 Overview

This project is a single-page application (SPA) for furniture shopping. Users can browse products, add items to a cart, and enjoy a responsive, user-friendly interface. The app is built with React and Vite, making it easy to extend and customize.

## ✨ Features

- **React + Vite**: Fast development with hot module replacement
- **Component-Based UI**: Reusable and modular React components
- **Product Catalog**: Browse furniture items with images and details
- **Shopping Cart**: Add, remove, and update items in the cart
- **Routing**: Seamless navigation with React Router
- **State Management**: Context API for global state
- **Responsive Design**: Works on desktop and mobile
- **ESLint & Prettier**: Code quality and formatting

## 📋 Requirements

- Node.js 18+
- npm or yarn

## 💾 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arabeen100/furniture-shopping.git
   cd furniture-shopping
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open https://furniture-shopping-nu.vercel.app/ in your browser.

## 📁 Project Structure

```
fur/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components (Home, Products, Cart, etc.)
│   ├── data/                # Static or mock data (products, etc.)
│   ├── context/             # Context providers for state management
│   ├── styles/              # CSS/SCSS files
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── router.jsx           # App routing
├── .eslintrc.cjs            # ESLint config
├── .prettierrc              # Prettier config
├── index.html               # Main HTML file
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## 🔰 Basic Usage

### 🛣️ Adding a Route

Define routes in `src/router.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
```

### 🎮 Creating a Component

```jsx
// src/components/ProductCard.jsx
import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
```

### 📊 Using Context for Cart

```jsx
// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Add, remove, update cart logic...

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
```

### 👁️ Creating a Page

```jsx
// src/pages/Products.jsx
import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function Products() {
  return (
    <div className="products-page">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
```

## 📝 Form Handling

Example checkout form using controlled components:

```jsx
import React, { useState } from 'react';

function CheckoutForm() {
  const [form, setForm] = useState({ name: '', address: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Validate and process order...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
      <button type="submit">Place Order</button>
    </form>
  );
}

export default CheckoutForm;
```

## 🛠️ Helper Functions

Common helpers can be placed in `src/utils/`:

```js
// src/utils/formatPrice.js
export function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}
```

## 🗃️ Data & API

Use `src/data/products.js` for mock data or connect to a real API:

```js
export const products = [
  { id: 1, title: 'Sofa', price: 499, image: '/sofa.jpg' },
  // ...
];
```

## 📜 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 👩‍💻 Author

**Your Name**  
Mahmoud Samy Arabeen

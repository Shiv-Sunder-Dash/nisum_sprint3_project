import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/cart.css';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalItems: 0 });

  useEffect(() => {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(() => setCart({ items: [], totalItems: 0 }));
  }, []);

  const updateQuantity = (productId, size, quantity) => {
    fetch('/api/cart/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, size, quantity })
    })
      .then(res => res.json())
      .then(data => setCart(data));
  };

  const removeItem = (productId, size) => {
    fetch('/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, size })
    })
      .then(res => res.json())
      .then(data => setCart(data));
  };

  if (!cart.items.length) {
    return (
      <div className="container">
        <header className="cart-header">
          <h1 className="page-title">Shopping Cart</h1>
          <nav>
            <Link to="/browse" className="nav-btn">Continue Shopping</Link>
          </nav>
        </header>
        <main className="cart-main">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some amazing products to your cart!</p>
            <Link to="/browse" className="continue-shopping-btn">Start Shopping</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="cart-header">
        <h1 className="page-title">Shopping Cart</h1>
        <nav>
          <Link to="/browse" className="nav-btn">Continue Shopping</Link>
        </nav>
      </header>
      <main className="cart-main">
        <div className="cart-content">
          <div className="cart-items-section">
            <h2>Cart Items ({cart.totalItems})</h2>
            {cart.items.map(item => (
              <div className="cart-item" key={item.productId + '-' + item.size}>
                <div className="item-image">
                  <img src={item.imageUrl} alt={item.productName} onError={e => e.target.src = '/images/placeholder.jpg'} />
                </div>
                <div className="item-details">
                  <h3>{item.productName}</h3>
                  <p className="item-size">Size: {item.size}</p>
                  <div className="item-pricing">
                    <span className="item-price">₹{item.price.toFixed(2)}</span>
                    <span className="item-original-price">₹{item.originalPrice.toFixed(2)}</span>
                    <span className="item-discount">({item.discount}% OFF)</span>
                  </div>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}>+</button>
                </div>
                <button className="remove-item-btn" onClick={() => removeItem(item.productId, item.size)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;

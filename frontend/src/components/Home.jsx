import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div>
      <nav className="main-navigation">
        <div className="nav-container">
          <div className="brand-logo">
            <h2><i className="fas fa-gem"></i> FashionHub</h2>
          </div>
          <div className="nav-links">
            <Link to="/browse" className="nav-link">
              <i className="fas fa-shopping-bag"></i> Browse Products
            </Link>
            <Link to="/login" className="nav-link">
              <i className="fas fa-user"></i> Login
            </Link>
            <Link to="/register" className="nav-link">
              <i className="fas fa-user-plus"></i> Register
            </Link>
            <Link to="/cart" className="cart-link">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">0</span>
            </Link>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Welcome to <span className="brand-highlight">FashionHub</span></h1>
            <p className="hero-subtitle">Discover the latest trends in fashion. From casual wear to elegant outfits, find your perfect style with our curated collection of premium clothing.</p>
            <div className="hero-buttons">
              <Link to="/browse" className="btn-primary">
                <i className="fas fa-shopping-bag"></i> Start Shopping
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div style={{width: '100%', height: 400, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'}}>
              <div style={{textAlign: 'center', color: 'white'}}>
                <i className="fas fa-tshirt" style={{fontSize: '4rem', marginBottom: '1rem', opacity: 0.9}}></i>
                <h3 style={{fontSize: '1.5rem', fontWeight: 600}}>Premium Fashion</h3>
                <p style={{opacity: 0.9}}>Up to 50% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {products.map(product => (
              <div className="product-card" key={product.productId}>
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.productName} onError={e => e.target.src = '/images/placeholder.jpg'} />
                  <div className="product-overlay">
                    <Link to={`/products/detail/${product.productId}`} className="quick-view">
                      <i className="fas fa-eye"></i> Quick View
                    </Link>
                  </div>
                  <span className="discount-tag">{product.discount}% OFF</span>
                </div>
                <div className="product-info">
                  <h3>{product.productName}</h3>
                  <div className="product-price">
                    <span className="current-price">₹{product.price}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                  </div>
                  {product.category && (
                    <span className="product-category">{product.category.categoryName}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-container">
            <Link to="/browse" className="view-all-btn">
              View All Products <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

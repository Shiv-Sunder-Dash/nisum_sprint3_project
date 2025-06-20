import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import '../css/product.css';

const Browse = () => {
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
    // Fetch all products initially
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let url = `/api/products/search?`;
    const params = [];
    if (keyword) params.push(`query=${encodeURIComponent(keyword)}`);
    if (categoryId) params.push(`categoryId=${categoryId}`);
    url += params.join('&');
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]));
  };

  return (
    <div className="container">
      <header className="modern-header">
        <h1 className="brand-title">FashionHub - Search and Browse</h1>
        <div className="header-actions">
          <Link to="/cart" className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0</span>
          </Link>
        </div>
      </header>

      <section className="search-container">
        <form onSubmit={handleSearch} className="modern-search-form">
          <div className="search-group">
            <input
              type="text"
              name="keyword"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Search by Product Name"
              className="modern-search-input"
            />
            <select
              name="categoryId"
              className="modern-select"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <button type="submit" className="modern-search-btn">Search</button>
          </div>
        </form>
      </section>

      <section className="products-container">
        <div className="modern-products-grid">
          {products.map(product => (
            <div className="modern-product-card" key={product.productId}>
              <div className="product-image-container">
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="product-image"
                  onError={e => e.target.src = '/images/placeholder.jpg'}
                />
                <div className="discount-badge">{product.discount}% OFF</div>
              </div>
              <div className="product-info">
                <h3>{product.productName}</h3>
                <div className="product-price">
                  <span className="current-price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="product-discount">({product.discount}% OFF)</span>
                </div>
                <Link to={`/products/detail/${product.productId}`} className="quick-view">
                  <i className="fas fa-eye"></i> Quick View
                </Link>
              </div>
              {product.category && (
                <span className="product-category">{product.category.categoryName}</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Browse;

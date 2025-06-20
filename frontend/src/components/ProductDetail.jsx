import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/product.css';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(() => setProduct(null));
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setMessage('Please select a size.');
      return;
    }
    fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, size: selectedSize, quantity: 1 })
    })
      .then(res => res.json())
      .then(data => setMessage(data.message || 'Added to cart!'))
      .catch(() => setMessage('Error adding to cart.'));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <header className="product-header">
        <h1 className="product-main-title">{product.productName}</h1>
        <p className="brand-subtitle">by FashionHub</p>
      </header>
      <main className="product-detail-container">
        <div className="product-detail-layout">
          <div className="product-image-section">
            <div className="main-image-container">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="main-product-image"
                onError={e => e.target.src = '/images/placeholder.jpg'}
              />
            </div>
          </div>
          <div className="product-info-panel">
            <div className="price-container">
              <span className="current-price-large">₹{product.price}</span>
              <span className="original-price-large">₹{product.originalPrice}</span>
              <span className="discount-percentage">({product.discount}% OFF)</span>
            </div>
            <div className="offers-container">
              <h3 className="section-title">
                <i className="fas fa-gift"></i> Available Offers
              </h3>
              <div className="offer-item">
                <i className="fas fa-check-circle"></i>
                <span>20% off on orders above ₹1500</span>
              </div>
            </div>
            <div className="size-container">
              <h3 className="section-title">Size:</h3>
              <div className="size-options">
                {product.sizes && product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-button${selectedSize === size ? ' selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            {message && <div className="cart-message">{message}</div>}
            {product.category && (
              <div className="product-category">
                <strong>Category:</strong> {product.category.categoryName}
              </div>
            )}
          </div>
        </div>
      </main>
      <footer>
        <div className="container">
          <Link to="/browse">Back to Browse</Link>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;

import React, { useEffect, useState } from 'react';
import './product.css';
import { Box } from './utiles/Box.jsx';

const API_URL = 'https://fakestoreapi.com/products?limit=1';

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            fontSize: '24px',
            color: star <= rating ? 'gold' : 'gray',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}


function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleShowLogin = () => {
    window.location.href = '/login';
  };

  const handleShowSignup = () => {
    window.location.href = '/signup';
  };

  return (
    <>
      <header className="header-style">
        <input
          style={{ backgroundColor: '#fff', color: '#000', position: 'fixed', top: '17px', left: '10px' }}
          placeholder="Search"
        />
        <button
          onClick={handleShowLogin}
          className="button-style-hp"
          style={{ position: 'fixed', top: '17px', right: '10px' }}
        >
          Log In
        </button>
        <button
          onClick={handleShowSignup}
          className="button-style-hp"
          style={{ position: 'fixed', top: '17px', right: '100px' }}
        >
          Sign Up
        </button>
      </header>

      <br />

      {products.map((product) => (
        <div
          key={product.id}
          className="product-card">
          <img className="product-image"
            src={product.image} 
            alt={product.title} 
          />
          <div className="product-description">
            <h3>{product.title}</h3>
            <p style={{ fontSize: '22px' }}>
              <strong>Price:</strong> ${product.price}
            </p>
            <p style={{ fontSize: '20px' }}>
              <strong>Category:</strong> {product.category}
            </p>
            <p style={{ fontSize: '18px' }}>
              <strong>Description:</strong> {product.description}
            </p>
            <StarRating rating={product.rating?.rate || 0} />
          </div>
          <br />
          <button onClick={handleShowSignup} className="button-style-hp">
            Buy Now
          </button>
        </div>
      ))}
    </>
  );
}

export default ProductPage;
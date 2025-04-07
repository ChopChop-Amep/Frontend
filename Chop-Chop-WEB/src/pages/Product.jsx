import React, { useEffect, useState } from 'react';
import './Product.css';
import { HeaderMenu } from './components/HeaderMenu.jsx'

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

  const handleBuyNow = () => {
    alert('Product bought successfully!');
  }

  return (
    <>
      <HeaderMenu />

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
          <button onClick={handleBuyNow} className="button-style-hp">
            Buy Now
          </button>
        </div>
      ))}
    </>
  );
}

export default ProductPage;
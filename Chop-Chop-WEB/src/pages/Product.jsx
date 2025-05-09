import React, { useEffect, useState } from 'react';
import './Product.css';
import { HeaderMenu } from './components/HeaderMenu.jsx'
import { Box } from './utiles/Box.jsx'
import './components/BuyButton.css'

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
  const [similarProducts, setSimilarProducts] = useState([]);
  const [price , setPrice] = useState(0);

  const productId = new URLSearchParams(window.location.search).get("id");
  const API_URL = `https://fakestoreapi.com/products/${productId}`

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : [data]); // Asegúrate de que siempre sea un array
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [API_URL]);

  // fetch para los productos similares
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
      .then(response => response.json())
      .then(data => {
        const filteredProducts = data.filter(product => product.id !== parseInt(productId));
        setSimilarProducts(filteredProducts.slice(0, 5))
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [productId]);

  const handleBuyNow = (price) => {
    alert(`You have purchased this product for $${price.toFixed(2)}`);
  }

  useEffect(() => {
    if (products.length > 0) {
      setPrice(products[0].price);
    }
  }, [products]);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <HeaderMenu />

      <br />
      <br />

      {products.map((product) => (
        <div key={product.id} className="product-card" style={{ marginBottom: '20px' }} >
          <img
            className="product-image"
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
        </div>
      ))}
      <div data-tooltip={`Price: $${price}`} className="button" >
        <div className="button-wrapper" onClick={() => handleBuyNow(price)}>
            <div className="text" >Buy Now</div>
            <span className="icon">
                <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 6H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 15H4a.5.5 0 0 1-.491-.408L1.01 1.607 0 1.5zM3.14 6l1.25 6h8.22l1.25-6H3.14zM5 12a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
            </span>
        </div>
      </div>
      <br />
      {/* productos similares */}
      <h2 style={{ fontSize: '30px' }}>Other Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', justifyContent: 'center' }}>
        {similarProducts.map((product) => (
          <a href={`/product?id=${product.id}`} key={product.id}>
            <Box title={product.title} image={product.image} key={product.id} />
            <StarRating rating={product.rating?.rate || 0} />
          </a>
        ))}
      </div>
    </main>
  );
}

export default ProductPage
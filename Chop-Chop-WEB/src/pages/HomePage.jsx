import React from 'react'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { Box } from './utiles/Box.jsx'
import { HeaderMenu } from './components/HeaderMenu.jsx'

const API_URL = 'https://fakestoreapi.com/products?limit=10';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <>
      <HeaderMenu />
      
      <br />

      <main style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products && products.map((product) => (
          <a href="/product">
            <Box key={product.id} title={product.title} image={product.image} />
          </a>
        ))}
      </main>
    </>
  )
}

export default HomePage

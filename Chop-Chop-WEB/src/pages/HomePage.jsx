import React from 'react'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { Box } from './utiles/Box.jsx'
import { HeaderMenu } from './components/HeaderMenu.jsx'
import Characteristics from './components/Characteristics.jsx'

const API_URL = 'https://fakestoreapi.com/products?limit=15'

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
      <Characteristics /> 
      <br />
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', justifyContent: 'center', margin: '1rem auto', maxWidth: '1200px' }}>
        {products && products.map((product) => (
          <a href={`/product?id=${product.id}`} key={product.id}>
            <Box title={product.title} image={product.image} />
          </a>
        ))}
      </main>
    </>

  )
}

export default HomePage

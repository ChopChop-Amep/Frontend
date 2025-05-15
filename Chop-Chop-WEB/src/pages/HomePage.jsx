import React from 'react'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { Box } from './utiles/Box.jsx'
import { HeaderMenu } from './components/HeaderMenu.jsx'

const API_URL = 'http://127.0.0.1:8000/products?page=0&min_price=0'

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

  // example return products
  // id: "66b5bfb9-5dda-4705-b9c8-e52bcff22d4c"
  // image: "https://images.unsplash.com/photo-1705508216613-be1715a31212?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  // name: "Laptop Ultra Slim"
  // price: 799.99

  // Selecciona 5 productos aleatorios y sin repeticiones
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomProducts = getRandomProducts(products, 5);

  return (
    <>
      <HeaderMenu />
      <br />
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', justifyContent: 'center', margin: '1rem auto', maxWidth: '1200px' }}>
        {randomProducts.map((product) => (
          <a href={`/product?id=${product.id}`} key={product.id}>
            <Box title={product.name} image={product.image} />
          </a>
        ))}
      </main>
      <hr className='line' />
      {/* Productos mejor valorados */}
    </>
  )
}

export default HomePage

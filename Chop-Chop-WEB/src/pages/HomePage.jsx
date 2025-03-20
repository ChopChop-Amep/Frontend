import React from 'react'
import './HomePage.css'
import { useEffect, useState} from 'react'
import { Box } from './utiles/Box.jsx'

const API_URL = 'https://fakestoreapi.com/products?limit=10';

function HomePage() {

  const [products, setProducts] = useState();

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch((error) => {
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
      <header className='header-style'>
        <input style={{backgroundColor: '#fff', color: '#000', position: 'fixed', top: '17px', left: '10px' }} placeholder='Search'/>
        <button onClick={handleShowLogin} className='button-style-hp' style={{ position: 'fixed', top: '15px', right: '10px' }}>Log In</button>
        <button onClick={handleShowSignup} className='button-style-hp' style={{ position: 'fixed', top: '15px', right: '100px' }}>Sign Up</button>
      </header>

      <br />

      <main style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products && products.map((product) => (
          <Box key={product.id} title={product.title} image={product.image} style={{ flex: '1 0 14%' }} />
        ))}
      </main>
    </>
  )
}

export default HomePage

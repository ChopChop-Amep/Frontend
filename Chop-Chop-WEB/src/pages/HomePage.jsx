import React from 'react'
import './HomePage.css'
import { useEffect, useState, useRef} from 'react'
import { Box } from './utiles/Box.jsx'

const API_URL = 'https://fakestoreapi.com/products?limit=10';

function HomePage() {

  const [products, setProducts] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const DropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleShowLogin = () => {
    window.location.href = '/login';
  };

  const handleShowLogOut = () => {
    window.location.href = '/';
  };

  const handleShowSignup = () => {
    window.location.href = '/signup';
  };

  useEffect(() => {
    // Funció per tancar el desplegable si es fa clic fora
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    // Afegir l'escoltador d'esdeveniments al document
    document.addEventListener('click', handleClickOutside);

    // Netejar l'escoltador quan el component es desmunta
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
      <header className='header-style'>
        <input style={{backgroundColor: '#fff', color: '#000', position: 'fixed', top: '17px', left: '10px' }} placeholder='Search'/>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Imatge User"
          width="40"
          height="40"
          style={{
            cursor: 'pointer',
            borderRadius: '50%',
            position: 'fixed',
            top: '10px',
            right: '10px'
          }}
          onClick={(e) => {
            e.stopPropagation(); 
            DropDown();
          }}
        />

        {/* Mostra el desplegable només si `isDropdownOpen` és true */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef} // Referència per detectar clics fora
            style={{
              position: 'fixed',
              top: '55px',
              right: '10px',
              background: 'white',
              border: '1px solid black',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1000
            }}
          >
            <a href="/login" onClick={handleShowLogin} style={{ display: 'block', padding: '5px' }}>
              Log In
            </a>
            <br />
            <a href="/signup" onClick={handleShowSignup} style={{ display: 'block', padding: '5px' }}>
              Sign Up
            </a>
            <br />
            <a href="#" onClick={handleShowLogOut} style={{ display: 'block', padding: '5px' }}>
              Log Out
            </a>
          </div>
        )}
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

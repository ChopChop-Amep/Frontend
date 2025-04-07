import React from 'react'
import { useEffect, useState, useRef } from 'react'
import './HeaderMenu.css'

export function HeaderMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const dropdownRef = useRef(null);

  const DropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleShowLogin = () => {
    window.location.href = '/login';
  };

  const handleShowSignup = () => {
    window.location.href = '/signup';
  };

  const handleShowCreateProduct = () => {
    window.location.href = '/create-product';
  };

  const handleShowLogOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      alert('You have logged out successfully!');
      setIsLoggedIn(false); // Cambiar el estado a no logueado
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const query = event.target.value.trim();
      if (query) {
        window.location.href = `/search?query=${encodeURIComponent(query)}`;
      }
    }
  };

  return (
    <header className='header-style'>
      <input
        style={{ backgroundColor: '#fff', color: '#000', position: 'fixed', top: '17px', left: '10px' }}
        placeholder='Search'
        onKeyDown={handleSearch}
      />

      <img
        src='../../public/logo_processed.png'
        style={{
          maxWidth: '40px',
          cursor: 'pointer',
          borderRadius: '10%',
          position: 'fixed',
          top: '10px',
        }}
        onClick={() => {
          window.location.href = '/';
        }}
      />

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
          right: '10px',
        }}
        onClick={(e) => {
          e.stopPropagation();
          DropDown();
        }}
      />

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: '55px',
            right: '10px',
            background: 'white',
            border: '1px solid black',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          {!isLoggedIn ? (
            <>
              <a href="/login" onClick={handleShowLogin} style={{ color: '#000', display: 'block', padding: '5px' }}>
                Log In
              </a>
              <br />
              <a href="/signup" onClick={handleShowSignup} style={{ color: '#000', display: 'block', padding: '5px' }}>
                Sign Up
              </a>
              <br />
              <a href="/create-product" onClick={handleShowCreateProduct} style={{ color: '#000', display: 'block', padding: '5px' }}>
                Add Product
              </a>
              <br />
              <a href="/" onClick={handleShowLogOut} style={{ color: '#000', display: 'block', padding: '5px' }}>
                Log Out
              </a>
            </>
          ) : (
            <>
              <a href="/create-product" onClick={handleShowCreateProduct} style={{ color: '#000', display: 'block', padding: '5px' }}>
                Add Product
              </a>
              <br />
              <a href="/" onClick={handleShowLogOut} style={{ color: '#000', display: 'block', padding: '5px' }}>
                Log Out
              </a>
            </>
          )}
        </div>
      )}
    </header>
  );
}

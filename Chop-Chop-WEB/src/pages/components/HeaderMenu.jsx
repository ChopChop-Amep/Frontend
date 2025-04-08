import React from 'react'
import { useEffect, useState, useRef } from 'react'
import './HeaderMenu.css'

export function HeaderMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Verificar si el usuario está logueado al cargar el componente
    const token = localStorage.getItem('authToken'); // Cambia 'authToken' por el nombre de tu token
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
      localStorage.removeItem('authToken'); // Eliminar el token de autenticación
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
      <input className='search-bar'
        placeholder='Search'
        onKeyDown={handleSearch}
      />

      <img
        className='logo'
        src='../../public/logo_processed.png'
        onClick={() => {
          window.location.href = '/';
        }}
      />

      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="Imatge User"
        width="40"
        height="40"
        className='img-user'
        onClick={(e) => {
          e.stopPropagation();
          DropDown();
        }}
      />

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className='dropdown-menu'
        >
          {!isLoggedIn ? (
            <>
              <a href="/login" onClick={handleShowLogin} className='dropdown-content'>
                Log In
              </a>
              <br />
              <a href="/signup" onClick={handleShowSignup} className='dropdown-content'>
                Sign Up
              </a>
              <br />
              <a href="/create-product" onClick={handleShowCreateProduct} className='dropdown-content'>
                Add Product
              </a>
              <br />
              <a href="/" onClick={handleShowLogOut} className='dropdown-content'>
                Log Out
              </a>
            </>
          ) : (
            <>
              <a href="/create-product" onClick={handleShowCreateProduct} className='dropdown-content'>
                Add Product
              </a>
              <br />
              <a href="/" onClick={handleShowLogOut} className='dropdown-content'>
                Log Out
              </a>
            </>
          )}
        </div>
      )}
    </header>
  );
}

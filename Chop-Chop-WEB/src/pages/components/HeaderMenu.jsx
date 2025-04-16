import React from 'react'
import { useEffect, useState, useRef } from 'react'
import './HeaderMenu.css'

export function HeaderMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const dropdownRef = useRef(null);
  const [decodedToken, setDecodedToken] = useState({}); // Estado para almacenar el token decodificado

  // Desencriptar el token para ver la información que contiene
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Obtener la parte del payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload); // Retornar el payload como un objeto
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setDecodedToken(decoded); 
        console.log(decoded); // Ver el token decodificado en la consola
      }
    }
  }, []);

// user_metadata: 
//  email: "pablotutormoegle@gmail.com"
//  email_verified: true
//  name: "Pablo"
//  phone_verified: false
//  sub: "62f1d4f1-794a-4919-942a-acddc01d5e7d"
//  surname: "Tutor"
//  type: "profesional"

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

      {isLoggedIn && (
        <a style = {{color: '#000', position: 'fixed', top: '18px', right: '70px'}}> {decodedToken.user_metadata.name} </a>
      )}
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
            </>
          ) : (
            <>
              <a href="/profile" className='dropdown-content'>
                Profile
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
          )}
        </div>
      )}
    </header>
  );
}

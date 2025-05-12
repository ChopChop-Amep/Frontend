import React from 'react'
import { useEffect, useState, useRef } from 'react'
import './HeaderMenu.css'

export function HeaderMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const dropdownRef = useRef(null);

  const token = localStorage.getItem('authToken'); // Cambia 'authToken' por el nombre de tu token
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decodifica el token JWT

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

      <select
        className="select-header"
        onChange={(e) => {
          const selectedCategory = e.target.value;
          if (selectedCategory !== "all") {
            window.location.href = `/search?category=${encodeURIComponent(selectedCategory)}`;
          }
        }}
      >
        <option value="all">Category</option>
        <option value="artesanal">Artesanal</option>
        <option value="antiguitats">Antiguitats</option>
        <option value="cosmetica">Cosmètica</option>
        <option value="cuina">Cuina</option>
        <option value="electrodomestics">Electrodomèstics</option>
        <option value="electronica">Electrònica</option>
        <option value="equipament_lab">Equipament de Laboratori</option>
        <option value="esports">Esports</option>
        <option value="ferramentes">Ferramentes</option>
        <option value="infantil">Infantil</option>
        <option value="instruments">Instruments</option>
        <option value="jardineria">Jardineria</option>
        <option value="jocs_de_taula">Jocs de Taula</option>
        <option value="joies_complements_accessoris">Joies, Complements i Accessoris</option>
        <option value="llibres">Llibres</option>
        <option value="mascotes">Mascotes</option>
        <option value="mobles">Mobles</option>
        <option value="neteja">Neteja</option>
        <option value="roba">Roba</option>
        <option value="sabates">Sabates</option>
        <option value="vehicles">Vehicles</option>
        <option value="videojocs">Videojocs</option>
      </select>

      <img
        className='logo'
        src='/logo_processed.png'
        onClick={() => {
          window.location.href = '/';
        }}
      />

      {isLoggedIn && (
        <>
          <a style = {{color: '#000', position: 'fixed', top: '25px', right: '70px'}}> {decodedToken.user_metadata.name} </a>
          <img
            src={decodedToken.user_metadata?.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
            alt="Image User"
            width="40"
            height="40"
            className='img-user'
            onClick={(e) => {
              e.stopPropagation();
              DropDown();
            }}
            />
        </>
      )}
      {!isLoggedIn && (
        <img
          src={'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
          alt="Image User"
          width="40"
          height="40"
          className='img-user'
          onClick={(e) => {
            e.stopPropagation();
            DropDown();
          }}
        />
      )}

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
              <a href="/myProducts" className='dropdown-content'>
                My Products
              </a>
              <br />
              <a href="/create-product" onClick={handleShowCreateProduct} className='dropdown-content'>
                Add Product
              </a>
              <br />
              <a href="/invoice" className='dropdown-content'>
                Invoice
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

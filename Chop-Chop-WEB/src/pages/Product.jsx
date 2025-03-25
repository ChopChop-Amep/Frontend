import React, { useEffect, useState } from 'react';
//import './product.css';
import { Box } from './utiles/Box.jsx';

const API_URL = 'https://fakestoreapi.com/products?limit=1';

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '5px' }}>
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


function productPage() {
  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState(0);  // Estado para el rating

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => {
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
      <header className="header-style">
        <input
          style={{ backgroundColor: '#fff', color: '#000', position: 'fixed', top: '17px', left: '10px' }}
          placeholder="Search"
        />
        <button
          onClick={handleShowLogin}
          className="button-style-hp"
          style={{ position: 'fixed', top: '17px', right: '10px' }}
        >
          Log In
        </button>
        <button
          onClick={handleShowSignup}
          className="button-style-hp"
          style={{ position: 'fixed', top: '17px', right: '100px' }}
        >
          Sign Up
        </button>
      </header>

      <br />

      <main
   style={{
    display: 'flex',
    justifyContent: 'flex-start', // Mueve el contenido hacia la izquierda
    alignItems: 'center',
    width: '75vw',
    minHeight: '100vh',
    paddingLeft: '0vw', // Agrega un margen desde la izquierda
    boxSizing: 'border-box',
  }}
>
  {products.map((product) => (
    <div
      key={product.id}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px',
        backgroundColor: '#fff',
        border: '3px solid #ccc',
        borderRadius: '20px',
        maxWidth: '90vw',
        minHeight: '80vh',
        boxSizing: 'border-box',
        marginLeft: '-5vw', // Mueve el recuadro hacia la izquierda
        marginRight: 'auto',
        gap: '60px'
      }}
    >
      {/* Contenedor de la imagen */}
      <div style={{ flex: '1', minWidth: '350px' }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{
            width: '100%', // La imagen ocupa el 100% de su contenedor
            maxWidth: '500px', // Ajusta el tamaño máximo de la imagen
            height: 'auto',
          }} 
        />
      </div>

      {/* Contenedor de la descripción */}
      <div
        style={{
          flex: '2',
          backgroundColor: '#f8f8f8',
          padding: '40px',
          borderRadius: '8px',
          color: '#333',
          textAlign: 'justify',
          border: '1px solid #ddd',
          maxWidth: '650px', // Ancho máximo para la descripción
          minWidth: '300px',
        }}
      >
        <h3 style={{ fontSize: '28px' }}>{product.title}</h3>
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

      {/* Botón de compra */}
      <div style={{ flex: '1', textAlign: 'center', marginTop: '400px', minWidth: '200px' }}>
        <button
          onClick={handleShowSignup}
          className="button-style-hp"
          style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '15px 30px',
            borderRadius: '10px',
            border: '2px solid #000',
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  ))}
</main>

    </>
  );
}

export default productPage;
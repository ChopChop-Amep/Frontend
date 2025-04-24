import React, { useState, useEffect } from 'react';
import './Profile.css'
import EditProfileModal from './EditProfileModal';
import { HeaderMenu } from './components/HeaderMenu.jsx';

function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [decodedToken, setDecodedToken] = useState({}); // Estado para almacenar el token decodificado

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
      }
    }
  }, []);
  
  const handleEditClick = () => {
    setIsModalOpen(true);  
  };
  const handleCloseModal = () => {  
    setIsModalOpen(false);
  };
  const handleEditProduct = () => {
    window.location.href = '/ownedProducts';
  };
  const handleAddProduct = () => {
    window.location.href = '/create-product';
  };

  return (
      <>
        <HeaderMenu />
        <img
          src={(decodedToken.user_metadata?.image) || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
          alt="Imatge User"
          className = "image1"
          width="250"
          height="250"
        />
        <div className="image-container"> 
          <img 
            src="https://cdn-icons-png.freepik.com/512/7527/7527819.png"
            alt="Imatge Llapis"
            className = "image2"
            width="40"
            height="40"
            onClick={handleEditClick}
          /> 
        </div>
        <img
          src="https://cdn-icons-png.freepik.com/512/7527/7527819.png"
          alt="Imatge Llapis"
          className = "image3"
          width="40"
          height="40"
          onClick={handleEditProduct}
        /> 
        <p className='nom-usuari-empresa'>
          {decodedToken.user_metadata?.name || ''} {decodedToken.user_metadata?.surname || ''}
        </p> 
        <p className='nom-username'>
          @{decodedToken.user_metadata?.name || ''}{decodedToken.user_metadata?.surname || ''} · {decodedToken.user_metadata?.type || ''}
        </p>
        <p className='nom-info'>
          Descripció/Categories/Filtres
        </p> 
        <p className='nom-location'>
          Vilanova i la Geltrú, 08800, Barcelona, ES
        </p> 
        <p className='num-products'>
          0 products
        </p>

        <p className='Productes'> 
          Products
        </p>
        <div className="container">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/8212/8212741.png"
            alt="imatge plus"
            className="image4"
            width="50"
            height="50"
            onClick={handleAddProduct}
          />
          <p className="no-products">
            Add products
          </p>
        </div>

        {isModalOpen && <EditProfileModal Close={handleCloseModal}/>}
      </>
  );
}

export default UserProfile;


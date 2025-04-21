import React, { useState, useEffect } from 'react';
import './Profile.css'
import EditProfileModal from './EditProfileModal';

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
        <img
          src="data:image/png;base64,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"
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


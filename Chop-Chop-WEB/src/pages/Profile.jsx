import React, { useState} from 'react';
import './Profile.css'
import EditProfileModal from './EditProfileModal';
import { HeaderMenu } from './components/HeaderMenu.jsx';

function UserProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const token = localStorage.getItem('authToken'); // Cambia 'authToken' por el nombre de tu token
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decodifica el token JWT
  
  const handleEditClick = () => {
    setIsModalOpen(true);  
  };
  const handleCloseModal = () => {  
    setIsModalOpen(false);
  };
  const handleEditProduct = () => {
    window.location.href = '/myProducts';
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
          Email: {decodedToken.user_metadata?.email || ''}
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


import React from 'react'
import './HomePage.css'

function HomePage() {
  
  const handleShowLogin = () => {
    window.location.href = '/login';
  };

  const handleShowSignup = () => {
    window.location.href = '/signup';
  };

  return (
    <>
      <header className='header-style'>
        <input style={{ color: '#000000', position: 'fixed', top: '17px', left: '10px' }} placeholder='Search'/>
        <button onClick={handleShowLogin} className='button-style-hp' style={{ position: 'fixed', top: '17px', right: '10px' }}>Log In</button>
        <button onClick={handleShowSignup} className='button-style-hp' style={{ position: 'fixed', top: '17px', right: '100px' }}>Sign Up</button>
      </header>

      <h1>Chop-Chop</h1>
    </>
  )
}

export default HomePage
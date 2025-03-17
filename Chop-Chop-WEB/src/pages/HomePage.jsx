import React from 'react'


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
        <button onClick={handleShowLogin} style={{ position: 'fixed', top: '17px', right: '10px' }}>Login</button>
        <button onClick={handleShowSignup} style={{ position: 'fixed', top: '17px', right: '60px' }}>Sign Up</button>
      </header>

      <h1>Chop-Chop</h1>
    </>
  )
}

export default HomePage
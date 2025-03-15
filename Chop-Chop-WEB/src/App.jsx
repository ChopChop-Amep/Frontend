import './App.css'
import { useState } from 'react'
import Login from './Components/LogIn.jsx'
import Signup from './Components/SignUp.jsx'

function App() {
  const [showComponent, setShowComponent] = useState('login')

  const handleShowLogin = () => setShowComponent('Login')
  const handleShowSignup = () => setShowComponent('Signup')

  return (
    <>
      <header className='header-style'>
        <input style={{ color: '#000000', position: 'fixed', top: '17px', left: '10px' }} placeholder='Search'/>
        <button onClick={handleShowLogin} style={{ position: 'fixed', top: '17px', right: '10px' }}>Login</button>
        <button onClick={handleShowSignup} style={{ position: 'fixed', top: '17px', right: '60px' }}>Sign Up</button>
      </header> 
      {showComponent === 'Login' ? <Login /> : <Signup />}
    </>
  )
}

export default App

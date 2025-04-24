import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/LogIn.jsx'
import Signup from './pages/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import Invoice from './pages/Invoice.jsx'
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Invoice" element ={<Invoice />} />
      </Routes>
    </Router>
  )
}

export default App

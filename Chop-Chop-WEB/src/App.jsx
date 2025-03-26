import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Login from './pages/LogIn.jsx'
import Signup from './pages/SignUp.jsx'
import ProductPage from './pages/Product.jsx'
import CreateProduct from './pages/CreateProduct.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/#" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App

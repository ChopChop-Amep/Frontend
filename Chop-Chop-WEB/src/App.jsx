import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import Login from './pages/LogIn.jsx'
import Signup from './pages/SignUp.jsx'
import Invoice from './pages/Invoice.jsx'
import ProductPage from './pages/Product.jsx'
import CreateProduct from './pages/CreateProduct.jsx'
import SearchPage from './pages/SearchPage.jsx'
import EditProfileModal from './pages/EditProfileModal.jsx'
import UserProfile from './pages/Profile.jsx'

function App() {

  return (
    <Router>
      <Routes fallBack={<h1>Loading...</h1>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/#" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Profile" element={<UserProfile />} />
        <Route path="/Invoice" element ={<Invoice />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product?id=:id" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search?query=:query" element={<SearchPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/edit-profile" element={<EditProfileModal />} />
        <Route path="/edit-profile/:id" element={<EditProfileModal />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  )
}

export default App

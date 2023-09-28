import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './Context/CartContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import NavBar from './components/Header/NavBar.jsx'
import Products from './pages/Products/ProductsPage.jsx'
import ProductDetails from './components/Product/ProductDetails.jsx'
import Register from './pages/Register'
import Login from './pages/Login.jsx'
import Cart from './components/Cart/Cart.jsx'
import Footer from './components/Footer.jsx'
import './style/styles.css'


function App() {

  return (
    <AuthProvider>
        <CartProvider>
          <NavBar />
            <div style={{ minHeight: 'calc(100vh - 60px)' }}>
          <Routes> 
              <Route path="/" element={<Products />} />
              <Route path="/users" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
          </Routes>
            </div> 
          <Footer />
      </CartProvider>
    </AuthProvider>
  )
}

export default App

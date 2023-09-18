import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from "./components/HomePage"
import Products from './components/Products'
import Cart from './components/Cart'
import CheckoutConf from './components/CheckoutConf'
import './App.css'
import SingleProduct from './components/SingleProduct'
import { useState } from 'react'


function App() {
  const [cart, setCart] = useState([])

  return (
    <div>
      <NavBar />
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/single-product/:productId" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart cartItems={cart} />} />
        <Route path="/checkout" element={<CheckoutConf />} />
      </Routes> 
    </div>
  )
}

export default App

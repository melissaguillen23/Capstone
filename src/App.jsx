import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import Products from './pages/Products'
import './style/styles.css'
import ProductDetails from './pages/ProductDetails'
import Register from './pages/Register'
import Login from './pages/Login.jsx'
import Cart from './pages/Cart.jsx'
import Footer from './components/Footer.jsx'


function App() {

  return (
    <>
      <NavBar />
      <div style={{ minHeight: 'calc(100vh - 60px)' }}>
      <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      </div> 
      <Footer />
    </>
  )
}

export default App

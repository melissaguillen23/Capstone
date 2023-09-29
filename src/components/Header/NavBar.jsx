import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "@phosphor-icons/react";
import { useAuth } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import "../../style/styles.css"

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cart } = useCart()
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  }

  return (
      <nav>
        <Link to="/" className="title">
            mg | capstone
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>      
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            {!isLoggedIn ? (
                <>
                    <li>
                        <NavLink to="/auth/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users">Sign Up</NavLink>
                    </li>
                </>
            ) : (
                <li onClick={handleLogout}>
                    Logout
                </li>
            )}
            <li>
                <div className="cart-icon" >
                    <span className="cart-count">{cart.length}</span>
                    <NavLink to="/cart">
                        <ShoppingCart size={32}/>
                    </NavLink>
                </div>
            </li>
        </ul>
    </nav>
  )
}
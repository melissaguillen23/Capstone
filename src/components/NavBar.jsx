import React from "react"
import { Link } from 'react-router-dom'
import "../main.css"

export default function NavBar() {
    return (
      <div>
        <nav>
          <h1>Capstone Store</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <button>Logout</button>
          </ul>
        </nav>
      </div>
    )
  }
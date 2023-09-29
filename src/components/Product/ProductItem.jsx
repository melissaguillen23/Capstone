import React, { createContext, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/CartContext'


export default function ProductItem({ product }) { 
  const { addToCart } = useCart()

  function handleAddToCart() {
    console.log("Attempting to add product to cart:", product);
    addToCart(product);
    alert("Product added to cart!");
  }
    return (
      <div className='product-item'>
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>
            <img src={product.image} alt={product.title} width="100" />
          </Link>
          <div className='description'>
            <h2>{product.title}</h2>
            <b>${product.price}</b>
          </div>
          <button onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>
        </li>
      </div>
    );
  }


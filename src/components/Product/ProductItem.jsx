import React from 'react'
import { Link } from 'react-router-dom';
import { addToCart, useContext, CartContext } from '../../Context/CartContext';

export default function ProductItem({ addToCart }) {
    const { addToCart } = useContext(CartContext);

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
                    <button onClick={() => addToCart(product.id)}>Add to Cart</button> 
                    <ProductItem addToCart={addToCart} />

        </li>
      </div>
    );
  }
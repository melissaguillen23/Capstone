import React from 'react'

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    return (
        <div className='modal-activity'>
            <div className='modal-content'>
                <h2>{product.title}</h2>
                <p>${product.price} </p>
                <p>{product.description} </p>
                <p>Rating: {product.rating.rate} ({product.rating.count} ratings)</p>
                <img src={product.image} alt={product.title} />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
  }
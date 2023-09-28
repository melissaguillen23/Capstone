import React from "react"
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, isModalOpen, handleCloseModal } = useCart();
  const navigate = useNavigate();

  const handleRemove = (productId) => {    
      removeFromCart(productId);    
  };

    return (
      <div className="cart">
        <h1>Shopping Cart</h1>
        {!cart || cart.products.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.products.map(item => (
            <div key={item.productId}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>
                Quantity:
                <input 
                type="number"
                value={item.quantity}
                readOnly
              />
            </p>
            <button onClick={() => handleRemove(item.productId)}>Remove</button>
            </div>
          ))
        )}
        {isModalOpen && (
          <>
            <div className="Cart-Modal-Overlay" onClick={handleCloseModal}></div>
            <div className="Cart-Modal" >
              <button onClick={handleCloseModal}>Close</button>
              <button onClick={() => {
                navigate('/cart');
                handleCloseModal();
            }}>
                  Proceed to Checkout
                </button>
            </div>
          </>
          
        )}
      </div>
    );
  }
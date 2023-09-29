import React, { useEffect, useState } from "react"
import { useCart } from "../../Context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  console.log("Cart from context:", cart);
  const [detailedCart, setDetailedCart] = useState([])
  

  useEffect(() => {
    async function fetchCartDetails() {
      const cartDetails = await api.getCart(cart.id)
      console.log("Cart details from API:", cartDetails);

      const productDetailsPromises = cartDetails.products.map(async (item) => {
        const product = await api.singleProduct(item.productId)
        return {
          ...product,
          quantity: item.quantity,
        }
      })
      const detailedProducts = await Promise.all(productDetailsPromises)
      console.log("Detailed products:", detailedProducts); 
      setDetailedCart(detailedProducts)
    }

    if (cart && cart.id) {
      fetchCartDetails()
    }
  }, [cart])

  const handleRemove = (productId) => {    
      removeFromCart(productId);    
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value)
    updateQuantity(productId, newQuantity)
  }

    return (
      <div className="cart">
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity:
                <input 
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value)
                  updateQuantity(item.id, newQuantity) 
                }}
                min="1"
              />
            </p>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))
        )}
        )
      </div>
    );
  }
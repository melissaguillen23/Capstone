import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
    const [cart, setCart] = useState(initialCart);
    const [cartItemCount, setCartItemCount] = useState(0);

    const updateCartItemCount = () => {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
        setCartItemCount(totalItems)
    }

    const addToCart = (product) => {
        console.log("Product being added to cart:", product);
        const productExists = cart.find(item => item.id === product.id);
    
        setCart(prevState => {
            let updatedCart;
            if (productExists) {
                updatedCart = prevState.map(item =>
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            } else {
                updatedCart = [...prevState, { ...product, quantity: 1 }];
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });

        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(totalItems);
        updateCartItemCount()
    };

    const removeFromCart = (productId) => {
        setCart(prevState => {
            const updatedCart = prevState.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });

        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(totalItems);
        updateCartItemCount()
}
    const updateQuantity = (productId, newQuantity) => {
        setCart(prevState => {
            const updatedCart = prevState.map(item =>
                item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart
        })
        updateCartItemCount()
    }

    const calculateTotalPrice = () => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    }


    return (
        <CartContext.Provider value={{ cart, addToCart, cartItemCount, removeFromCart, updateQuantity, calculateTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
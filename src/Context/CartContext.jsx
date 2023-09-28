import{ createContext, useState, useContext, useEffect } from "react";
import { api } from "../API/CS_API";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext(null);

export const useCart = () => {
    return useContext(CartContext)
}

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < PRODUCTS.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()   

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart && savedCart.product) {
            setCart(JSON.parse(savedCart));
            const totalCount = JSON.parse(savedCart).product.reduce((acc, product) => acc + product.quantity, 0);
            setCartCount(totalCount);
        } else {
            setCart({ products: [] });
        }
        const cartId = localStorage.getItem('cartId');
        if (cartId) {
            console.log("Fetching cart with ID:", cartId);
            api.getCart(cartId).then(data => {
                console.log("Fetched cart data:", data);
                if (!data) {
                    console.log("Cart data is null. Initializing an empty cart.");
                    setCart({
                        id: cartId, 
                        products: []
                    });
                    return;
                
                }
                if (data && data.products) {
                    setCart(data);
                    const totalCount = data.products.reduce((acc, product) => acc + product.quantity, 0);
                    setCartCount(totalCount);
                } else {
                    console.log("Cart data is null. Initializing an empty cart.");
                    const emptyCart = { products: [] };
                    setCart(emptyCart);
                    localStorage.setItem('cart', JSON.stringify(emptyCart));
                }
            }).catch(error => {
                console.error("Error fetching cart:", error.message);
            });
        } else {
            console.log("No cart ID found in local storage. Creating a new cart.");
            api.createCart("placeholderUserId").then(newCart => {
                console.log("Created new cart:", newCart);
                setCart(newCart);
                localStorage.setItem('cartId', newCart.id);
            }).catch(error => {
                console.error("Error creating new cart:", error.message);
            });
        }
    }, []);
    

    useEffect(() => {
        if (cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = async (productId) => {
        console.log("Adding item to cart:", productId);
        if (!cart || typeof cart.id === 'undefined') {
            console.error("Cart ID is undefined. Cannot add product to cart.");
            return;
        }
        console.log("Cart ID:", cart.id);
    
        try {
            await api.addProductToCart(cart.id, productId);
            console.log("Product added to cart successfully");
            handleOpenModal()
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    
        const updatedCart = await api.getCart(cart.id);
        console.log("Fetched Cart:", updatedCart);
    
        if (!updatedCart) {
            console.error("Fetched cart is null. Initializing an empty cart.");
            setCart({
                id: cart.id,
                products: []
            });
            return;
        }
    
        setCart(updatedCart);  
        const totalCount = (updatedCart.products || []).reduce((acc, product) => acc + product.quantity, 0);
        setCartCount(totalCount);  
    };

    const removeFromCart =  async (productId) => {
        if (!cart) return;
        await api.removeProductFromCart(cart.id, productId);
        const updatedCart = await api.getCart(cart.id);
        setCart(updatedCart);
        const totalCount = updatedCart.products.reduce((acc, product) => acc + product.quantity, 0);
        setCartCount(totalCount);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const value = {
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        isModalOpen,
        handleOpenModal,
        handleCloseModal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
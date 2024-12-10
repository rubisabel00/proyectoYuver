import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Initialize cart from localStorage or default to an empty array
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        // Ensure cart is always saved as an array
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Add to cart method
    const addToCart = (product) => {
        setCart((prevCart) => {
            // Check if product already exists in cart
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex > -1) {
                // If product exists, increase quantity
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + 1
                };
                return updatedCart;
            } else {
                // If product doesn't exist, add new product
                return [
                    ...prevCart, 
                    { 
                        ...product, 
                        quantity: 1,
                        image: product.images && product.images.length > 0 ? product.images[0] : null
                    }
                ];
            }
        });

        // Optional: Sweet Alert notification
        Swal.fire({
            title: 'Producto añadido',
            text: `${product.title} se añadió al carrito`,
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 2000
        });
    };

    // Method to add multiple products
    const addMultipleToCart = (products) => {
        const productsToAdd = Array.isArray(products) ? products : [products];
        
        productsToAdd.forEach(product => {
            addToCart(product);
        });

        Swal.fire({
            title: 'Productos añadidos',
            text: `Se añadieron ${productsToAdd.length} producto(s) al carrito`,
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 2000
        });
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));

        Swal.fire({
            title: 'Producto eliminado',
            text: 'El producto ha sido eliminado del carrito',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    };

    // Increase quantity
    const increaseQuantity = (productId) => {
        setCart((prevCart) => 
            prevCart.map(item => 
                item.id === productId 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
            )
        );
    };

    // Decrease quantity
    const decreaseQuantity = (productId) => {
        setCart((prevCart) => 
            prevCart.map(item => 
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
            )
        );
    };

    // Calculate total items
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Calculate total price
    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <CartContext.Provider 
            value={{
                cart,
                addToCart,
                addMultipleToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                getTotalItems,
                getTotalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
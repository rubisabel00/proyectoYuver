import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Crear el contexto del carrito
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Inicializar el carrito desde localStorage o como un array vacío
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Sincronizar el carrito con localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Agregar un producto al carrito
    const addToCart = (product) => {
        if (!product.id) {
            console.error('El producto no tiene un ID único:', product);
            return;
        }

        setCart((prevCart) => {
            // Verificar si el producto ya existe en el carrito
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex > -1) {
                // Si el producto ya existe, aumentar la cantidad
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex] = {
                    ...updatedCart[existingProductIndex],
                    quantity: updatedCart[existingProductIndex].quantity + 1
                };
                return updatedCart;
            } else {
                // Si el producto no existe, agregarlo al carrito
                return [
                    ...prevCart,
                    {
                        ...product,
                        quantity: 1,
                        image: product.images?.[0] || 'https://via.placeholder.com/400'
                    }
                ];
            }
        });

        Swal.fire({
            title: 'Producto añadido',
            text: `${product.title || 'Producto'} se añadió al carrito`,
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 2000,
        });
    };

    // Eliminar un producto del carrito
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));

        Swal.fire({
            title: 'Producto eliminado',
            text: 'El producto ha sido eliminado del carrito',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    };

    // Aumentar la cantidad de un producto
    const increaseQuantity = (productId) => {
        setCart((prevCart) => 
            prevCart.map(item => 
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Disminuir la cantidad de un producto
    const decreaseQuantity = (productId) => {
        setCart((prevCart) => 
            prevCart.map(item => 
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Obtener el total de productos en el carrito
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Obtener el precio total del carrito
   /*  const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }; */
    const getTotalPrice = () => {
        if (cart.length === 0) return 0; // Si el carrito está vacío, retornar 0
    
        return cart
            .reduce((total, item) => total + item.price * item.quantity, 0) // Calcular el total acumulado
            .toFixed(2); // Formatear a dos decimales
    };
    

    return (
        <CartContext.Provider 
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                getTotalItems,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

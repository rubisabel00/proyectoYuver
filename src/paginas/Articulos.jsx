import React, { useContext } from 'react';
import { CartContext } from '../services/CartContext';

function Articulos() {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p className="text-center fs-4">No tienes productos en tu carrito.</p>
            ) : (
                <div className="row justify-content-center col-12">
                    {cart.map((item, index) => (
                        <div key={item.id || `cart-item-${index}`} className="col-12 col-md-6 mb-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="row g-0">
                                    {item.image && (
                                        <div className="col-md-4 d-flex align-items-center">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="img-fluid rounded-start p-2"
                                                style={{ maxHeight: '100px', objectFit: 'contain' }}
                                            />
                                        </div>
                                    )}
                                    <div className="col-md-12 col-12">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text mb-1">
                                                <strong>Precio:</strong> ${item.price}
                                            </p>
                                            <p className="card-text mb-2">
                                                <strong>Cantidad:</strong> {item.quantity}
                                            </p>
                                            <div className="d-flex gap-2 col-12">
                                                <button
                                                    className="btn btn-success btn-sm col-4"
                                                    onClick={() => increaseQuantity(item.id)}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-sm col-4"
                                                    onClick={() => decreaseQuantity(item.id)}
                                                >
                                                    -
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm col-4"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    Borrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Articulos;

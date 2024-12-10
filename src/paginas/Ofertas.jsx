import React, { useContext, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FetchProducts } from '../services/api';
import { CartContext } from '../services/CartContext';
import '/public/ofertas.css';

function Ofertas() {
    // Estados para controlar productos, errores y modales
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const { addToCart } = useContext(CartContext);

    // Cargar productos desde la API al montar el componente
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await FetchProducts();
                setProducts(data);
            } catch (err) {
                setError('Error al cargar los productos.');
                console.error(err);
            }
        };

        loadProducts();
    }, []);

    // Función para abrir el modal con el producto seleccionado
    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    return (
        <>
            {/* Sección de ofertas */}
            <div className="container-fluid pt-5 pb-4 ps-5">
                <h2 className="">Ofertas</h2>
                <p className="mb-4 fs-4">Estas son las ofertas más interesantes de ropa de la tienda.</p>
                <div className='container' id='slider1'>
                    
                </div>
                {error && <p className="text-danger">{error}</p>}

                <div className="cards d-flex col-12 justify-content-center flex-wrap gap-4">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="card cursor-pointer"
                            style={{ width: '18rem' }}
                            onClick={() => handleOpenModal(product)}
                        >
                            <img
                                src={product.images[0]}
                                className="card-img"
                                alt={product.title}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para mostrar detalles del producto */}
            {selectedProduct && (
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Body>
                        <div className="col-12 d-flex justify-content-between">
                            <h1>{selectedProduct.title}</h1>
                            <button className="btn" onClick={handleCloseModal}>X</button>
                        </div>
                        <div className="d-flex col-12">
                            <img
                                src={selectedProduct.images[0]}
                                alt="Modal Image"
                                className="img-fluid col-5"
                            />
                            <div className="col-7 p-2">
                                <h2>Descripción</h2>
                                <p>{selectedProduct.description}</p>
                                <p><strong>Precio:</strong> ${selectedProduct.price}</p>
                                <p><strong>Categoría:</strong> {selectedProduct.category}</p>
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            addToCart(selectedProduct);
                                            handleCloseModal();
                                        }}
                                    >
                                        Añadir al carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}

export default Ofertas;

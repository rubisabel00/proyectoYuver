import React, { useContext, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { FetchProducts } from '../services/api';
import { CartContext } from '../services/CartContext';
import '/public/nosotros.css';

function Nosotros() {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const { addToCart } = useContext(CartContext);

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

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <div className="container-fluid pt-5">
                <h2 className='text-center'>JYA STORE</h2>
                <p className="text-center fs-2">
                    Bienvenidos a la mejor tienda de ropa online que podrás encontrar.
                </p>
                <div id='slider' className='container'></div>
            </div>

            <div className="container-fluid pt-5 pb-4 col-12 ps-5">
                <h4 className=" mb-4">Destacados.</h4>
                {error && <p className="text-danger">{error}</p>}
                <div className="cards col-11 d-flex ms-5 flex-wrap gap-4">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="card col-3 cursor-pointer"
                            onClick={() => handleOpenModal(product)}
                        >
                            <img
                                src={product.images[0]}
                                className="card-img-top"
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

export default Nosotros;

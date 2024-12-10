// components/ProductModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';

const ProductModal = ({ show, product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body>
        <div className="col-12 d-flex justify-content-between">
          <h1>{product.title}</h1>
          <button className="btn" onClick={onClose}>
            X
          </button>
        </div>
        <div className="d-flex col-12">
          <img
            src={product.images[0]}
            alt={product.title}
            className="img-fluid col-6"
          />
          <div className="col-6 p-2">
            <h2>Descripción</h2>
            <p>{product.description}</p>
            <p>
              <strong>Precio:</strong> ${product.price}
            </p>
            <p>
              <strong>Categoría:</strong> {product.category}
            </p>
            <div className="d-flex justify-content-end">
              <button className="btn btn-success" onClick={() => onAddToCart(product)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;

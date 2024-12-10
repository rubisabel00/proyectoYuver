// components/Categorias.jsx
import React, { useState, useEffect, useContext } from 'react';
import { FetchProducts } from '../services/api';
import { CartContext } from '../services/CartContext';
import ProductModal from './ProductModal';
import '/public/Categoria.css'

function Categorias() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useContext(CartContext);

  // Cargar productos desde la API al montar el componente
  useEffect(() => {
    const loadProducts = async () => {
      const data = await FetchProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  // Lista de categorías únicas
  const categories = ['Todos', ...new Set(products.map((product) => product.category))];

  // Filtrar productos por categoría seleccionada
  const filteredProducts =
    selectedCategory === 'Todos'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Abrir modal con el producto seleccionado
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container-fluid pt-5 pb-4">
      <h1 className="fs-1 mb-4 text-center">Categorías</h1>

      {/* Selector de categorías */}
      <div className="d-flex justify-content-center mb-4">
        <select
          className="form-select w-25 shadow-sm"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar productos filtrados */}
      <div className="cards-container d-flex justify-content-center flex-wrap gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card shadow-sm border-0 rounded cursor-pointer"
              onClick={() => handleOpenModal(product)}
            >
              <img
                src={product.images[0]}
                className="card-img rounded-top"
                alt={product.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </div>
          ))
        ) : (
          <p className="text-muted fs-4">No hay productos disponibles.</p>
        )}
      </div>

      {/* Modal para mostrar detalles del producto */}
      <ProductModal
        show={showModal}
        product={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={addToCart}
      />
    </div>
  );
}

export default Categorias;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nosotros from './paginas/Nosotros';
import Categorias from './paginas/Categorias';
import Ofertas from './paginas/Ofertas';
import Login from './paginas/Login';
import Menu from './componentes/Layouts/Menu';
import Articulos from './paginas/Articulos';
import Layout from './componentes/Layouts/Layoutbg';
import { CartProvider } from './services/CartContext'; // Importar el CartProvider
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <CartProvider> {/* Agregar el CartProvider envolviendo toda la aplicación */}
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Nosotros />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/ofertas" element={<Ofertas />} />
          </Route>
          <Route path='/Articulos' element={<Articulos />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;



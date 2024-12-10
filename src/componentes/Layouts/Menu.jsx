import React from "react";
import { Link } from "react-router-dom";

function Menu() {
    return (
        <>
            <header className="bg-dark text-white">
                <nav className="navbar navbar-expand-lg navbar-dark container">
                    <Link to="/" className="navbar-brand">JYA STORE</Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
                            <li className="nav-item"><Link to="/categorias" className="nav-link">Categorías</Link></li>
                            <li className="nav-item"><Link to="/ofertas" className="nav-link">Ofertas</Link></li>
                        </ul>
                        <div className="ms-3 d-flex align-items-center">
                            <Link 
                                to="/articulos"
                                className="text-white me-3 d-flex align-items-center" 
                                style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                            >
                                <i className="bi bi-cart"></i>
                            </Link>
                            <Link 
                                to="/login" 
                                className="text-white d-flex align-items-center" 
                                style={{ fontSize: '1.2rem', cursor: 'pointer', color: 'white' }}
                            >
                                <i className="bi bi-person"></i>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Menu;

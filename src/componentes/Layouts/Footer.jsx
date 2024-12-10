import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <p><i className="bi bi-truck me-2"></i><strong>Envíos Gratis</strong><br />En pedidos superiores a 50€</p>
            <p><i className="bi bi-credit-card me-2"></i><strong>Pago seguro</strong><br />100% garantizado</p>
            <p><i className="bi bi-shield-lock me-2"></i><strong>Compra Protegida</strong><br />Devolución garantizada</p>
          </div>
          <div className="col-md-4 offset-md-4">
            <p>Suscríbete para recibir ofertas:</p>
            <form className="d-flex">
              <input type="email" className="form-control me-2" placeholder="Escribe tu email" />
              <button className="btn btn-primary">Suscribirse</button>
            </form>
          </div>
        </div>
        <p className="text-center mt-3">&copy; 2024 Tu Tienda. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;

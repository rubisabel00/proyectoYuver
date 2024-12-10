import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Login() {
  const [showModal, setShowModal] = useState(false);

  // Función para abrir y cerrar el modal
  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form>
          {/* Campo de correo electrónico */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu correo"
              required
            />
          </div>

          {/* Campo de contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Botón de acceder */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Acceder
            </button>
          </div>

          {/* Enlace para registrarse */}
          <p className="text-center mt-3">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              className="btn btn-link text-primary p-0"
              onClick={toggleModal}
            >
              Regístrate aquí
            </button>
          </p>
        </form>
      </div>

      {/* Modal para registrarse */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registro</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* Campo de nombre */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Ingresa tu nombre"
                      required
                    />
                  </div>

                  {/* Campo de apellidos */}
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Ingresa tus apellidos"
                      required
                    />
                  </div>

                  {/* Campo de correo electrónico */}
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="registerEmail"
                      placeholder="Ingresa tu correo"
                      required
                    />
                  </div>

                  {/* Campo de contraseña */}
                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="registerPassword"
                      placeholder="Crea una contraseña"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { UseUserActions } from "../../hooks/UseUserActions";

export const Register = () => {
  const { NewUser } = UseUserActions();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    numeroDocumento: "",
    email: "",
    telefono: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    NewUser(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-register">
      <div className="register">
        <div className="info-login">
          <i className="fa-solid fa-earth-americas"></i>
          <h2>Sign up to Econnect</h2>
        </div>
        <form onSubmit={handleSubmit} className="form-register">
          <div className="container-cols">
            <div className="col-one">
              <label>Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
              <label>Correo Electrónico:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="col-two">
              <label>Apellido:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-input"
              />
              <label>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
              />
              <label>Teléfono:</label>
              <input
                type="number"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <button className="button-register" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { UseUserActions } from "../../hooks/UseUserActions";
import "./Module.scss";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/Loader";
import { Link } from "react-router-dom";

export const Register = () => {
  const { NewUser } = UseUserActions();
  const { status } = useSelector((state) => state.users);

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
    <div className="container-login">
      <div className="info-login">
        <i className="fa-solid fa-earth-americas"></i>
        <div className="logo">
          <img
            src="/assets/icons/favicon.ico"
            alt="logo"
            width={30}
            height={30}
          />
          Econnect
        </div>
      </div>
      <form onSubmit={handleSubmit} className="form-login">
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

        <button
          className="button-login"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? <Loader /> : "Sign up"}
        </button>
      </form>
      <div className="link-register">
        <p>
          Don't have an account?{" "}
          <Link to="/login-user" className="link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

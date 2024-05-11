import React, { useState } from "react";
import { UseUserActions } from "../../hooks/UseUserActions";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import "./Module.scss";

export const Register = () => {
  const navigate = useNavigate();
  const { NewUser } = UseUserActions();
  const { status } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    telefono: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await NewUser(formData);
    if (response.meta.requestStatus === "fulfilled") {
      navigate("/login-user");
    }
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
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-input"
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className="form-input"
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-input"
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="form-input"
        />
        <label>Phone:</label>
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

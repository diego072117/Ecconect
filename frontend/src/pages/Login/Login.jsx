import React, { useEffect, useState } from "react";
import { UseUserActions } from "../../hooks/UseUserActions";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Module.scss";

export const Login = () => {
  const { LoginUser } = UseUserActions();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginUser(formData);
    setFormData({ email: "", password: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { status } = useSelector((state) => state.users);
  const user = useSelector((state) => state.users.auth.access_token);
  useEffect(() => {
    if (user != false) {
      navigate("/");
    }
  }, [user]);

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

      <form className="form-login" onSubmit={handleSubmit}>
        <label className="title-input">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-input"
        />

        <label className="title-input">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="form-input"
        />

        <button
          className="button-login"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? "Cargando..." : "Sign in"}
        </button>
      </form>
      <div className="link-register">
        <p>
          Don't have an account?{" "}
          <Link to="/register-user" className="link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

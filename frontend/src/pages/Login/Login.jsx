import React, { useEffect, useState } from "react";
import { UseUserActions } from "../../hooks/UseUserActions";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/Loader";
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
  const userAdmin = useSelector((state) => state.users.auth.user);

  useEffect(() => {
    if (user != false) {
      if (userAdmin.isAdmin === 1) {
        navigate("/home-admin");
      } else {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div className="container-login">
      <div className="info-login">
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
          {status === "loading" ? <Loader /> : "Sign in"}
        </button>
      </form>
      <div className="link-register">
        <p>
          Don't have an account?{" "}
          <Link to="/register-user" className="link">
            Sign up
          </Link>
        </p>
        <p>
          let's get to know each other {" "}
          <Link to="/about-us" className="link">
            About us
          </Link>
        </p>
      </div>
    </div>
  );
};

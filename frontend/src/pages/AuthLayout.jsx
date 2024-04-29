import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <section className="">
        <Outlet />
      </section>
      <img
        src="./assets/images/side-img.svg"
        alt="logo"
        className="img-login"
      />
    </div>
  );
};

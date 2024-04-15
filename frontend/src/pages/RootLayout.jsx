import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";

export const RootLayout = () => {
  return (
    <div className="layout">
      <Nav />
      <section className="layout-content">
        <Outlet />
      </section>
    </div>
  );
};

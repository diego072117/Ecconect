import { Outlet } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { Buttombar } from "../components/Buttombar/Buttombar";
import { Topbar } from "../components/Topbar/Topbar";

export const RootLayout = () => {
  return (
    <div className="layout">
      <Topbar />
      <Nav />

      <section className="layout-content">
        <Outlet />
      </section>

      <Buttombar />
    </div>
  );
};

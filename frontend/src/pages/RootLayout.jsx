import { Link, Outlet } from "react-router-dom";
import { Nav } from "../components/Nav/Nav";
import { Buttombar } from "../components/Buttombar/Buttombar";
import { Topbar } from "../components/Topbar/Topbar";
import { RiChat1Fill2 } from "react-icons/ri";
import { VscRobot } from "react-icons/vsc";

export const RootLayout = () => {
  return (
    <div className="layout">
      <Topbar />
      <Nav />

      <section className="layout-content">
        <Outlet />
        <Link className="bot-ia" to="/bot-ia">
          <div className="bot-ia-container">
            <RiChat1Fill2  className="chat-icon" />
            <p className="icon-ia">
              <VscRobot />
            </p>
          </div>
        </Link>
      </section>

      <Buttombar />
    </div>
  );
};

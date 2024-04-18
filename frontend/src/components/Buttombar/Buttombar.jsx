import { bottombarLinks } from "../../constants";
import { Link, useLocation } from "react-router-dom";
import "./Module.scss"

export const Buttombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`buttombar-link ${isActive && "selected-item"}`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && "icon-buttom-nav"}`}
            />

            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

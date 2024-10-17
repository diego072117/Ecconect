import { useSelector } from "react-redux";
import { UseUserActions } from "../../hooks/UseUserActions";
import { Link, NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../constants";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";

export const Nav = () => {
  const { LogoutUser } = UseUserActions();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.users.auth.user);

  return (
    <nav className="leftsidebar">
      <div className="items-nav">
        <Link to="/" className="logo" translate="no">
          <img
            src="/assets/icons/favicon.ico"
            alt="logo"
            width={30}
            height={30}
            //className="logo"
          />
          Econnect
        </Link>
        <Link to={`/profile/${user.id}`} className="info-user">
          <img
            src={
              user.avatar
                ? `${VITE_URL_API_IMG}/${user.avatar}`
                : "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
          />
          <div className="flex flex-col">
            <p className="user-name">{user.name}</p>
            <p className="tag-name">@{user.username}</p>
          </div>
        </Link>
        <div className="flex flex-col gap-6 options-nav">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <div key={link.label} className="leftsidebar-link">
                <NavLink
                  to={link.route}
                  className={`nav-link ${isActive && "hover-items"}`}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`${isActive && "icon-nav"}`}
                  />
                  {link.label}
                </NavLink>
              </div>
            );
          })}
        </div>
        <button className="button-logout" onClick={LogoutUser}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </button>
      </div>
    </nav>
  );
};

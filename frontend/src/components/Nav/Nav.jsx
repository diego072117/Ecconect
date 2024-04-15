import { useSelector } from "react-redux";
import { UseUserActions } from "../../hooks/UseUserActions";
import "./Module.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../constants";

export const Nav = () => {
  const { LogoutUser } = UseUserActions();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.users.auth.user);
  return (
    <nav className="leftsidebar">
      <div className="items-nav">
        <Link to="/">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
            className="logo"
          />
        </Link>
        <Link to={`/profile/${user.id}`} className="info-user">
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="user-name">{user.name} {user.lastName}</p>
            <p className="tag-name">@{user.name}</p>
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

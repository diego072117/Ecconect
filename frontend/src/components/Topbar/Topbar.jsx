import { UseUserActions } from "../../hooks/UseUserActions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";

export const Topbar = () => {
  const { LogoutUser } = UseUserActions();
  const user = useSelector((state) => state.users.auth.user);
  return (
    <section className="container-topbar">
      <Link to="/" className="logo-topbar">
        <img
          src="/assets/icons/favicon.ico"
          alt="logo"
          width={25}
          height={25}
          //className="logo"
        />
        Econnect
      </Link>

      <div className="topbar-session">
        <button variant="ghost" className="exit-topbar" onClick={LogoutUser}>
          <img src="/assets/icons/logout.svg" alt="logout" />
        </button>
        <Link to={`/profile/${user.id}`}>
          <img
            src={
              user.avatar
                ? `${VITE_URL_API_IMG}/${user.avatar}`
                : "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className="user-topbar"
          />
        </Link>
      </div>
    </section>
  );
};

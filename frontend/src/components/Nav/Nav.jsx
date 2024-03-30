import { useSelector } from "react-redux";
import { UseUserActions } from "../../hooks/UseUserActions";

export const Nav = () => {
  //const { isUserAuthenticated } = useValidators();
  const { LogoutUser } = UseUserActions();
  const user = useSelector((state) => state.users.auth.user);
  return (
    <nav className="container-nav">
      <div className="user-info-nav">
        <div className="options-nav">
          <button className="sing-out item-nav logout-nav" onClick={LogoutUser}>
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

const { VITE_URL_API_IMG } = import.meta.env;
import { Link } from "react-router-dom";
import "./Module.scss"

export const UserCard = ({ user }) => {
  return (
    <Link className="card-user" to={`/profile/${user.id}`}>
      <img
        src={
          user.avatar
            ? `${VITE_URL_API_IMG}/${user.avatar}`
            : "/assets/icons/profile-placeholder.svg"
        }
        alt="profile"
      />
      <p className="user-name">{user.name}</p>
      <p className="username">@{user.username}</p>
      <button className="button-follow-user">Follow</button>
    </Link>
  );
};

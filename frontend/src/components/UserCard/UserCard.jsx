import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFollowersActions } from "../../hooks/useFollowersActions";
import { useEffect } from "react";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";

export const UserCard = ({ user }) => {
  const { followUser, getFollowings } = useFollowersActions();
  const userAuth = useSelector((state) => state.users.auth.user);
  const { followings, status: statusFollow } = useSelector(
    (state) => state.followers
  );

  useEffect(() => {
    if (userAuth) {
      getFollowings(userAuth.id);
    }
  }, []);

  const handleFolliwing = async () => {
    await followUser({
      follower_id: userAuth.id,
      followed_id: user.id,
    });
    getFollowings(userAuth.id);
  };

  const isFollowing = () => {
    return followings.some((follow) => follow.id == user.id);
  };

  return (
    <div className="card-user">
      <Link to={`/profile/${user.id}`} className="redirection-profile-user">
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
      </Link>
      {user.id != userAuth.id ? (
        <button
          className={`button-follow-user `}
          onClick={handleFolliwing}
          disabled={statusFollow === "loading"}
        >
          {isFollowing() ? "UnFollow" : "Follow"}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

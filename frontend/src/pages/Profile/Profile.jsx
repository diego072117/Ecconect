import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PostByUser } from "../../components/PostByUser/PostByUser";
import { useEffect, useState } from "react";
import { ListPostByUser } from "../../components/LikedPostByUser/ListPostByUser";
const { VITE_URL_API_IMG } = import.meta.env;
import { UseUserActions } from "../../hooks/UseUserActions";
import { Loader } from "../../shared/Loader";
import "./Module.scss";

export const Profile = () => {
  const { id } = useParams();
  const { userbyId } = UseUserActions();
  const userAuth = useSelector((state) => state.users.auth.user);
  const { userById: user, status } = useSelector((state) => state.users);
  const { postsByUser } = useSelector((state) => state.posts);
  const [split, setSplit] = useState(true);

  useEffect(() => {
    userbyId(id);
  }, [id]);

  const handleOptionProfile = () => {
    setSplit(!split);
  };

  if (!user || status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  return (
    <div className="profile-content">
      <div className="container-profile">
        <div className="info-profile">
          <div className="user-profile">
            <img
              src={
                user.avatar
                  ? `${VITE_URL_API_IMG}/${user.avatar}`
                  : "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="img-avatar"
            />
            <div className="info-user-profile">
              <p className="user-name">{user.name}</p>
              <p className="tag-name">@{user.username}</p>
              <div className="info-acount">
                <p className="posts">
                  <span>{postsByUser.posts?.length}</span> Posts
                </p>
                <p className="followers">
                  <span>20</span> Followers
                </p>
                <p className="following">
                  <span>20</span> Following
                </p>
              </div>
            </div>
          </div>
          <div className="edit-profile">
            {userAuth.id == user.id ? (
              <Link
                to={`/update-profile/${userAuth.id}`}
                className={`edit-button`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p>Edit Profile</p>
              </Link>
            ) : (
              <Link className={`edit-button`}>
                <p>Follow</p>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="options-profile">
        <div className="buttons-actions-profile">
          <button
            className={`button ${split ? "active" : "inactive"}`}
            onClick={handleOptionProfile}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </button>
          <button
            className={`button-like ${!split ? "active" : "inactive"}`}
            onClick={handleOptionProfile}
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </button>
        </div>
      </div>
      <div className="post-likes">
        {split ? <PostByUser userId={user.id} /> : <ListPostByUser />}
      </div>
    </div>
  );
};

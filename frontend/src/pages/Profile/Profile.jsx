import { useSelector } from "react-redux";
import "./Module.scss";
import { Link } from "react-router-dom";
import { PostByUser } from "../../components/PostByUser/PostByUser";
import { useState } from "react";
import { ListPostByUser } from "../../components/LikedPostByUser/ListPostByUser";

export const Profile = () => {
  const user = useSelector((state) => state.users.auth.user);
  const { postsByUser } = useSelector((state) => state.posts);
  const [split, setSplit] = useState(true);

  const handlePostLiked = () => {
    setSplit(false);
  };

  const handlePostUser = () => {
    setSplit(true);
  };

  return (
    <div className="profile-content">
      <div className="container-profile">
        <div className="info-profile">
          <div className="user-profile">
            <img
              src="/assets/icons/profile-placeholder.svg"
              alt="profile"
              className="img-avatar"
            />
            <div className="info-user-profile">
              <p className="user-name">
                {user.name} {user.lastName}
              </p>
              <p className="tag-name">@{user.name}</p>
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
            <Link to={`/update-profile/${user.$id}`} className={`edit-button`}>
              <img
                src={"/assets/icons/edit.svg"}
                alt="edit"
                width={20}
                height={20}
              />
              <p>Edit Profile</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="options-profile">
        <div className="buttons-actions-profile">
          <button
            className={`button ${split ? "active" : "inactive"}`}
            onClick={handlePostUser}
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
            onClick={handlePostLiked}
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

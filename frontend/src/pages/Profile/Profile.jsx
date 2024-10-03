import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PostByUser } from "../../components/PostByUser/PostByUser";
import { useEffect, useState } from "react";
import { LikedPostByUser } from "../../components/LikedPostByUser/LikedPostByUser";
import { UseUserActions } from "../../hooks/UseUserActions";
import { Loader } from "../../shared/Loader";
import { useFollowersActions } from "../../hooks/useFollowersActions";
import { RiUserFollowFill } from "react-icons/ri";
import { RiUserUnfollowFill } from "react-icons/ri";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";

export const Profile = () => {
  const { id } = useParams();
  const { userbyId } = UseUserActions();
  const { followUser, getFollowingsUserProfile, getFollowingsUserAuth } =
    useFollowersActions();
  const userAuth = useSelector((state) => state.users.auth.user);
  const { userById: user, status } = useSelector((state) => state.users);
  const { postsByUser } = useSelector((state) => state.posts);
  const {
    followingsUserProfile,
    followingsUserAuth,
    status: statusFollow,
  } = useSelector((state) => state.followers);
  const [split, setSplit] = useState(true);

  useEffect(() => {
    userbyId(id);
    getFollowingsUserProfile(id);
  }, [id]);

  const handlePostProfile = () => {
    setSplit(true);
  };

  const handleLikeProfile = () => {
    setSplit(false);
  };

  const handleFolliwing = async () => {
    await followUser({
      follower_id: userAuth.id,
      followed_id: id,
    });
    getFollowingsUserAuth(userAuth.id);
  };

  const isFollowing = () => {
    return followingsUserAuth.some((follow) => follow.id == id);
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
                  <span>{followingsUserProfile?.length}</span> Following
                </p>
              </div>
            </div>
          </div>
          <div className="edit-profile">
            {userAuth.id == user.id ? (
              <Link
                to={`/update-profile/${userAuth.id}`}
                className={`edit-follow-button`}
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
              <button
                onClick={handleFolliwing}
                className={`edit-follow-button ${
                  statusFollow === "loading" ? "disabled" : "Active"
                }`}
                disabled={statusFollow === "loading"}
              >
                {isFollowing() ? (
                  <RiUserUnfollowFill className="unfollow-icon" />
                ) : (
                  <RiUserFollowFill className="follow-icon" />
                )}
                <p>{isFollowing() ? "UnFollow" : "Follow"}</p>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="options-profile">
        <div className="buttons-actions-profile">
          <button
            className={`button-post-profile ${split ? "active" : "inactive"}`}
            onClick={handlePostProfile}
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
            className={`button-like-profile ${!split ? "active" : "inactive"}`}
            onClick={handleLikeProfile}
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
        {split ? <PostByUser userId={user.id} /> : <LikedPostByUser />}
      </div>
    </div>
  );
};

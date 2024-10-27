import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
const { VITE_URL_API_IMG } = import.meta.env;
import { useCalificationActions } from "../../hooks/useCalifications";
  import { useSelector } from "react-redux";
import "./Module.scss";

export const CommentsPost = ({ comments, post, refreshPostData }) => {
  const user = useSelector((state) => state.users.auth.user);
  const { calificationPost } = useCalificationActions();

  const handleCalificationhPost = async (userComment_id) => {
    const result = await calificationPost({
      id_usuarioPost: user.id,
      id_usuariodonado: userComment_id,
      id_post: post.id,
    });

    if (result) {
      refreshPostData();
    }
  };

  return (
    <div className="container-commets">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <Link
              className="comment-user"
              to={`/profile/${comment.usuario.id}`}
            >
              <img
                src={
                  comment.usuario.avatar
                    ? `${VITE_URL_API_IMG}/${comment.usuario.avatar}`
                    : "/assets/icons/profile-placeholder.svg"
                }
                alt="profile"
              />
            </Link>
            <div className="comment-content">
              <div className="info-user-comment">
                <div className="user-comment">
                  <p className="name-comment">{comment.usuario.name}</p>
                  <p className="username-comment">
                    @{comment.usuario.username}
                  </p>
                </div>
                {post.state === "activo" && comment.id_user != user.id && (
                  <button
                    onClick={() => {
                      handleCalificationhPost(comment.usuario.id);
                    }}
                    className="icon-calification"
                  >
                    <FaCheckCircle />
                  </button>
                )}
              </div>

              <p>{comment.coment}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay comentarios</p>
      )}
    </div>
  );
};

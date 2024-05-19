import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../shared/Loader";
import { usePostActions } from "../../hooks/usePostActions";
import { useEffect, useState } from "react";
import { format } from "date-fns";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";
import { CommentsPost } from "../../components/CommentsPost/CommentsPost";

export const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { postsById, commetPost, saveComment } = usePostActions();
  const {
    postById: post,
    commentsPost,
    status,
  } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.users.auth.user);
  const [comment, setComment] = useState("");

  useEffect(() => {
    postsById(id);
    commetPost(id);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await saveComment({
        id_user: user.id,
        id_post: post.id,
        coment: comment,
      });
      setComment("");
      commetPost(id); // Refresh comments
    }
  };

  if (!post || status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  const formattedDate = post.created_at
    ? format(new Date(post.created_at), "d MMM, yyyy")
    : "";

  return (
    <div className="post-details-container">
      <button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="button-back"
      >
        <img src={"/assets/icons/back.svg"} alt="back" width={24} height={24} />
        <p>Back</p>
      </button>

      <div className="info-details">
        <img
          src={`${VITE_URL_API_IMG}/${post.publicacion}`}
          alt="publicacion"
          className="publicacion-post"
        />
        <div className="post-creator">
          <div className="container-info-creator">
            <Link
              to={`/profile/${post.usuario_creador.id}`}
              className="info-user-creator"
            >
              <img
                src={
                  post.usuario_creador.avatar
                    ? `${VITE_URL_API_IMG}/${post.usuario_creador.avatar}`
                    : "/assets/icons/profile-placeholder.svg"
                }
                alt="profile"
              />
              <div className="user-creator">
                <p className="creator-name">{post.usuario_creador.name}</p>
                <p className="date-post">{formattedDate} - Bogota</p>
              </div>
            </Link>
            {user.id === post.usuario_creador.id ? (
              <div className="actions-post">
                <Link to={`/update-post/${post.id}`} className="icon">
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <button variant="ghost" className="icon">
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="info-post">
            <p>{post.descripcion}</p>
          </div>
        </div>
      </div>
      <div className="add-comment">
        <img
          src={
            post.usuario_creador.avatar
              ? `${VITE_URL_API_IMG}/${post.usuario_creador.avatar}`
              : "/assets/icons/profile-placeholder.svg"
          }
          alt="profile"
        />
        <form onSubmit={handleCommentSubmit} className="form-comment">
          <input
            type="text"
            value={comment}
            className="input-comment"
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit" className="button-comment">
            <img
              src="/assets/icons/chat.svg"
              alt="profile"
            />
          </button>
        </form>
      </div>
      <CommentsPost comments={commentsPost} />
    </div>
  );
};

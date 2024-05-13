import { format } from "date-fns";
const { VITE_URL_API_IMG } = import.meta.env;
import { Link } from "react-router-dom";
import "./Module.scss";

export const PostCard = ({ post }) => {
  const formattedDate = format(
    new Date(post.created_at),
    "MMM d, yyyy 'at' hh:mm a"
  );

  return (
    <div className="container-card">
      <div className="user-create-post">
        <img
          src={
            post.usuario_creador.avatar
              ? `${VITE_URL_API_IMG}/${post.usuario_creador.avatar}`
              : "/assets/icons/profile-placeholder.svg"
          }
          alt="profile"
        />
        <div className="info-post">
          <p className="user-post">{post.usuario_creador.name}</p>
          <p className="date-post">{formattedDate} - Bogota</p>
        </div>
      </div>
      <div className="description-post">
        <p>{post.descripcion}</p>
      </div>
      <Link to={`/posts/${post.id}`}>
        <img
          className="img-post-home"
          src={`${VITE_URL_API_IMG}/${post.publicacion}`}
          alt=""
        />
      </Link>
    </div>
  );
};

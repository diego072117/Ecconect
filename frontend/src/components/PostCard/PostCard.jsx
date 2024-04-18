import { format } from "date-fns";
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
          src="/assets/icons/profile-placeholder.svg"
          alt="profile"
          className="h-14 w-14 rounded-full"
        />
        <div className="info-post">
          <p className="user-post">{post.usuario_creador.name}</p>
          <p className="date-post">{formattedDate} - Bogota</p>
        </div>
      </div>
      <div className="description-post">
        <p>{post.descripcion}</p>
      </div>
      <img
        className="img-post-home"
        src={`http://127.0.0.1:8000/storage/${post.publicacion}`}
        alt=""
      />
    </div>
  );
};

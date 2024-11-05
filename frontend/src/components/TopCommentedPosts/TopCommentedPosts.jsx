const { VITE_URL_API_IMG } = import.meta.env;

export const TopCommentedPosts = ({ comment }) => {
  return (
    <div className="card-user-top">
      <div className="content-user-top">
        <img
          src={
            comment.publicacion
              ? `${VITE_URL_API_IMG}/${comment.publicacion}`
              : "/assets/icons/profile-placeholder.svg"
          }
          alt="profile"
        />
        <div className="info-user-top">
          <p>
            <span>Name</span> - {comment.usuario_creador.name}
          </p>
          <p>
            <span>UserName</span> - @{comment.usuario_creador.username}
          </p>
          <p>
            <span>Email</span> - {comment.usuario_creador.email}
          </p>
          <p>
            <span>Phone</span> - {comment.usuario_creador.telefono}
          </p>
        </div>
      </div>
      <div className="count-posts-user">
        <h4>Comments</h4>
        <p>{comment.comments_count}</p>
      </div>
    </div>
  );
};

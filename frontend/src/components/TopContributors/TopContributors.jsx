const { VITE_URL_API_IMG } = import.meta.env;

export const TopContributors = ({ user }) => {
  return (
    <div key={user.id} className="card-user-top">
      <div className="content-user-top">
        <img
          src={
            user.avatar
              ? `${VITE_URL_API_IMG}/${user.avatar}`
              : "/assets/icons/profile-placeholder.svg"
          }
          alt="profile"
        />
        <div className="info-user-top">
          <p>
            <span>Name</span> - {user.name}
          </p>
          <p>
            <span>UserName</span> - @{user.username}
          </p>
          <p>
            <span>Email</span> - {user.email}
          </p>
          <p>
            <span>Phone</span> - {user.telefono}
          </p>
        </div>
      </div>
      <div className="count-posts-user">
        <h4>Posts</h4>
        <p>{user.posts_count}</p>
      </div>
    </div>
  );
};

import { useEffect } from "react";
import { usePostActions } from "../../hooks/usePostActions";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/Loader";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";
import { Link } from "react-router-dom";

export const PostByUser = ({ userId }) => {
  const { listPostsByUser } = usePostActions();
  const { postsByUser, status } = useSelector((state) => state.posts);

  useEffect(() => {
    listPostsByUser(userId);
  }, [userId]);

  if (!postsByUser.posts || status === 'loading') return <Loader />;

  return (
    <div className="post-user-container">
      {postsByUser.posts.map((post) => (
        <Link
          key={post.id}
          className="post-user"
          to={`/posts/${post.id}`} 
          style={{
            backgroundImage: `url(${VITE_URL_API_IMG}/${post.publicacion})`,
          }}
        ></Link>
      ))}
    </div>
  );
};

import { useEffect } from "react";
import "./Module.scss";
import { usePostActions } from "../../hooks/usePostActions";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/Loader";

export const PostByUser = ({ userId }) => {
  const { listPostsByUser } = usePostActions();
  const { postsByUser } = useSelector((state) => state.posts);

  useEffect(() => {
    listPostsByUser(userId);
  }, []);

  console.log(postsByUser.posts);

  if (!postsByUser.posts) return <Loader />;

  return (
    <div className="post-user-container">
      {postsByUser.posts.map((post) => (
        <div
          key={post.id}
          className="post-user"
          style={{
            backgroundImage: `url(http://127.0.0.1:8000/storage/${post.publicacion})`,
          }}
        ></div>
      ))}
    </div>
  );
};

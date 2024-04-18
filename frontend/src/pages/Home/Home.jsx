import { useSelector } from "react-redux";
import { usePostActions } from "../../hooks/usePostActions";
import { useEffect } from "react";
import { PostCard } from "../../components/PostCard/PostCard";
import { Loader } from "../../shared/Loader";
import "./Module.scss";

export const Home = () => {
  const { posts } = useSelector((state) => state.posts.posts);
  const { listPosts } = usePostActions();

  useEffect(() => {
    listPosts();
  }, []);

  return (
    <div className="container-post">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="">Home Feed</h2>
          {!posts ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <div className="cards-post">
              {posts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

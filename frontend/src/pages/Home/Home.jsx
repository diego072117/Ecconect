import { useSelector } from "react-redux";
import { usePostActions } from "../../hooks/usePostActions";
import { useEffect } from "react";
import "./Module.scss"

export const Home = () => {
  const {posts} = useSelector((state) => state.posts);
  const { listPosts } = usePostActions();

  useEffect(() => {
    listPosts();
  }, []);

  return(
    <div className="dashboard">
      soy el home
    </div>
  );
};

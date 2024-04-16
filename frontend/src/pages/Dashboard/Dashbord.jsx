import { useSelector } from "react-redux";
import { usePostActions } from "../../hooks/usePostActions";
import { useEffect } from "react";
import "./Module.scss"

export const Dashboard = () => {
  const {posts} = useSelector((state) => state.posts);
  const { listPosts } = usePostActions();
  console.log(posts);

  useEffect(() => {
    listPosts();
  }, []);

  return(
    <div className="dashboard">
      soy el dashboard
    </div>
  );
};

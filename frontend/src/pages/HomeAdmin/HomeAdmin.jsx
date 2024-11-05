import { useEffect } from "react";
import { UseUserActions } from "../../hooks/UseUserActions";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/Loader";
import { TopContributors } from "../../components/TopContributors/TopContributors";
import { usePostActions } from "../../hooks/usePostActions";
import { TopCommentedPosts } from "../../components/TopCommentedPosts/TopCommentedPosts";
import "./Module.scss";

export const HomeAdmin = () => {
  const { getTopUserPosts } = UseUserActions();
  const { topCommentedPosts } = usePostActions();
  const { topUsersPosts, status } = useSelector((state) => state.users);
  const { mostCommentedPosts } = useSelector((state) => state.posts);

  useEffect(() => {
    getTopUserPosts();
    topCommentedPosts();
  }, []);

  console.log(mostCommentedPosts);

  if (status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  return (
    <div className="container-home-admin">
      <div className="title-home-admin">
        <h1>Welcome</h1>
      </div>
      <div className="content-home-admin">
        <div className="top-users-posts">
          <h1>Top Contributors</h1>
          {topUsersPosts.map((user) => (
            <TopContributors key={user.id} user={user} />
          ))}
        </div>
        <div className="top-users-posts">
          <h1>Popular Posts</h1>
          {mostCommentedPosts.map((comment) => (
            <TopCommentedPosts key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

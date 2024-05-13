import { useParams } from "react-router-dom";
import { usePostActions } from "../../hooks/usePostActions";
import { FormPost } from "../../components/FormPost/FormPost";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Loader } from "../../shared/Loader";

export const UpdatePost = () => {
  const { id } = useParams();
  const { postsById } = usePostActions();
  const { postById: post, status } = useSelector((state) => state.posts);

  useEffect(() => {
    postsById(id);
  }, [id]);

  if (!post || status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  return (
    <div className="container-create">
      <div className="create">
        <div className="title-create">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2>Edit Post</h2>
        </div>
        <FormPost action="Update" post={post} />
      </div>
    </div>
  );
};

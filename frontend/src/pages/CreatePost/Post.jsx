import { FormPost } from "../../components/FormPost/FormPost";
import "./Module.scss";

export const Post = () => {
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
          <h2>Create Post</h2>
        </div>
        <FormPost />
      </div>
    </div>
  );
};

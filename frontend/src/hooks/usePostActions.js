import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPostAsync } from "../store/posts/slice";

export const usePostActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createPost = (postData) => {
    dispatch(createPostAsync(postData));
  };

  return { createPost };
};

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPostAsync,
  getAllPostAsync,
  getPostById,
  getPostByUserId,
} from "../store/posts/slice";

export const usePostActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createPost = async (postData) => {
    return dispatch(createPostAsync(postData));
  };

  const listPosts = () => {
    dispatch(getAllPostAsync());
  };

  const listPostsByUser = (id) => {
    dispatch(getPostByUserId(id));
  };

  const listPostsById = (id) => {
    dispatch(getPostById(id));
  };

  return { createPost, listPosts, listPostsByUser, listPostsById };
};
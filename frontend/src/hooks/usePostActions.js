import { useDispatch } from "react-redux";
import {
  createPostAsync,
  getAllPostAsync,
  getCommetsPost,
  getPostById,
  getPostByUserId,
  getSearchPostAsync,
  saveCommentAsync,
  updatePostAsync,
} from "../store/posts/slice";

export const usePostActions = () => {
  const dispatch = useDispatch();

  const createPost = async (postData) => {
    return dispatch(createPostAsync(postData));
  };

  const listPosts = () => {
    dispatch(getAllPostAsync());
  };

  const listPostsByUser = (id) => {
    dispatch(getPostByUserId(id));
  };

  const postsById = async (id) => {
    return dispatch(getPostById(id));
  };

  const updatePost = async (postData) => {
    return dispatch(updatePostAsync(postData));
  };

  const commetPost = async (id) => {
    return dispatch(getCommetsPost(id));
  };

  const saveComment = async (commentData) => {
    return dispatch(saveCommentAsync(commentData));
  };

  const searchPosts = (searchProperty) => {
    dispatch(getSearchPostAsync(searchProperty));
  };

  return {
    createPost,
    listPosts,
    listPostsByUser,
    postsById,
    updatePost,
    commetPost,
    saveComment,
    searchPosts,
  };
};

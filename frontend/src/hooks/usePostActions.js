import { useDispatch } from "react-redux";
import {
  createPostAsync,
  finishPostAsync,
  getAllPostAsync,
  getCommetsPost,
  getPostById,
  getPostByUserId,
  getSearchPostAsync,
  saveCommentAsync,
  updatePostAsync,
} from "../store/posts/slice";
import Swal from "sweetalert2";

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

  const postsById = (id) => {
    dispatch(getPostById(id));
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

  const finishPost = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      dispatch(finishPostAsync(id));
    }
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
    finishPost,
    searchPosts,
  };
};

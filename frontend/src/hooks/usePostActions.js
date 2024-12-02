import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  createPostAsync,
  deletePostByIdAsync,
  getAllPostAdminAsync,
  getAllPostAsync,
  getCommetsPost,
  getPostById,
  getPostByUserId,
  getSearchPostAsync,
  getTopCommetsPostAsync,
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

  const listPostsAdmin = () => {    
    dispatch(getAllPostAdminAsync());
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

  const deletePostById = async (postId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      return dispatch(deletePostByIdAsync(postId));
    }
  };

  const searchPosts = (searchProperty) => {
    dispatch(getSearchPostAsync(searchProperty));
  };

  const topCommentedPosts = async () => {
    dispatch(getTopCommetsPostAsync());
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
    topCommentedPosts,
    deletePostById,
    listPostsAdmin
  };
};

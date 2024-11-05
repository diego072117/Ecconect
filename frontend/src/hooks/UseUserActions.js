import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  banUserByIdAsync,
  getAllUsersAsync,
  getTopUserPostsAsync,
  getUserByIdAsync,
  loginUserAsync,
  logout,
  registerUserAsync,
  updateUserAsync,
} from "../store/users/slice";
import { useNavigate } from "react-router-dom";

export const UseUserActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const NewUser = async (userData) => {
    return dispatch(registerUserAsync(userData));
  };

  const userbyId = async (id) => {
    dispatch(getUserByIdAsync(id));
  };

  const allUsers = () => {
    dispatch(getAllUsersAsync());
  };

  const LoginUser = (userData) => {
    dispatch(loginUserAsync(userData));
  };

  const updateUser = async (userData) => {
    return dispatch(updateUserAsync(userData));
  };

  const getTopUserPosts = async () => {
    dispatch(getTopUserPostsAsync());
  };

  const banUserById = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, banear",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      return dispatch(banUserByIdAsync(id));
    }
  };
  const LogoutUser = () => {
    dispatch(logout());
    navigate("/login-user");
  };

  return {
    NewUser,
    userbyId,
    allUsers,
    LoginUser,
    LogoutUser,
    updateUser,
    getTopUserPosts,
    banUserById,
  };
};

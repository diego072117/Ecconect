import { useDispatch } from "react-redux";
import {
  getAllUsersAsync,
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

  const NewUser = (userData) => {
    dispatch(registerUserAsync(userData));
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

  const LogoutUser = () => {
    dispatch(logout());
    navigate("/login-user");
  };

  return { NewUser, userbyId, allUsers, LoginUser, LogoutUser, updateUser };
};

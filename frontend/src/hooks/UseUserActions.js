import { useDispatch } from "react-redux";
import {
  loginUserAsync,
  logout,
  registerUserAsync,
} from "../store/users/slice";
import { useNavigate } from "react-router-dom";

export const UseUserActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const NewUser = (userData) => {
    dispatch(registerUserAsync(userData));
  };

  const LoginUser = (userData) => {
    dispatch(loginUserAsync(userData));
  };

  const LogoutUser = () => {
    dispatch(logout());
    navigate("/login-user");
  };

  return { NewUser, LoginUser, LogoutUser };
};

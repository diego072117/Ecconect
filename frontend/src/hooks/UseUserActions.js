import { useDispatch } from "react-redux";
import {
  registerUserAsync,
} from "../store/users/slice";

export const UseUserActions = () => {
  const dispatch = useDispatch();

  const NewUser = (userData) => {
    dispatch(registerUserAsync(userData));
  };

  return { NewUser};
};

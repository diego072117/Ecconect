import { useDispatch } from "react-redux";
import {
  followesAsync,
  getFollowingsAsync,
} from "../store/followes/slice";

export const useFollowersActions  = () => {
  const dispatch = useDispatch();

  const followUser = async (followerData) => {
    return dispatch(followesAsync(followerData));
  };

  const getFollowings  = (user_id) => {
    dispatch(getFollowingsAsync(user_id));
  };

  return {
    followUser,
    getFollowings ,
  };
};

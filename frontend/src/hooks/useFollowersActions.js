import { useDispatch } from "react-redux";
import {
  followesAsync,
  getFollowingsUserAuthAsync,
  getFollowingsUserProfileAsync,
} from "../store/followes/slice";

export const useFollowersActions = () => {
  const dispatch = useDispatch();

  const followUser = async (followerData) => {
    return dispatch(followesAsync(followerData));
  };

  const getFollowingsUserProfile = (user_id) => {
    dispatch(getFollowingsUserProfileAsync(user_id));
  };

  const getFollowingsUserAuth = (user_id) => {
    dispatch(getFollowingsUserAuthAsync(user_id));
  };

  return {
    followUser,
    getFollowingsUserProfile,
    getFollowingsUserAuth,
  };
};

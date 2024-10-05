import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  followings: [],
  isFollowing: null,
  status: "idle",
  error: null,
  mensaje: null,
};

const { VITE_URL_API } = import.meta.env;

export const followesAsync = createAsyncThunk(
  "followes/followUser",
  async (followerData) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Follower/SaveFollower`,
        followerData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getFollowingsAsync = createAsyncThunk(
  "followes/getFollowingsAsync",
  async (user_id) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Follower/Followings/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const checkIfFollowingAsync = createAsyncThunk(
  "followes/checkIfFollowingAsync",
  async ({ follower_id, followed_id }) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Follower/CheckFollowing/${follower_id}/${followed_id}`
      );
      return response.data.is_following;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const followersSlice = createSlice({
  name: "followes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(followesAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(followesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.opopop");
      })
      .addCase(getFollowingsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFollowingsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followings = action.payload;
      })
      .addCase(getFollowingsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(checkIfFollowingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkIfFollowingAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isFollowing = action.payload;
      })
      .addCase(checkIfFollowingAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default followersSlice.reducer;

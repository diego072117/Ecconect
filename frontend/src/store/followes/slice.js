import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  followingsUserProfile: [],
  followingsUserAuth: [],
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

export const getFollowingsUserProfileAsync = createAsyncThunk(
  "followes/getFollowingsUserProfile",
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

export const getFollowingsUserAuthAsync = createAsyncThunk(
  "followes/getFollowingsUserAuth",
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
      .addCase(getFollowingsUserProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFollowingsUserProfileAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followingsUserProfile = action.payload;
      })
      .addCase(getFollowingsUserProfileAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getFollowingsUserAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFollowingsUserAuthAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.followingsUserAuth = action.payload;
      })
      .addCase(getFollowingsUserAuthAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default followersSlice.reducer;

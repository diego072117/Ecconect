import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axios from "axios";

const initialState = {
  posts: [],
  postById: null,
  status: "idle",
  error: null,
  mensaje: null,
};

export const createPostAsync = createAsyncThunk(
  "post/createPost",
  async (postData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/Posts/CreatePost",
        postData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getAllPostAsync = createAsyncThunk(
  "post/getAllPost",
  async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/Posts/GetPosts"
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPostAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success('Successfully!')
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.")
      })
      .addCase(getAllPostAsync.pending, (state,) => {
        state.status = "loading";
      })
      .addCase(getAllPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getAllPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
  },
});

export default postsSlice.reducer;

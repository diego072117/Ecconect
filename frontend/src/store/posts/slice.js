import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
        console.log('exitoo');
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log('paila');
      })
      
  },
});

export default postsSlice.reducer;

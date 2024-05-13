import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  posts: [],
  postsByUser: [],
  postById: null,
  status: "idle",
  error: null,
  mensaje: null,
};

const { VITE_URL_API } = import.meta.env;

export const createPostAsync = createAsyncThunk(
  "post/createPost",
  async (postData) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Posts/CreatePost`,
        postData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getAllPostAsync = createAsyncThunk("post/getAllPost", async () => {
  try {
    const response = await axios.get(`${VITE_URL_API}/Posts/GetPosts`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getPostByUserId = createAsyncThunk(
  "post/getPostByUserId",
  async (id) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Posts/PostByUser/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getPostById = createAsyncThunk("post/getPostById", async (id) => {
  try {
    const response = await axios.get(`${VITE_URL_API}/Posts/GetPostById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updatePostAsync = createAsyncThunk(
  "post/updatePost",
  async (postData) => {
    const formDataObject = Object.fromEntries(postData.entries());

    console.log(formDataObject);
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Posts/UpdatePost/${postData.get("id")}`,
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
        toast.success("Successfully!");
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getAllPostAsync.pending, (state) => {
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
      .addCase(getPostByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPostByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postsByUser = action.payload;
      })
      .addCase(getPostByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postById = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatePostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePostAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updatePostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

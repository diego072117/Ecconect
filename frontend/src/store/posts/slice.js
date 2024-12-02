import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  posts: [],
  postsAdmin: [],
  searchPost: [],
  postsByUser: [],
  commentsPost: [],
  mostCommentedPosts: [],
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

export const getAllPostAdminAsync = createAsyncThunk(
  "post/getAllPostAdminAsync",
  async () => {
    try {
      const response = await axios.get(`${VITE_URL_API}/Posts/GetPostsAdmin`);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

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

export const getCommetsPost = createAsyncThunk(
  "post/getCommetsPost",
  async (id) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Posts/PostComment/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const saveCommentAsync = createAsyncThunk(
  "post/saveComment",
  async (commentData) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Posts/SaveComment/`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const finishPostAsync = createAsyncThunk(
  "post/finishPost",
  async (id) => {
    try {
      const response = await axios.put(
        `${VITE_URL_API}/Posts/FinishPost/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getSearchPostAsync = createAsyncThunk(
  "post/getSearchPostAsync",
  async (searchProperty) => {
    try {
      const response = await axios.get(`${VITE_URL_API}/Posts/SearchPosts`, {
        params: searchProperty,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getTopCommetsPostAsync = createAsyncThunk(
  "post/getTopCommetsPostAsync",
  async () => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Posts/posts/most-commented`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deletePostByIdAsync = createAsyncThunk(
  "post/deletePostById",
  async (postId) => {
    try {
      const response = await axios.delete(
        `${VITE_URL_API}/Posts/deletePost/${postId}`
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
      .addCase(getAllPostAdminAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPostAdminAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postsAdmin = action.payload;
      })
      .addCase(getAllPostAdminAsync.rejected, (state, action) => {
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
        toast.success("Successfully updated post!");
      })
      .addCase(updatePostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getCommetsPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommetsPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.commentsPost = action.payload;
      })
      .addCase(getCommetsPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(saveCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveCommentAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(saveCommentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(finishPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(finishPostAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully finish post!");
      })
      .addCase(finishPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getSearchPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSearchPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchPost = action.payload;
      })
      .addCase(getSearchPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("No se enconstrar publicaciones relacionadas.");
      })
      .addCase(getTopCommetsPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopCommetsPostAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mostCommentedPosts = action.payload;
      })
      .addCase(getTopCommetsPostAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePostByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePostByIdAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deletePostByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users/slice";
import postsSlice from "./posts/slice"

const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
  },
});

export default store; 

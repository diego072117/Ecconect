// store.js
import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users/slice";
import postsSlice from "./posts/slice"
import followersSlice from "./followes/slice"

const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    followers: followersSlice,
  },
});

export default store; 

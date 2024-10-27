// store.js
import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users/slice";
import postsSlice from "./posts/slice"
import followersSlice from "./followes/slice"
import calificationSlice from "./calification/slice"

const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    followers: followersSlice,
    califications: calificationSlice,
  },
});

export default store; 

import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Post } from "../pages/CreatePost/Post";
import { RootLayout } from "../pages/RootLayout";
import { AuthLayout } from "../pages/AuthLayout";
import { useValidators } from "../hooks/useValidators";
import { Login } from "../pages/Login/Login";
import { Toaster } from "react-hot-toast";
import { Profile } from "../pages/Profile/Profile";
import { UpdateProfile } from "../pages/UpdateProfile/UpdateProfile";
import { People } from "../pages/People/People";
import { Explore } from "../pages/Explore/Explore";
import { Saved } from "../pages/Saved/Saved";
import { PostDetails } from "../pages/PostDetails/PostDetails";
import { UpdatePost } from "../pages/UpdatePost/UpdatePost";

export const AppRouter = () => {
  const { isUserAuthenticated } = useValidators();

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login-user" element={<Login />} />
          <Route path="/register-user" element={<Register />} />
        </Route>

        {/* Private routes */}
        <Route
          element={
            isUserAuthenticated() ? (
              <RootLayout />
            ) : (
              <Navigate to="/login-user" />
            )
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<Post />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
          <Route path="/all-users" element={<People />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

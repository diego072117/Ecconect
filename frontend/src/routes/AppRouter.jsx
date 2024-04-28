import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Post } from "../pages/CreatePost/Post";
import { RootLayout } from "../pages/RootLayout";
import { AuthLayout } from "../pages/AuthLayout";
import { useValidators } from "../hooks/useValidators";
import { Login } from "../pages/Login/Login";
import { Toaster } from "react-hot-toast";

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
            isUserAuthenticated() ? <RootLayout /> : <Navigate to="/login-user" />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<Post />} />
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

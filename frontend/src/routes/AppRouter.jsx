import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Post } from "../pages/CreatePost/Post";
import { RootLayout } from "../pages/RootLayout";
import { AuthLayout } from "../pages/AuthLayout";
import { useValidators } from "../hooks/useValidators";
import { Login } from "../pages/Login/Login";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export const AppRouter = () => {
  const { isUserAuthenticated } = useValidators();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (isUserAuthenticated()) {
  //     navigate("/");
  //   }
  // }, [isUserAuthenticated, navigate]);

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
            isUserAuthenticated() ? <RootLayout /> : <div>NO ACCESO</div>
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

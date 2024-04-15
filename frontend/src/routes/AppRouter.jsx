import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Dashboard } from "../pages/Dashboard/Dashbord";
import { Login } from "../pages/Login/Login";
import { Post } from "../pages/CreatePost/Post";
import { RootLayout } from "../pages/RootLayout";
import { AuthLayout } from "../pages/AuthLayout";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register-user" element={<Register />} />
          <Route path="/login-user" element={<Login />} />
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<Post />} />
        </Route>
      </Routes>
    </>
  );
};

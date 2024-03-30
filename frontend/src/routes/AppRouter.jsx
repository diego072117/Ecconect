import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { Dashboard } from "../pages/Dashboard/Dashbord";
import { Nav } from "../components/Nav/Nav";
import { useValidators } from "../hooks/useValidators";
import { Login } from "../pages/Login/Login";

export const AppRouter = () => {
  const { isUserAuthenticated } = useValidators();
  return (
    <>
      {isUserAuthenticated() && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro-usuario" element={<Register />} />
        <Route path="/login-usuario" element={<Login />} />
        <Route path="/dashboard" element={
          isUserAuthenticated() ? <Dashboard /> : <>error pa</> 
        } />
      </Routes>
    </>
  );
};

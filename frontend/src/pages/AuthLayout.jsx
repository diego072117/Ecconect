import { Navigate, Outlet } from "react-router-dom";
import { useValidators } from "../hooks/useValidators";

export const AuthLayout = () => {
  const { isUserAuthenticated } = useValidators();
  return (
    <>
      {isUserAuthenticated() ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          {/* <img
            src="./assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block w-1/2 object-cover bg-no-repeat "
          /> */}
        </>
      )}
    </>
  );
};

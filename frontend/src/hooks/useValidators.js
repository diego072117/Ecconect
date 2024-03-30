import { useSelector } from "react-redux";

export const useValidators = () => {
  const isAuthenticated = useSelector((state) => state.users.auth.access_token);

  const isUserAuthenticated = () => {
    return isAuthenticated ? true : false;
  };

  return {
    isUserAuthenticated,
  };
};

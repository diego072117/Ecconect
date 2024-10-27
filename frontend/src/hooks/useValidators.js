import { useSelector } from "react-redux";

export const useValidators = () => {
  const isAuthenticated = useSelector((state) => state.users.auth.access_token);
  const { user } = useSelector((state) => state.users.auth);
  const { postById } = useSelector((state) => state.posts);

  const isUserAuthenticated = () => {
    return isAuthenticated ? true : false;
  };

  const isPostCreator = () => {
    return postById.usuario_creador.id === user.id;
  };

  const isPostActive = () => {
    return postById.state === "activo";
  };

  return {
    isUserAuthenticated,
    isPostCreator,
    isPostActive,
  };
};

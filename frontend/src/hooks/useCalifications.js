import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  createCalificationAsync,
  donatedUserRatingAsync,
  getAllCalificationsAsync,
  getAllCalificationsByUserAsync,
} from "../store/calification/slice";
import { finishPostAsync } from "../store/posts/slice";

export const useCalificationActions = () => {
  const dispatch = useDispatch();

  const calificationPost = async (calificationData) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, finalizar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      // Primer dispatch para crear la calificación y esperar su resultado
      const createResult = await dispatch(
        createCalificationAsync(calificationData)
      ).unwrap();

      await dispatch(finishPostAsync(calificationData.id_post)).unwrap();

      // Retorna el resultado para manejarlo en el componente
      return createResult;
    }
  };

  const listCalificationsByUser = async (user_id) => {
    return dispatch(getAllCalificationsByUserAsync(user_id));
  };

  const donatedUserRating = async (infoCalification) => {
    return dispatch(donatedUserRatingAsync(infoCalification));
  };

  const listCalifications = async () => {
    return dispatch(getAllCalificationsAsync());
  };

  return {
    calificationPost,
    listCalificationsByUser,
    donatedUserRating,
    listCalifications,
  };
};

import { useDispatch } from "react-redux";
import { chatGptResponseAsync, resetResponse } from "../store/gpt/slice";

export const useGptActions = () => {
  const dispatch = useDispatch();

  const environmentalAdvisor = async (content) => {
    return dispatch(chatGptResponseAsync(content));
  };

  const resetDataGpt = () => {
    dispatch(resetResponse());
  };

  return {
    environmentalAdvisor,
    resetDataGpt,
  };
};

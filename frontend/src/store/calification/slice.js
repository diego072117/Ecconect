import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  mensaje: null,
};

const { VITE_URL_API } = import.meta.env;

export const createCalificationAsync = createAsyncThunk(
  "calification/createCalification",
  async (calificationData) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Calification/SaveCalification`,
        calificationData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const calificationSlice = createSlice({
  name: "calification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCalificationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCalificationAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(createCalificationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      });
  },
});

export default calificationSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  calificationsUser: [],
  califications:[],
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

export const getAllCalificationsByUserAsync = createAsyncThunk(
  "calification/getAllCalificationsByUserAsync",
  async (user_id) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Calification/GetCalificationsByUsuarioDonado/${user_id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const donatedUserRatingAsync = createAsyncThunk(
  "calification/calificationPost",
  async (infoCalification) => {
    try {
      const response = await axios.put(
        `${VITE_URL_API}/Calification/UpdateCalification/${infoCalification.id}`,
        infoCalification
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getAllCalificationsAsync = createAsyncThunk(
  "calification/getAllCalifications",
  async () => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Calification/GetAllCalification`
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
      })
      .addCase(getAllCalificationsByUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCalificationsByUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.calificationsUser = action.payload;
      })
      .addCase(getAllCalificationsByUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(donatedUserRatingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(donatedUserRatingAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(donatedUserRatingAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getAllCalificationsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCalificationsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.califications = action.payload;
      })
      .addCase(getAllCalificationsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      });
  },
});

export default calificationSlice.reducer;

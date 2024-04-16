import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// Función para obtener la información de autenticación desde el Local Storage
const authLocal = () => {
  const authJSON = localStorage.getItem("auth");
  return authJSON ? JSON.parse(authJSON) : { access_token: false, user: null };
};

// Inicializa el estado usando la función authLocal
const initialState = {
  auth: authLocal(),
  status: "idle",
  error: null,
};

export const registerUserAsync = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/Users/CreateUser",
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "users/loginUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/Users/Login",
        userData
      );
      const authData = {
        access_token: response.data.access_token,
        user: response.data.user,
      };
      localStorage.setItem("auth", JSON.stringify(authData));
      return authData; // Devuelve el objeto con el token y el usuario
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = { access_token: false, user: null };
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUserAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth = action.payload;
        toast.success("Successfully!");
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;

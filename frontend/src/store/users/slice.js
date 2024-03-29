import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
        console.log('exito pa');
        // Swal.fire({
        //   icon: "success",
        //   title: "Registro exitoso",
        //   text: "El usuario se ha registrado exitosamente.",
        // }).then(() => {
        //   window.location.href = "/login";
        // });
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log('error');
        // Swal.fire({
        //   icon: "error",
        //   title: "Error",
        //   text: "Error al registrar el usuario.",
        // });
      })
    
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;

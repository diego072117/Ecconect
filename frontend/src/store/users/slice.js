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
  userById: null,
  users: [],
  topUsersPosts: [],
  status: "idle",
  error: null,
};

const { VITE_URL_API } = import.meta.env;

export const registerUserAsync = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Users/CreateUser`,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getUserByIdAsync = createAsyncThunk(
  "users/getrUserById",
  async (id) => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Users/GetUserById/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getAllUsersAsync = createAsyncThunk(
  "users/getAllUsers",
  async () => {
    try {
      const response = await axios.get(`${VITE_URL_API}/Users/GeAlltUsers`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "users/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Users/Login`,
        userData
      );

      if (response.data.user.isBan) {
        return rejectWithValue(
          "Your account is banned. Please contact econnect@econnect.com.co"
        );
      }
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

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (userData, { getState }) => {
    try {
      const response = await axios.post(
        `${VITE_URL_API}/Users/UpdateUser/${userData.get("id")}`,
        userData
      );

      const updatedUserData = response.data;

      // Actualizar localStorage con los nuevos datos del usuario
      const { access_token } = getState().users.auth;

      const authData = {
        access_token: access_token,
        user: updatedUserData,
      };

      localStorage.setItem("auth", JSON.stringify(authData));

      return updatedUserData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getTopUserPostsAsync = createAsyncThunk(
  "users/getTopUserPostsAsync",
  async () => {
    try {
      const response = await axios.get(
        `${VITE_URL_API}/Users/users/top-posters`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const banUserByIdAsync = createAsyncThunk(
  "users/banUserByIdAsync",
  async (id) => {
    try {
      const response = await axios.put(`${VITE_URL_API}/Users/ToggleBan/${id}`);
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
        toast.success("Successfully!");
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getUserByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserByIdAsync.fulfilled, (state, acrion) => {
        state.status = "succeeded";
        state.userById = acrion.payload;
      })
      .addCase(getUserByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // toast.error("This didn't work");
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsersAsync.fulfilled, (state, acrion) => {
        state.status = "succeeded";
        state.users = acrion.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // toast.error("This didn't work.");
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

        if (action.payload) {
          toast.error(action.payload);
        } else {
          toast.error("This didn't work.");
        }
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.auth.user = action.payload;
        toast.success("Successfully!");
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      })
      .addCase(getTopUserPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTopUserPostsAsync.fulfilled, (state, acrion) => {
        state.status = "succeeded";
        state.topUsersPosts = acrion.payload;
      })
      .addCase(getTopUserPostsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // toast.error("This didn't work.");
      })
      .addCase(banUserByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(banUserByIdAsync.fulfilled, (state) => {
        state.status = "succeeded";
        toast.success("Successfully!");
      })
      .addCase(banUserByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error("This didn't work.");
      });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;

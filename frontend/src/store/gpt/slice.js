import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  responseGpt: null,
  status: "idle",
  error: null,
  mensaje: null,
};

const { VITE_CHAT_GPT_API_URL, VITE_API_KEY } = import.meta.env;

export const chatGptResponseAsync = createAsyncThunk(
  "gpt/chatGptResponseAsync",
  async (content) => {
    try {
      const response = await axios.post(
        VITE_CHAT_GPT_API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Eres un asistente especializado en ser un consejero ambiental. Tu única función es responder preguntas relacionadas con la reutilización de objetos, ideas creativas para reciclar, la donación de objetos en buen estado y consejos prácticos para reducir el desperdicio y cuidar el medio ambiente. No tienes permitido responder preguntas fuera de estos temas. Si alguien te pregunta algo que no esté relacionado con el medio ambiente o la reutilización, responde cortésmente que no puedes ayudar con ese tema, pero anímales a preguntar algo relacionado con la sostenibilidad o el reciclaje. Tus respuestas deben ser claras, amables, inspiradoras, y siempre incluir emojis para hacer la experiencia más entretenida y amigable.",
            },
            {
              role: "user",
              content: content,
            },
          ],
          temperature: 0.5,
          max_tokens: 1024,
        },
        {
          headers: {
            Authorization: VITE_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Devolver los datos de la respuesta
    } catch (error) {
      throw new Error(error.response?.data?.error?.message || error.message);
    }
  }
);

const gptSlice = createSlice({
  name: "gpt",
  initialState,
  reducers: {
    resetResponse: (state) => {
      state.responseGpt = null; // Reinicia el valor de responseGpt
      state.status = "idle"; // También puede resetear el estado si lo necesitas
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chatGptResponseAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(chatGptResponseAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responseGpt = action.payload.choices[0].message.content;
      })
      .addCase(chatGptResponseAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetResponse } = gptSlice.actions; 
export default gptSlice.reducer;

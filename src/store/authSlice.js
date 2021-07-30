import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_URL, SIGNUP_URL } from "../api";
import { LOGIN_FORM_MODES } from "../components/LoginForm";

const initialState = {
  user: null,
  loading: false,
  success: false,
  error: null,
};

export const logUserIn = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password, formMode }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        formMode === LOGIN_FORM_MODES.SIGNUP ? SIGNUP_URL : LOGIN_URL,
        {
          email,
          password,
          returnSecurePayload: true,
        }
      );
      return data;
    } catch (err) {
      if (!err.response) console.log(err.message);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => ({
      ...initialState,
    }),
  },
  extraReducers: {
    [logUserIn.pending]: (state) => {
      state.loading = true;
      console.log("PENDING =>", state.user);
    },
    [logUserIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      localStorage.setItem("token", action.payload.idToken);
    },
    [logUserIn.rejected]: (state, action) => {
      state.error = action.payload.error.message;
      state.loading = false;
    },
  },
});

export const authSelector = (state) => state.auth;

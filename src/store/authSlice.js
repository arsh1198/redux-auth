import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_URL, SIGNUP_URL } from "../api";
import { LOGIN_FORM_MODES } from "../components/LoginForm";

const initialState = {
  user: null,
  loading: true,
  success: false,
  error: null,
};

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
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

export const tryLocalSignIn = createAsyncThunk(
  "auth/tryLocalSignIn",
  async () => {
    console.log("chla");
    let userInfo;
    if (localStorage.getItem("user-info"))
      userInfo = JSON.parse(localStorage.getItem("user-info"));

    console.log("FROM_LOCAL_SIGNIN =>", userInfo);
    if (userInfo.idToken) return userInfo;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
    },
    logOut: () => {
      if (localStorage.getItem("user-info"))
        localStorage.removeItem("user-info");
      return { ...initialState, loading: false };
    },
  },
  extraReducers: {
    [authenticateUser.pending]: (state) => {
      state.loading = true;
      console.log("PENDING =>", state.user);
    },
    [authenticateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      localStorage.setItem("user-info", JSON.stringify(action.payload));
    },
    [authenticateUser.rejected]: (state, action) => {
      state.error = action.payload.error.message;
      state.loading = false;
    },
    [tryLocalSignIn.pending]: (state) => {
      state.loading = true;
    },
    [tryLocalSignIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [tryLocalSignIn.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const authSelector = (state) => state.auth;

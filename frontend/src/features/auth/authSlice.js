import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isSending: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//Register USER
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout USER
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

//Login USER
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset(state) {
      state.isSending = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: {
    [register.pending]: (state) => {
      state.isSending = true;
    },
    [register.fulfilled]: (state, action) => {
      state.isSending = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.isSending = false;
      state.isError = true;
      state.isSuccess = false;
      state.user = null;
      state.message = action.payload;
    },
    [logout.fulfilled]: (state) => {
      state.user = null;
    },
    [login.pending]: (state) => {
      state.isSending = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isSending = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isSending = false;
      state.isError = true;
      state.isSuccess = false;
      state.user = null;
      state.message = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;

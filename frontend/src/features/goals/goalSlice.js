import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const postGoal = createAsyncThunk(
  "goals/post",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.addGoal(goalData, token);
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

export const getGoal = createAsyncThunk("goals/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.getAllGoals(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.removeGoal(id, token);
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

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset(state) {
      state.goals = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: {
    [postGoal.pending]: (state) => {
      state.isLoading = true;
    },
    [postGoal.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals.push(action.payload);
    },
    [postGoal.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [getGoal.pending]: (state) => {
      state.isLoading = true;
    },
    [getGoal.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = action.payload;
    },
    [getGoal.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [deleteGoal.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteGoal.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = state.goals.filter(
        (item) => item._id !== action.payload.id
      );
    },
    [deleteGoal.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const goalActions = goalSlice.actions;

export default goalSlice;

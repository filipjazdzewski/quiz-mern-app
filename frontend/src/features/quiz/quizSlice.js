import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import quizService from './quizService';
import { extractErrorMessage } from '../../utils';

const initialState = {
  quizzes: [],
  quiz: null,
  isLoading: false,
};

// Get all quizzes
export const getQuizzes = createAsyncThunk(
  'quizzes/getAll',
  async (_, thunkAPI) => {
    try {
      return await quizService.getQuizzes();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Create a quiz
export const createQuiz = createAsyncThunk(
  'quizzes/create',
  async (quizData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quizService.createQuiz(quizData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuizzes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.quizzes = action.payload;
        state.isLoading = false;
      })
      .addCase(getQuizzes.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default quizSlice.reducer;

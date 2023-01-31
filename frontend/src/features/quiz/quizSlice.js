import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import quizService from './quizService';
import { extractErrorMessage } from '../../utils';

const initialState = {
  quizzes: [],
  quiz: {},
  isLoading: false,
};

// Get Quizzes
export const getQuizzes = createAsyncThunk(
  'quizzes/getMany',
  async (searchParam, thunkAPI) => {
    try {
      return await quizService.getQuizzes(searchParam);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Get a quiz
export const getQuiz = createAsyncThunk(
  'quizzes/get',
  async (quizId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quizService.getQuiz(quizId, token);
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

// Delete a quiz
export const deleteQuiz = createAsyncThunk(
  'quizzes/delete',
  async (quizId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quizService.deleteQuiz(quizId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Update a quiz
export const updateQuiz = createAsyncThunk(
  'quizzes/update',
  async (quizId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quizService.updateQuiz(quizId, token);
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
      })
      .addCase(getQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.isLoading = false;
      })
      .addCase(getQuiz.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        const deletedQuiz = action.payload;
        state.quiz = state.quiz._id === deletedQuiz._id ? {} : state.quiz;
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz._id !== deletedQuiz._id
        );
        state.isLoading = false;
      })
      .addCase(deleteQuiz.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.quizzes = state.quizzes.map((quiz) =>
          quiz._id === state.quiz._id ? state.quiz : quiz
        );
        state.isLoading = false;
      })
      .addCase(updateQuiz.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default quizSlice.reducer;

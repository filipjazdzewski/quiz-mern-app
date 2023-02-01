import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionService from './questionService';
import { extractErrorMessage } from '../../utils';

const initialState = {
  questions: [],
  question: {},
};

// Create a question
export const createQuestion = createAsyncThunk(
  'questions/create',
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.createQuestion(questionData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Delete a question
export const deleteQuestion = createAsyncThunk(
  'questions/delete',
  async ({ questionId, quizId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await questionService.deleteQuestion(questionId, quizId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    getQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      const deletedQuestion = action.payload;
      state.questions = state.questions.filter(
        (question) => question._id !== deletedQuestion._id
      );
    });
  },
});

export const { getQuestions } = questionSlice.actions;

export default questionSlice.reducer;

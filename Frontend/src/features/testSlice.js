import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'active' | 'finished'
  questions: [],
  userAnswers: {},
  currentQuestionIndex: 0,
  score: 0,
  totalQuestions: 0,
};

export const fetchQuestions = createAsyncThunk(
  'test/fetchQuestions',
  async () => {
    const response = await axios.get('http://localhost:4000/api/test/start');
    return response.data;
  }
);

export const submitTest = createAsyncThunk(
  'test/submitTest',
  async (userAnswers) => {
    const response = await axios.post('http://localhost:4000/api/test/submit', userAnswers);
    return response.data;
  }
);

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const { questionId, selectedOption } = action.payload;
      state.userAnswers[questionId] = selectedOption;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex++;
      }
    },
    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
      }
    },
    resetTest: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'active';
        state.questions = action.payload;
        state.totalQuestions = action.payload.length;
      })
      .addCase(submitTest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitTest.fulfilled, (state, action) => {
        state.status = 'finished';
        state.score = action.payload.score;
      });
  },
});

export const { answerQuestion, nextQuestion, prevQuestion, resetTest } = testSlice.actions;

export default testSlice.reducer;

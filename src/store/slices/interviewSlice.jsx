import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interviews: [],
  loading: false,
  error: null
};

export const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    addInterview: (state, action) => {
      const interview = {
        ...action.payload,
        date: new Date(action.payload.date).toISOString()
      };
      state.interviews.push(interview);
    },
    updateInterview: (state, action) => {
      const index = state.interviews.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        const interview = {
          ...action.payload,
          date: new Date(action.payload.date).toISOString()
        };
        state.interviews[index] = interview;
      }
    },
    deleteInterview: (state, action) => {
      state.interviews = state.interviews.filter(i => i.id !== action.payload);
    }
  }
});

export const { addInterview, updateInterview, deleteInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
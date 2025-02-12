import { configureStore } from '@reduxjs/toolkit';
import interviewReducer from './slices/interviewSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    interviews: interviewReducer,
    notifications: notificationReducer
  }
});
import { configureStore } from "@reduxjs/toolkit";
// import todosReducer from "./todoSlice";
import eventReducer from './eventSlice';

export const store = configureStore({
  //reducer: todosReducer,
  reducer: eventReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
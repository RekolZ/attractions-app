import { configureStore } from "@reduxjs/toolkit";
import attractionsReducer from "./attractionsSlice";

export const store = configureStore({
  reducer: {
    attractions: attractionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

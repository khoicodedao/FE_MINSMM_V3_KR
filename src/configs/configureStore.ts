import { configureStore } from "@reduxjs/toolkit";
import appSlice from "pages/App/store/appSlice";

export const store = configureStore({
  reducer: {
    appSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

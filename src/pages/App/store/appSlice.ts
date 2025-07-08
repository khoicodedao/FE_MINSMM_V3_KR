import { createSlice } from "@reduxjs/toolkit";
import { CheckToken } from "utils/user";

interface AppState {
  isLogged: boolean;
  account: {
    id?: number;
    username?: string;
    role?: number;
    key?: string;
    token?: string;
    email?: string;
    balance?: string;
  };
  logging: boolean;
}

const initialState: AppState = {
  account: {},
  isLogged: CheckToken(),
  logging: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action) => {
      state.logging = false;
      state.isLogged = true;
      state.account = action.payload;
    },
    logout: (state) => {
      state.isLogged = false;
      state.account = {};
      state.logging = false;
    },
  },
});

export const getAccountLoggedIn = (state: any) => state.appSlice.account;
export const getIsLoggedIn = (state: any) => state.appSlice.isLogged;

export const { login, logout } = appSlice.actions;
export default appSlice.reducer;

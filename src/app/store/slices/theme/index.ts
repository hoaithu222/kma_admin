import { initialState, Theme, ThemeState } from "./types";
import { AppReducerType } from "../../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createResettableSlice } from "../../create-resettabable-slice";

const { slice, reducer } = createResettableSlice({
  name: AppReducerType.THEME,
  initialState: initialState,
  reducers: {
    setTheme: (state: ThemeState, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state: ThemeState) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
  persist: {
    whitelist: ["theme"],
  },
});

export const {
  setTheme,
  toggleTheme,
  resetState: resetThemeState,
} = slice.actions;
export default reducer;

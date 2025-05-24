import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { initialStateType } from "./home.types";

const selectHome = (state: RootState) => state.home as initialStateType;

export const selectPosts = createSelector([selectHome], (state) => state.posts);
export const selectStatus = createSelector(
  [selectHome],
  (state) => state.status
);
export const selectFilter = createSelector(
  [selectHome],
  (state) => state.filter
);
export const selectCategory = createSelector(
  [selectHome],
  (state) => state.category
);

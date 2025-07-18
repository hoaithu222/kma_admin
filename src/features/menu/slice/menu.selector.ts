import { RootState } from "@/app/store";
import { initialState as initialStateType } from "./menu.types";
import { createSelector } from "@reduxjs/toolkit";

export const selectMenu = (state: RootState) => state.menu as initialStateType;

export const selectMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.menuCategories
);

export const selectStatusGetMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.statusGetMenu
);

export const selectErrorSelector = createSelector(
  [selectMenu],
  (menu) => menu.error
);

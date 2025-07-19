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

export const selectIsAddMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.isAddMenu
);

export const selectIsEditMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.isEditMenu
);

export const selectMenuEditSelector = createSelector(
  [selectMenu],
  (menu) => menu.menuEdit
);

export const selectStatusAddMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.statusAddMenu
);

export const selectStatusEditMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.statusEditMenu
);

export const selectErrorAddMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.errorAddMenu
);

export const selectErrorEditMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.errorEditMenu
);

export const selectIsDeleteMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.isDeleteMenu
);

export const selectStatusDeleteMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.statusDeleteMenu
);

export const selectErrorDeleteMenuSelector = createSelector(
  [selectMenu],
  (menu) => menu.errorDeleteMenu
);

export const selectIdMenuDeleteSelector = createSelector(
  [selectMenu],
  (menu) => menu.idMenuDelete
);

export const selectIdMenuEditSelector = createSelector(
  [selectMenu],
  (menu) => menu.idMenuEdit
);

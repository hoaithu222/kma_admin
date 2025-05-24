import { RootState } from "@/app/store";
import { initialStateType } from "./subcategory.type";
import { createSelector } from "@reduxjs/toolkit";

const selectSubcategory = (state: RootState) =>
  state.subcategory as initialStateType;

export const selectSubcategories = createSelector(
  [selectSubcategory],
  (state) => state.subcategories
);

export const isAddSubcategorySelector = createSelector(
  [selectSubcategory],
  (state) => state.isAddSubcategory
);

export const isEditSubcategory = createSelector(
  [selectSubcategory],
  (state) => state.isEditSubcategory
);

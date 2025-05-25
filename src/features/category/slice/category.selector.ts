import { RootState } from "@/app/store";
import { initialStateType } from "./category.type";
import { createSelector } from "@reduxjs/toolkit";

const selectCategory = (state: RootState) => state.category as initialStateType;

export const selectCategories = createSelector(
  [selectCategory],
  (state) => state.categories
);

export const isAddCategorySelector = createSelector(
  [selectCategory],
  (state) => state.isAddCategory
);

export const isEditCategorySelector = createSelector(
  [selectCategory],
  (state) => state.isEditCategory
);

export const isConfirmDeleteCategorySelector = createSelector(
  [selectCategory],
  (state) => state.confirmDeleteCategory
);

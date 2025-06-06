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
export const isDeleteSubcategory = createSelector(
  [selectSubcategory],
  (state) => state.isDeleteSubcategory
);
export const isLoadingSubcategory = createSelector(
  [selectSubcategory],
  (state) => state.isLoading
);
export const isErrorSubcategory = createSelector(
  [selectSubcategory],
  (state) => state.error
);
export const isEditSubcategorySelector = createSelector(
  [selectSubcategory],
  (state) => state.isEditSubcategory
);
export const isDeleteSubcategorySelector = createSelector(
  [selectSubcategory],
  (state) => state.isDeleteSubcategory
);
export const idDeleteSelector = createSelector(
  [selectSubcategory],
  (state) => state.idDelete
);

export const subCategoriesWithCategoryIdSelector = createSelector(
  [selectSubcategory],
  (state) => state.subCategoriesWithCategoryId
);
export const isLoadingSubcategoriesWithCategoryId = createSelector(
  [selectSubcategory],
  (state) => state.isLoading
);
export const errorSubcategoriesWithCategoryId = createSelector(
  [selectSubcategory],
  (state) => state.error
);

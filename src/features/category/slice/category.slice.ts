import {
  IRequestCreateCategory,
  IRequestUpdateCategory,
} from "@/core/api/category/types";
import { initialStateType } from "./category.type";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: initialStateType = {
  categories: [],
  isAddCategory: false,
  isEditCategory: false,
  isDeleteCategory: false,
  isViewCategory: false,
  isSearchCategory: false,
  isFilterCategory: false,
  isSortCategory: false,
  confirmDeleteCategory: false,
  isLoading: false,
  error: null,
};

const { slice, reducer } = createResettableSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state) => {
      state.isLoading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.categories = action.payload;

      state.isLoading = false;
    },
    getCategoriesError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setIsAddCategory: (state, action) => {
      state.isAddCategory = action.payload;
    },
    setIsEditCategory: (state, action) => {
      state.isEditCategory = action.payload;
    },
    setIsDeleteCategory: (state, action) => {
      state.isDeleteCategory = action.payload;
    },
    setIsViewCategory: (state, action) => {
      state.isViewCategory = action.payload;
    },
    setIsSearchCategory: (state, action) => {
      state.isSearchCategory = action.payload;
    },
    setIsFilterCategory: (state, action) => {
      state.isFilterCategory = action.payload;
    },
    setIsSortCategory: (state, action) => {
      state.isSortCategory = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addCategoryRequest: (
      state,
      _action: PayloadAction<IRequestCreateCategory>
    ) => {
      state.isAddCategory = true;
    },
    addCategorySuccess: (state, action) => {
      state.categories.push(action.payload);
      state.isAddCategory = false;
    },
    addCategoryError: (state, action) => {
      state.isAddCategory = false;
      state.error = action.payload;
    },
    editCategoryRequest: (
      state,
      _action: PayloadAction<IRequestUpdateCategory>
    ) => {
      state.isEditCategory = true;
    },
    editCategorySuccess: (state, action) => {
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
      state.isEditCategory = false;
    },
    editCategoryError: (state, action) => {
      state.isEditCategory = false;
      state.error = action.payload;
    },
    deleteCategoryRequest: (state, _action: PayloadAction<string>) => {
      state.isDeleteCategory = true;
    },
    deleteCategorySuccess: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.id
      );
      state.isDeleteCategory = false;
    },
    deleteCategoryError: (state, action) => {
      state.isDeleteCategory = false;
      state.error = action.payload;
    },
    setConfirmDeleteCategory: (state, action) => {
      state.confirmDeleteCategory = action.payload;
    },
  },
});

export const {
  getCategories,
  getCategoriesSuccess,
  getCategoriesError,
  setIsAddCategory,
  setIsEditCategory,
  setIsDeleteCategory,
  setIsViewCategory,
  setIsSearchCategory,
  setIsFilterCategory,
  setIsSortCategory,
  setError,
  addCategoryRequest,
  addCategorySuccess,
  addCategoryError,
  editCategoryRequest,
  editCategorySuccess,
  editCategoryError,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryError,
  setConfirmDeleteCategory,
} = slice.actions;
export default reducer;

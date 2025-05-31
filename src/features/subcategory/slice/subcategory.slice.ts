import { initialStateType } from "./subcategory.type";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IRequestAddSubcategory,
  IRequestEditSubcategory,
} from "@/core/api/subcategory/types";

const initialState: initialStateType = {
  subcategories: [],
  isAddSubcategory: false,
  isEditSubcategory: false,
  isDeleteSubcategory: false,
  isViewSubcategory: false,
  isSearchSubcategory: false,
  isFilterSubcategory: false,
  isSortSubcategory: false,
  idDelete: null,
  isLoading: false,
  error: null,
};

const { slice, reducer } = createResettableSlice({
  name: "category",
  initialState,
  reducers: {
    setIdDelete: (state, action) => {
      state.idDelete = action.payload;
    },
    getAllSubcategories: (state) => {
      state.isLoading = true;
    },
    getAllSubcategoriesSuccess: (state, action) => {
      state.subcategories = action.payload;
      state.isLoading = false;
    },
    getAllSubcategoriesError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSubcategories: (state) => {
      state.isLoading = true;
    },
    getSubcategoriesSuccess: (state, action) => {
      state.subcategories = action.payload;
      state.isLoading = false;
    },
    getSubcategoriesError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setIsAddSubcategory: (state, action) => {
      state.isAddSubcategory = action.payload;
    },
    setIsEditSubcategory: (state, action) => {
      state.isEditSubcategory = action.payload;
    },
    setIsDeleteSubcategory: (state, action) => {
      state.isDeleteSubcategory = action.payload;
    },
    setIsViewSubcategory: (state, action) => {
      state.isViewSubcategory = action.payload;
    },
    setIsSearchSubcategory: (state, action) => {
      state.isSearchSubcategory = action.payload;
    },
    setIsFilterSubcategory: (state, action) => {
      state.isFilterSubcategory = action.payload;
    },
    setIsSortSubcategory: (state, action) => {
      state.isSortSubcategory = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addSubcategory: (state, _action: PayloadAction<IRequestAddSubcategory>) => {
      state.isAddSubcategory = true;
    },
    addSubcategorySuccess: (state, action) => {
      console.log("action.payload:", action.payload);
      state.subcategories.push(action.payload);
      state.isAddSubcategory = false;
    },
    addSubcategoryError: (state, action) => {
      state.isAddSubcategory = false;
      state.error = action.payload;
    },
    editSubcategory: (
      state,
      _action: PayloadAction<IRequestEditSubcategory>
    ) => {
      state.isEditSubcategory = true;
    },
    editSubcategorySuccess: (state, action) => {
      state.subcategories = state.subcategories.map((subcategory) =>
        subcategory.id === action.payload.id ? action.payload : subcategory
      );
      state.isEditSubcategory = false;
    },
    editSubcategoryError: (state, action) => {
      state.isEditSubcategory = false;
      state.error = action.payload;
    },
    deleteSubcategory: (state, _action: PayloadAction<string>) => {
      state.isDeleteSubcategory = true;
    },
    deleteSubcategorySuccess: (state, _action) => {
      state.subcategories = state.subcategories.filter(
        (subcategory) => subcategory.id !== state.idDelete
      );
      state.isDeleteSubcategory = false;
    },
    deleteSubcategoryError: (state, action) => {
      state.isDeleteSubcategory = false;
      state.error = action.payload;
    },
  },
  persist: {
    whitelist: ["subcategories"],
  },
});

export const {
  setIdDelete,
  getSubcategories,
  getSubcategoriesSuccess,
  getSubcategoriesError,
  getAllSubcategories,
  getAllSubcategoriesSuccess,
  getAllSubcategoriesError,
  setIsAddSubcategory,
  setIsEditSubcategory,
  setIsDeleteSubcategory,
  setIsViewSubcategory,
  setIsSearchSubcategory,
  setIsFilterSubcategory,
  setIsSortSubcategory,
  setError,
  addSubcategory,
  addSubcategorySuccess,
  addSubcategoryError,
  editSubcategory,
  editSubcategorySuccess,
  editSubcategoryError,
  deleteSubcategory,
  deleteSubcategorySuccess,
  deleteSubcategoryError,
} = slice.actions;
export default reducer;

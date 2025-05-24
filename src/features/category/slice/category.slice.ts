import { initialStateType } from "./category.type";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";

const initialState: initialStateType = {
  categories: [],
  isAddCategory: false,
  isEditCategory: false,
  isDeleteCategory: false,
  isViewCategory: false,
  isSearchCategory: false,
  isFilterCategory: false,
  isSortCategory: false,
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
    addCategory: (state) => {
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
    editCategory: (state) => {
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
  addCategory,
  addCategorySuccess,
  addCategoryError,
} = slice.actions;
export default reducer;

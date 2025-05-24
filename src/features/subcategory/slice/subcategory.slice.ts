import { initialStateType } from "./subcategory.type";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";

const initialState: initialStateType = {
  subcategories: [],
  isAddSubcategory: false,
  isEditSubcategory: false,
  isDeleteSubcategory: false,
  isViewSubcategory: false,
  isSearchSubcategory: false,
  isFilterSubcategory: false,
  isSortSubcategory: false,
  isLoading: false,
  error: null,
};

const { slice, reducer } = createResettableSlice({
  name: "category",
  initialState,
  reducers: {
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
    addSubcategory: (state) => {
      state.isAddSubcategory = true;
    },
    addSubcategorySuccess: (state, action) => {
      state.subcategories.push(action.payload);
      state.isAddSubcategory = false;
    },
    addSubcategoryError: (state, action) => {
      state.isAddSubcategory = false;
      state.error = action.payload;
    },
    editSubcategory: (state) => {
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
  },
});

export const {
  getSubcategories,
  getSubcategoriesSuccess,
  getSubcategoriesError,
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
} = slice.actions;
export default reducer;

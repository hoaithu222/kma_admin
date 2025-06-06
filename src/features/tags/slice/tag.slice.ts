import { initialStateType } from "./tag.type";

import { PayloadAction } from "@reduxjs/toolkit";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { IRequestAddTag } from "@/core/api/tags/types";
import { IRequestDeleteTag, IRequestGetTag } from "@/core/api/tags/types";
import { IRequestUpdateTag } from "@/core/api/tags/types";
const initialState: initialStateType = {
  tags: [],
  isAddTag: false,
  isEditTag: false,
  isDeleteTag: false,
  isViewTag: false,
  isSearchTag: false,
  isFilterTag: false,
  isSortTag: false,
  idDelete: null,
  isLoading: false,
  error: "",
};
const { slice, reducer } = createResettableSlice({
  name: "tag",
  initialState,
  reducers: {
    setIsAddTag: (state, action) => {
      state.isAddTag = action.payload;
    },
    setIsEditTag: (state, action) => {
      state.isEditTag = action.payload;
    },
    setIsDeleteTag: (state, action) => {
      state.isDeleteTag = action.payload;
    },
    setIsViewTag: (state, action) => {
      state.isViewTag = action.payload;
    },
    setIsSearchTag: (state, action) => {
      state.isSearchTag = action.payload;
    },
    setIsFilterTag: (state, action) => {
      state.isFilterTag = action.payload;
    },
    setIsSortTag: (state, action) => {
      state.isSortTag = action.payload;
    },

    setIdDelete: (state, action) => {
      state.idDelete = action.payload;
    },
    getAllTags: (state) => {
      state.isLoading = true;
    },
    getAllTagsSuccess: (state, action) => {
      state.tags = action.payload;
      state.isLoading = false;
    },
    getAllTagsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getTags: (state, _action: PayloadAction<number>) => {
      state.isLoading = true;
    },
    getTagsSuccess: (state, action) => {
      state.tags = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addTagSlice: (state, _action: PayloadAction<IRequestAddTag>) => {
      state.isAddTag = true;
    },
    addTagSuccess: (state, action) => {
      state.tags.push(action.payload);
      state.isAddTag = false;
    },
    addTagError: (state, action) => {
      state.isAddTag = false;
      state.error = action.payload;
    },
    editTagSlice: (state, _action: PayloadAction<IRequestUpdateTag>) => {
      state.isEditTag = true;
    },
    editTagSuccess: (state, action) => {
      state.tags = state.tags.map((tag) =>
        tag.id === action.payload.id ? action.payload : tag
      );
      state.isEditTag = false;
    },
    editTagError: (state, action) => {
      state.isEditTag = false;
      state.error = action.payload;
    },
    deleteTag: (state, _action: PayloadAction<IRequestDeleteTag>) => {
      state.isDeleteTag = true;
    },
    deleteTagSuccess: (state, _action) => {
      state.tags = state.tags.filter((tag) => tag.id !== state.idDelete);
      state.isDeleteTag = false;
    },
    deleteTagError: (state, _action) => {
      state.isDeleteTag = false;
    },
    getTagRequest: (state, _action: PayloadAction<IRequestGetTag>) => {
      state.isViewTag = true;
    },
    getTagSuccess: (state, action) => {
      state.tags = action.payload;
      state.isViewTag = false;
    },
    getTagError: (state, _action) => {
      state.isViewTag = false;
    },
  },
});

export const {
  setIsAddTag,
  setIsEditTag,
  setIsDeleteTag,
  setIsViewTag,
  setIsSearchTag,
  setIsFilterTag,
  setIsSortTag,

  setIdDelete,
  getAllTags,
  getAllTagsSuccess,
  getAllTagsError,
  getTags,
  getTagsSuccess,
  setError,
  addTagSlice,
  addTagSuccess,
  addTagError,
  editTagSlice,
  editTagSuccess,
  editTagError,
  deleteTag,
  deleteTagSuccess,
  deleteTagError,
  getTagRequest,
  getTagSuccess,
  getTagError,
} = slice.actions;

export default reducer;

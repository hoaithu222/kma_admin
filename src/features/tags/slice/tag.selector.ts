import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

interface TagState {
  tags: any[];
  isAddTag: boolean;
  isEditTag: boolean;
  isDeleteTag: boolean;
  isViewTag: boolean;
  isSearchTag: boolean;
  isFilterTag: boolean;
  isSortTag: boolean;
  error: string | null;
  isLoading: boolean;
  idDelete: number | null;
  tag: any;
}

const tagSelector = (state: RootState) => state.tag as TagState;

export const selectTags = createSelector(tagSelector, (state) => state.tags);
export const selectIsAddTag = createSelector(
  [tagSelector],
  (state) => state.isAddTag
);
export const selectIsEditTag = createSelector(
  [tagSelector],
  (state) => state.isEditTag
);

export const selectIsDeleteTag = createSelector(
  [tagSelector],
  (state) => state.isDeleteTag
);

export const selectIsViewTag = createSelector(
  [tagSelector],
  (state) => state.isViewTag
);
export const selectIsSearchTag = createSelector(
  [tagSelector],
  (state) => state.isSearchTag
);
export const selectIsFilterTag = createSelector(
  [tagSelector],
  (state) => state.isFilterTag
);
export const selectIsSortTag = createSelector(
  [tagSelector],
  (state) => state.isSortTag
);
export const selectError = createSelector(
  [tagSelector],
  (state) => state.error
);
export const selectIsLoading = createSelector(
  [tagSelector],
  (state) => state.isLoading
);
export const selectIdDelete = createSelector(
  [tagSelector],
  (state) => state.idDelete
);
export const selectTag = createSelector([tagSelector], (state) => state.tag);

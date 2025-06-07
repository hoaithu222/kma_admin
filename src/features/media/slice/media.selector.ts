import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";
import { initialStateType } from "./media.type";

const mediaSelector = (state: RootState) => state.media as initialStateType;

export const selectMedia = createSelector(
  mediaSelector,
  (state) => state.media
);
export const selectIsDeleteMedia = createSelector(
  [mediaSelector],
  (state) => state.isDeleteMedia
);
export const selectIdDeleteMedia = createSelector(
  [mediaSelector],
  (state) => state.idDeleteMedia
);
export const selectStatusGetMedia = createSelector(
  [mediaSelector],
  (state) => state.statusGetMedia
);

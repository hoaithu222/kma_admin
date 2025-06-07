import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";
import { initialStateType } from "./submajor.types";

const submajorSelector = (state: RootState) =>
  state.submajor as initialStateType;

export const selectSubmajors = createSelector(
  [submajorSelector],
  (state) => state.submajorData
);

export const selectIsAddSubmajor = createSelector(
  [submajorSelector],
  (state) => state.isAddSubmajor
);

export const selectIsEditSubmajor = createSelector(
  [submajorSelector],
  (state) => state.isEditSubmajor
);

export const selectIsDeleteSubmajor = createSelector(
  [submajorSelector],
  (state) => state.isDeleteSubmajor
);

export const selectStatusAddSubmajor = createSelector(
  [submajorSelector],
  (state) => state.statusAddSubmajor
);

export const selectStatusEditSubmajor = createSelector(
  [submajorSelector],
  (state) => state.statusEditSubmajor
);

export const selectStatusDeleteSubmajor = createSelector(
  [submajorSelector],
  (state) => state.statusDeleteSubmajor
);

export const selectStatusGetSubmajor = createSelector(
  [submajorSelector],
  (state) => state.statusGetSubmajor
);

export const selectIdDeleteSubmajor = createSelector(
  [submajorSelector],
  (state) => state.idDelete
);

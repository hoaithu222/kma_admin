import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";
import { initialStateType } from "./major.types";

const majorSelector = (state: RootState) => state.major as initialStateType;

export const selectMajors = createSelector(
  [majorSelector],
  (state) => state.majorData
);

export const selectIsAddMajor = createSelector(
  [majorSelector],
  (state) => state.isAddMajor
);
export const selectIsEditMajor = createSelector(
  [majorSelector],
  (state) => state.isEditMajor
);
export const selectIsDeleteMajor = createSelector(
  [majorSelector],
  (state) => state.isDeleteMajor
);

export const selectStatusAddMajor = createSelector(
  [majorSelector],
  (state) => state.statusAddMajor
);
export const selectStatusEditMajor = createSelector(
  [majorSelector],
  (state) => state.statusEditMajor
);
export const selectStatusDeleteMajor = createSelector(
  [majorSelector],
  (state) => state.statusDeleteMajor
);
export const selectStatusGetMajor = createSelector(
  [majorSelector],
  (state) => state.statusGetMajor
);
export const selectIdDelete = createSelector(
  [majorSelector],
  (state) => state.idDelete
);

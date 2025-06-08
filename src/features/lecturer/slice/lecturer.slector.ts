import { RootState } from "@/app/store";
import { initialStateLecturer } from "./lecturer.types";
import { createSelector } from "@reduxjs/toolkit";

const lecturerSelector = (state: RootState) =>
  state.lecturer as initialStateLecturer;

export const selectLecturers = createSelector(
  [lecturerSelector],
  (state) => state.lecturer
);
export const selectIsAddLecturer = createSelector(
  [lecturerSelector],
  (state) => state.isAddLecturer
);
export const selectIsEditLecturer = createSelector(
  [lecturerSelector],
  (state) => state.isEditLecturer
);
export const selectIsDeleteLecturer = createSelector(
  [lecturerSelector],
  (state) => state.isDeleteLecturer
);
export const selectIdDeleteLecturer = createSelector(
  [lecturerSelector],
  (state) => state.idDeleteLecturer
);
export const selectStatusGetLecturer = createSelector(
  [lecturerSelector],
  (state) => state.statusGetLecturer
);
export const selectStatusAddLecturer = createSelector(
  [lecturerSelector],
  (state) => state.statusAddLecturer
);
export const selectStatusEditLecturer = createSelector(
  [lecturerSelector],
  (state) => state.statusEditLecturer
);
export const selectStatusDeleteLecturer = createSelector(
  [lecturerSelector],
  (state) => state.statusDeleteLecturer
);

import { RootState } from "@/app/store";
import { IUserState } from "./user.types";
import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state: RootState) => state.user as IUserState;

export const selectUsers = createSelector([selectUser], (state) => state.users);

export const selectIdUpdate = createSelector(
  [selectUser],
  (state) => state.idUpdate
);

export const selectIdDelete = createSelector(
  [selectUser],
  (state) => state.idDelete
);

export const selectIsAddUser = createSelector(
  [selectUser],
  (state) => state.isAddUser
);

export const selectIsUpdateUser = createSelector(
  [selectUser],
  (state) => state.isUpdateUser
);

export const selectIsDeleteUser = createSelector(
  [selectUser],
  (state) => state.isDeleteUser
);

export const selectIsGetUser = createSelector(
  [selectUser],
  (state) => state.isGetUser
);

export const selectEditUser = createSelector(
  [selectUser],
  (state) => state.editUser
);

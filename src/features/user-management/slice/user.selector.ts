import { RootState } from "@/app/store";
import { IUserState } from "./user.types";
import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state: RootState) => state.user as IUserState;

export const selectUsers = createSelector([selectUser], (state) => state.users);

export const selectIsAddUser = createSelector(
  [selectUser],
  (state) => state.isAddUser
);

export const selectIsUpdateUser = createSelector(
  [selectUser],
  (state) => state.isUpdateUser
);

export const selectIdDeleteUser = createSelector(
  [selectUser],
  (state) => state.isDeleteUser
);
export const selectUserEdit = createSelector(
  [selectUser],
  (state) => state.editUser
);

export const selectIdGetUser = createSelector(
  [selectUser],
  (state) => state.isGetUser
);

export const selectIdUpdate = createSelector(
  [selectUser],
  (state) => state.idUpdate
);

export const selectIdDelete = createSelector(
  [selectUser],
  (state) => state.idDelete
);

export const selectIsModalAddUser = createSelector(
  [selectUser],
  (state) => state.isModalAddUser
);

export const selectIsModalUpdateUser = createSelector(
  [selectUser],
  (state) => state.isModalUpdateUser
);

export const selectIsModalDeleteUser = createSelector(
  [selectUser],
  (state) => state.isModalDeleteUser
);

export const selectEditUser = createSelector(
  [selectUser],
  (state) => state.editUser
);
export const selectIsGetUser = createSelector(
  [selectUser],
  (state) => state.isGetUser
);

export const selectIsDeleteUser = createSelector(
  [selectUser],
  (state) => state.isDeleteUser
);

export const selectDeleteUser = createSelector(
  [selectUser],
  (state) => state.deleteUser
);

import { RootState } from "@/app/store";
import { IUserState } from "./user.types";
import { createSelector } from "@reduxjs/toolkit";
import { ReduxStateType } from "@/app/store/types";

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
// lây trạng thái thành công
export const selectStatusAdd = createSelector(
  [selectUser],
  (state) => state.statusAdd === ReduxStateType.SUCCESS
);

export const selectStatusUpdate = createSelector(
  [selectUser],
  (state) => state.statusUpdate === ReduxStateType.SUCCESS
);
export const selectStatusDelete = createSelector(
  [selectUser],
  (state) => state.statusDelete === ReduxStateType.SUCCESS
);

export const selectIsLockUser = createSelector(
  [selectUser],
  (state) => state.isLockUser
);

export const selectLockUser = createSelector(
  [selectUser],
  (state) => state.lockUser
);

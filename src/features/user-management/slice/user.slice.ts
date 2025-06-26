import { IUserState } from "./user.types";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { IUser } from "@/features/auth/slice/auth.types";
import { PayloadAction } from "@reduxjs/toolkit";
import { IRegister, IRequestGetList } from "@/core/api/auth/types";
import { ReduxStateType } from "@/app/store/types";

const initialState: IUserState = {
  users: [],
  isAddUser: false,
  isUpdateUser: false,
  isDeleteUser: false,
  isGetUser: false,
  idUpdate: 0,
  idDelete: 0,
  editUser: null,
  statusAdd: ReduxStateType.INIT,
  statusUpdate: ReduxStateType.INIT,
  statusDelete: ReduxStateType.INIT,
};

const { slice, reducer } = createResettableSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAddUser: (state, action: PayloadAction<boolean>) => {
      state.isAddUser = action.payload;
    },
    setIsUpdateUser: (state, action: PayloadAction<boolean>) => {
      state.isUpdateUser = action.payload;
    },
    setIsDeleteUser: (state, action: PayloadAction<boolean>) => {
      state.isDeleteUser = action.payload;
    },
    setIsGetUser: (state, action: PayloadAction<boolean>) => {
      state.isGetUser = action.payload;
    },
    // thêm user
    addUserRequest: (state, _action: PayloadAction<IRegister>) => {
      state.isAddUser = true;
      state.statusAdd = ReduxStateType.LOADING;
    },
    addUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
      state.isAddUser = false;
      state.statusAdd = ReduxStateType.SUCCESS;
    },
    addUserFailed: (state, _action: PayloadAction<IUser>) => {
      state.isAddUser = false;
      state.statusAdd = ReduxStateType.ERROR;
    },
    // sửa user

    updateUserRequest: (
      state,
      action: PayloadAction<{
        id: string;
        username?: string;
        active?: boolean;
        fullName?: string;
      }>
    ) => {
      state.idUpdate = Number(action.payload.id);
      state.statusUpdate = ReduxStateType.LOADING;
    },
    updateUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.map((user) => {
        if (user.id === state.idUpdate.toString()) {
          return action.payload;
        }
        return user;
      });
      state.statusUpdate = ReduxStateType.SUCCESS;
    },
    updateUserFailed: (state, _action: PayloadAction<any>) => {
      state.isUpdateUser = false;
      state.statusUpdate = ReduxStateType.ERROR;
    },
    // xóa user
    deleteUserRequest: (state, action: PayloadAction<number>) => {
      state.idDelete = action.payload;
      state.statusDelete = ReduxStateType.LOADING;
    },
    deleteUserSuccess: (state, _action: PayloadAction<IUser>) => {
      state.users = state.users.filter(
        (user) => user.id !== state.idDelete.toString()
      );
      state.idDelete = 0; // Reset idDelete after successful deletion
      state.statusDelete = ReduxStateType.SUCCESS;
    },
    deleteUserFailed: (state, _action: PayloadAction<any>) => {
      state.idDelete = 0; // Reset idDelete on failure
      state.statusDelete = ReduxStateType.ERROR;
    },
    // lấy user
    getUserRequest: (state, _action: PayloadAction<IRequestGetList>) => {
      state.isGetUser = true;
    },
    getUserSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.isGetUser = false;
      state.users = action.payload;
    },
    getUserFailed: (state, _action: PayloadAction<IUser>) => {
      state.isGetUser = false;
    },
    // update id
    updateIdUpdate: (state, action: PayloadAction<number>) => {
      state.idUpdate = action.payload;
    },
    updateDeleteId: (state, action: PayloadAction<number>) => {
      state.idDelete = action.payload;
    },
    setEditUser: (state, action: PayloadAction<IUser>) => {
      state.editUser = action.payload;
    },
  },
});

export const {
  setIsAddUser,
  setIsUpdateUser,
  setIsDeleteUser,
  setIsGetUser,
  addUserRequest,
  addUserSuccess,
  addUserFailed,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailed,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  updateDeleteId,
  setEditUser,
} = slice.actions;
export default reducer;

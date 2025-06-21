import { ReduxStateType } from "@/app/store/types";
import { IUserState } from "./user.types";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { IUser } from "@/features/auth/slice/auth.types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IRegister,
  IRequestGetList,
  IRequestUpdateUser,
} from "@/core/api/auth/types";

const initialState: IUserState = {
  users: [],
  isModalAddUser: false,
  isModalUpdateUser: false,
  isModalDeleteUser: false,
  editUser: null,
  isAddUser: ReduxStateType.INIT,
  isUpdateUser: ReduxStateType.INIT,
  isDeleteUser: ReduxStateType.INIT,
  isGetUser: ReduxStateType.INIT,
  idUpdate: 0,
  idDelete: 0,
  nameDelete: "",
  deleteUser: "",
};

const { slice, reducer } = createResettableSlice({
  name: "user",
  initialState,
  reducers: {
    addUserRequest: (state, _action: PayloadAction<IRegister>) => {
      state.isAddUser = ReduxStateType.LOADING;
    },
    addUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.isAddUser = ReduxStateType.SUCCESS;
      state.users.push(action.payload);
    },
    addUserFailed: (state, _action: PayloadAction<IUser>) => {
      state.isAddUser = ReduxStateType.ERROR;
    },

    updateUserRequest: (state, _action: PayloadAction<IRequestUpdateUser>) => {
      state.isUpdateUser = ReduxStateType.LOADING;
    },
    updateUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.isUpdateUser = ReduxStateType.SUCCESS;
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    updateUserFailed: (state, _action: PayloadAction<any>) => {
      state.isUpdateUser = ReduxStateType.ERROR;
    },

    deleteUserRequest: (state) => {
      state.isDeleteUser = ReduxStateType.LOADING;
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.isDeleteUser = ReduxStateType.SUCCESS;
      state.users = state.users.filter(
        (user) => user.username !== action.payload
      );
    },
    deleteUserFailed: (state, _action: PayloadAction<any>) => {
      state.isDeleteUser = ReduxStateType.ERROR;
    },
    getUserRequest: (state, _action: PayloadAction<IRequestGetList>) => {
      state.isGetUser = ReduxStateType.LOADING;
    },
    getUserSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.isGetUser = ReduxStateType.SUCCESS;
      state.users = action.payload;
    },
    getUserFailed: (state, _action: PayloadAction<IUser>) => {
      state.isGetUser = ReduxStateType.ERROR;
    },
    // update id
    updateIdUpdate: (state, action: PayloadAction<number>) => {
      state.idUpdate = action.payload;
    },
    updateDelete: (state, action: PayloadAction<number>) => {
      state.idDelete = action.payload;
    },
    updateNameDelete: (state, action: PayloadAction<string>) => {
      state.nameDelete = action.payload;
    },

    openModalAddUser: (state) => {
      state.isModalAddUser = true;
    },
    closeModalAddUser: (state) => {
      state.isModalAddUser = false;
    },
    openModalUpdateUser: (state) => {
      state.isModalUpdateUser = true;
    },
    closeModalUpdateUser: (state) => {
      state.isModalUpdateUser = false;
    },
    openModalDeleteUser: (state) => {
      state.isModalDeleteUser = true;
    },
    closeModalDeleteUser: (state) => {
      state.isModalDeleteUser = false;
    },
    updateEditUser: (state, action: PayloadAction<IUser>) => {
      state.editUser = action.payload;
    },
    updateDeleteUser: (state, action: PayloadAction<string>) => {
      state.deleteUser = action.payload;
    },
  },
});

export const {
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
  openModalAddUser,
  closeModalAddUser,
  openModalUpdateUser,
  closeModalUpdateUser,
  openModalDeleteUser,
  closeModalDeleteUser,
  getUserSuccess,
  getUserFailed,
  updateDelete,
  updateNameDelete,
  updateEditUser,
  updateDeleteUser,
} = slice.actions;
export default reducer;

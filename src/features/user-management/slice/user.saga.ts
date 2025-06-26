import {
  addUserFailed,
  addUserRequest,
  addUserSuccess,
  deleteUserFailed,
  deleteUserRequest,
  deleteUserSuccess,
  getUserFailed,
  getUserRequest,
  getUserSuccess,
  updateUserFailed,
  updateUserRequest,
  updateUserSuccess,
  setIsAddUser,
} from "./user.slice";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  deleteUser,
  getUser,
  registerRequest,
  updateUser,
} from "@/core/api/auth";
import { IRegister, IRequestGetList } from "@/core/api/auth/types";

import { toast } from "react-toastify";
function* addUserSaga(
  action: PayloadAction<IRegister>
): Generator<any, void, any> {
  try {
    const response = yield call(registerRequest, {
      username: action.payload.username,
      password: action.payload.password,
      fullName: action.payload.fullName,
      active: action.payload.active,
    });
    if (response.data.status === 200) {
      yield put(addUserSuccess(response.data.data));
      toast.success("Thêm người dùng thành công");
      yield put(setIsAddUser(false));
    } else {
      yield put(addUserFailed(response.data.message));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(addUserFailed(error));
  }
}

function* updateUserSaga(
  action: PayloadAction<{
    id: string;
    username?: string;
    fullName?: string;
    active?: boolean;
  }>
): Generator<any, void, any> {
  try {
    const response = yield call(updateUser, action.payload.id, {
      username: action.payload.username || undefined,
      fullName: action.payload.fullName || undefined,
      active: action.payload.active || undefined,
    });

    if (response.data.status === 200) {
      yield put(updateUserSuccess(response.data.data));
      toast.success("Cập nhật người dùng thành công");
    } else {
      yield put(updateUserFailed(response.data.message));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(updateUserFailed(error));
  }
}

function* deleteUserSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(deleteUser, action.payload.toString());
    if (response.data.status === 200) {
      // API delete trả về { message: string }, không có data.data
      // Tạo một object giả để match với IUser interface
      const deletedUser = { id: action.payload.toString() } as any;
      yield put(deleteUserSuccess(deletedUser));
      toast.success(response.data.message);
    } else {
      yield put(deleteUserFailed(response.data.message));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(deleteUserFailed(error));
  }
}

function* getUserSaga(
  action: PayloadAction<IRequestGetList>
): Generator<any, void, any> {
  try {
    const response = yield call(getUser, action.payload);
    if (response.data.status === 200) {
      yield put(getUserSuccess(response.data.data.content));
    } else {
      yield put(getUserFailed(response.data.message));
      toast.error(response.data.message);
    }
  } catch (error: any) {
    yield put(getUserFailed(error));
  }
}

export function* userSaga() {
  yield all([
    takeLatest(addUserRequest.type, addUserSaga),
    takeLatest(updateUserRequest.type, updateUserSaga),
    takeLatest(deleteUserRequest.type, deleteUserSaga),
    takeLatest(getUserRequest.type, getUserSaga),
  ]);
}

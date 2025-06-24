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
  setIsUpdateUser,
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

function* addUserSaga(
  action: PayloadAction<IRegister>
): Generator<any, void, any> {
  try {
    const response = yield call(registerRequest, {
      username: action.payload.username,
      password: action.payload.password,
    });
    if (response.ok) {
      yield put(addUserSuccess(response.data.data));
      // Refresh user list after adding
      yield put(getUserRequest({ active: true, page: 0, size: 10 }));
      // Đóng modal sau khi thành công
      yield put(setIsAddUser(false));
    } else {
      yield put(addUserFailed(response.error));
    }
  } catch (error: any) {
    yield put(addUserFailed(error));
  }
}

function* updateUserSaga(
  action: PayloadAction<{ id: string; username: string }>
): Generator<any, void, any> {
  try {
    const response = yield call(updateUser, action.payload.id, {
      username: action.payload.username,
    });
    if (response.ok) {
      yield put(updateUserSuccess(response.data.data));
      // Refresh user list after updating
      yield put(getUserRequest({ active: true, page: 0, size: 10 }));
      // Đóng modal sau khi thành công
      yield put(setIsUpdateUser(false));
    } else {
      yield put(updateUserFailed(response.error));
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
    if (response.ok) {
      // API delete trả về { message: string }, không có data.data
      // Tạo một object giả để match với IUser interface
      const deletedUser = { id: action.payload.toString() } as any;
      yield put(deleteUserSuccess(deletedUser));
      // Refresh user list after deleting
      yield put(getUserRequest({ active: true, page: 0, size: 10 }));
    } else {
      yield put(deleteUserFailed(response.error));
    }
  } catch (error: any) {
    yield put(deleteUserFailed(error));
  }
}

function* getUserSaga(
  action: PayloadAction<IRequestGetList>
): Generator<any, void, any> {
  try {
    const response = yield call(getUser, action.payload.active);
    if (response.ok) {
      yield put(getUserSuccess(response.data.data.content));
    } else {
      yield put(getUserFailed(response.error));
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

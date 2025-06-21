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
} from "./user.slice";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  deleteUser,
  getUser,
  registerRequest,
  updateUser,
} from "@/core/api/auth";
import {
  IRegister,
  IRequestGetList,
  IRequestUpdateUser,
} from "@/core/api/auth/types";
import { selectDeleteUser, selectUserEdit } from "./user.selector";
import { IUser } from "@/features/auth/slice/auth.types";

function* addUserSaga(
  action: PayloadAction<IRegister>
): Generator<any, void, any> {
  try {
    const response = yield call(registerRequest, {
      username: action.payload.username,
      password: action.payload.password,
    });
    yield put(addUserSuccess(response.data.data));
  } catch (error: any) {
    yield put(addUserFailed(error));
  }
}

function* updateUserSaga(
  action: PayloadAction<IRequestUpdateUser>
): Generator<any, void, any> {
  try {
    const userEdit: IUser = yield select(selectUserEdit);
    if (userEdit) {
      const response = yield call(
        updateUser,
        userEdit.username,
        action.payload
      );
      yield put(updateUserSuccess(response.data.data));
    }
  } catch (error: any) {
    yield put(updateUserFailed(error));
  }
}
function* deleteUserSaga(): Generator<any, void, any> {
  try {
    const userToDelete = yield select(selectDeleteUser);
    const response = yield call(deleteUser, userToDelete);
    if (response.ok) {
      yield put(deleteUserSuccess(userToDelete));
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
    yield put(getUserSuccess(response.data.data.content));
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

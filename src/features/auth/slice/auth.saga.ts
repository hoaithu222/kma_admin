import { PayloadAction } from "@reduxjs/toolkit";

import { login, logout } from "@/core/api/auth";
import {
  loginFailed,
  loginSuccess,
  loginUser,
  logoutFailed,
  logoutSuccess,
  logoutUser,
} from "./auth.slice";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IRequestLogin, IRequestLogout } from "@/core/api/auth/types";

function* loginSaga(
  action: PayloadAction<IRequestLogin>
): Generator<any, void, any> {
  try {
    const response = yield call(login, action.payload);

    if (response.ok) {
      yield put(loginSuccess(response.data.data));
    } else {
      yield put(loginFailed());
    }
  } catch (error) {
    yield put(loginFailed());
  }
}

function* logoutSaga(
  action: PayloadAction<IRequestLogout>
): Generator<any, void, any> {
  try {
    yield call(logout, action.payload);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailed());
  }
}

function* watchLogoutSaga() {
  yield takeLatest(logoutUser.type, logoutSaga);
}
function* watchLoginSaga() {
  yield takeLatest(loginUser.type, loginSaga);
}

export function* authSaga() {
  yield all([watchLoginSaga(), watchLogoutSaga()]);
}

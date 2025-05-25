import { PayloadAction } from "@reduxjs/toolkit";

import { login } from "@/core/api/auth";
import { loginFailed, loginSuccess, loginUser } from "./auth.slice";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IRequestLogin } from "@/core/api/auth/types";

function* loginSaga(
  action: PayloadAction<IRequestLogin>
): Generator<any, void, any> {
  try {
    const response = yield call(login, action.payload);
    console.log(response);
    if (response.ok) {
      yield put(loginSuccess(response.data.data));
    } else {
      yield put(loginFailed());
    }
  } catch (error) {
    yield put(loginFailed());
  }
}

function* watchLoginSaga() {
  yield takeLatest(loginUser.type, loginSaga);
}

export function* authSaga() {
  yield all([watchLoginSaga()]);
}

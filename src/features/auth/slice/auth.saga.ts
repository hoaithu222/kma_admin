import { PayloadAction } from "@reduxjs/toolkit";

import { login, logout, registerRequest } from "@/core/api/auth";
import {
  loginFailed,
  loginSuccess,
  loginUser,
  logoutFailed,
  logoutSuccess,
  logoutUser,
  register,
  registerFailed,
  registerSuccess,
} from "./auth.slice";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  IRegister,
  IRequestLogin,
  IRequestLogout,
} from "@/core/api/auth/types";
import { toast } from "react-toastify";

function* loginSaga(
  action: PayloadAction<IRequestLogin>
): Generator<any, void, any> {
  try {
    const response = yield call(login, action.payload);

    if (response.ok && response.data.status === 200) {
      yield put(loginSuccess(response.data.data));
      toast.success("Đăng nhập thành công");
    } else {
      yield put(loginFailed());
      toast.error("Đăng nhập thất bại");
    }
  } catch (error) {
    yield put(loginFailed());
    toast.error("Đăng nhập thất bại");
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
// dang ky
function* registerSaga(
  action: PayloadAction<IRegister>
): Generator<any, void, any> {
  try {
    yield call(registerRequest, action.payload);

    const response = yield call(registerRequest, action.payload);
    if (response.ok) {
      yield put(registerSuccess());
      toast.success("Đăng ký thành công");
    } else {
      yield put(registerFailed());
      toast.error("Đăng ký thất bại");
    }
  } catch (error) {
    yield put(registerFailed());
    toast.error("Đăng ký thất bại");
  }
}

function* watchRegisterSaga() {
  yield takeLatest(register.type, registerSaga);
}
function* watchLogoutSaga() {
  yield takeLatest(logoutUser.type, logoutSaga);
}
function* watchLoginSaga() {
  yield takeLatest(loginUser.type, loginSaga);
}

export function* authSaga() {
  yield all([watchLoginSaga(), watchLogoutSaga(), watchRegisterSaga()]);
}

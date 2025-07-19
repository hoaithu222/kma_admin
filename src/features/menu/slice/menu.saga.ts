import {
  createMenuApi,
  deleteMenuApi,
  getMenusApi,
  updateMenuApi,
  updateMenuOrderApi,
  updateMenuVisibilityApi,
} from "@/core/api/menu";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  addMenuError,
  addMenuSuccess,
  getMenu,
  getMenuError,
  getMenuSuccess,
  addMenu,
  editMenuError,
  editMenuSuccess,
  editMenu,
  deleteMenuError,
  deleteMenuSuccess,
  deleteMenu,
  updateMenuOrderSuccess,
  updateMenuOrderError,
  updateMenuOrder,
  updateMenuVisibilitySuccess,
  updateMenuVisibilityError,
  updateMenuVisibility,
} from "./menu.slice";
import { PayloadAction } from "@reduxjs/toolkit";

function* getMenuSaga(): Generator<any, any, any> {
  try {
    const response = yield call(getMenusApi);
    yield put(getMenuSuccess(response.data.data));
  } catch (error: any) {
    yield put(getMenuError(error.response?.data || error.message));
  }
}

function* watchGetMenuSaga() {
  yield takeEvery(getMenu, getMenuSaga);
}

function* addMenuSaga(action: PayloadAction<any>): Generator<any, any, any> {
  try {
    const response = yield call(createMenuApi, action.payload);
    // Tự động gọi lại API lấy danh sách sau khi thêm thành công
    yield call(getMenuSaga);
    yield put(addMenuSuccess(response.data.data));
  } catch (error: any) {
    yield put(addMenuError(error.response?.data || error.message));
  }
}

function* watchAddMenuSaga() {
  yield takeEvery(addMenu, addMenuSaga);
}

function* editMenuSaga(action: PayloadAction<any>): Generator<any, any, any> {
  try {
    const response = yield call(
      updateMenuApi,
      action.payload.id,
      action.payload.data
    );
    // Tự động gọi lại API lấy danh sách sau khi sửa thành công
    yield call(getMenuSaga);
    yield put(editMenuSuccess(response.data.data));
  } catch (error: any) {
    yield put(editMenuError(error.response?.data || error.message));
  }
}

function* watchEditMenuSaga() {
  yield takeEvery(editMenu, editMenuSaga);
}

function* deleteMenuSaga(
  action: PayloadAction<number>
): Generator<any, any, any> {
  try {
    const response = yield call(deleteMenuApi, action.payload);

    // Tự động gọi lại API lấy danh sách sau khi xóa thành công
    yield call(getMenuSaga);
    yield put(deleteMenuSuccess(response.data.data));
  } catch (error: any) {
    yield put(deleteMenuError(error.response?.data || error.message));
  }
}

function* watchDeleteMenuSaga() {
  yield takeEvery(deleteMenu, deleteMenuSaga);
}

function* updateMenuOrderSaga(
  action: PayloadAction<any>
): Generator<any, any, any> {
  try {
    const response = yield call(
      updateMenuOrderApi,
      action.payload.id,
      action.payload.data
    );
    // Tự động gọi lại API lấy danh sách sau khi cập nhật thứ tự thành công
    yield call(getMenuSaga);
    yield put(updateMenuOrderSuccess(response.data.data));
  } catch (error: any) {
    yield put(updateMenuOrderError(error.response?.data || error.message));
  }
}

function* watchUpdateMenuOrderSaga() {
  yield takeEvery(updateMenuOrder, updateMenuOrderSaga);
}

function* updateMenuVisibilitySaga(
  action: PayloadAction<any>
): Generator<any, any, any> {
  try {
    const response = yield call(updateMenuVisibilityApi, action.payload.id);
    // Tự động gọi lại API lấy danh sách sau khi cập nhật trạng thái thành công
    yield call(getMenuSaga);
    yield put(updateMenuVisibilitySuccess(response.data.data));
  } catch (error: any) {
    yield put(updateMenuVisibilityError(error.response?.data || error.message));
  }
}

function* watchUpdateMenuVisibilitySaga() {
  yield takeEvery(updateMenuVisibility, updateMenuVisibilitySaga);
}

export default function* menuSaga() {
  yield all([
    watchGetMenuSaga(),
    watchAddMenuSaga(),
    watchEditMenuSaga(),
    watchDeleteMenuSaga(),
    watchUpdateMenuOrderSaga(),
    watchUpdateMenuVisibilitySaga(),
  ]);
}

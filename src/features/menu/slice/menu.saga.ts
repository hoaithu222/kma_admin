import { getMenusApi } from "@/core/api/menu";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { getMenu, getMenuError, getMenuSuccess } from "./menu.slice";

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

export default function* menuSaga() {
  yield all([watchGetMenuSaga()]);
}

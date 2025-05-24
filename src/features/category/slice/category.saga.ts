import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  getCategoriesSuccess,
  getCategoriesError,
  getCategories,
} from "./category.slice";
import { getCategoriesApi } from "@/core/api/category";

function* fetchCategories(): Generator<any, void, any> {
  try {
    const response = yield call(getCategoriesApi, {
      page: 1,
      limit: 10,
      search: "",
      sort: "",
      order: "",
    });
    if (response.ok) {
      yield put(getCategoriesSuccess(response.data));
    } else {
      yield put(getCategoriesError(response.error));
    }
  } catch (error) {
    yield put(getCategoriesError(error));
  }
}

function* watchGetCategories() {
  yield takeLatest(getCategories, fetchCategories);
}

export default function* categorySaga() {
  yield all([watchGetCategories()]);
}

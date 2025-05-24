import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  getSubcategories,
  getSubcategoriesError,
  getSubcategoriesSuccess,
} from "./subcategory.slice";
import { getSubcategoriesApi } from "@/core/api/subcategory";

function* fetchCategories(): Generator<any, void, any> {
  try {
    const response = yield call(getSubcategoriesApi, {
      page: 1,
      limit: 10,
      search: "",
      sort: "",
      order: "",
    });
    if (response.ok) {
      yield put(getSubcategoriesSuccess(response.data));
    } else {
      yield put(getSubcategoriesError(response.error));
    }
  } catch (error) {
    yield put(getSubcategoriesError(error));
  }
}

function* watchGetCategories() {
  yield takeLatest(getSubcategories, fetchCategories);
}

export default function* categorySaga() {
  yield all([watchGetCategories()]);
}

import { all, call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  getCategoriesSuccess,
  getCategoriesError,
  getCategories,
  addCategoryError,
  addCategorySuccess,
  addCategoryRequest,
  editCategoryError,
  editCategorySuccess,
  editCategoryRequest,
  deleteCategoryError,
  deleteCategorySuccess,
  deleteCategoryRequest,
} from "./category.slice";
import {
  addCategoryApi,
  deleteCategoryApi,
  editCategoryApi,
  getCategoriesApi,
} from "@/core/api/category";
import {
  IRequestCreateCategory,
  IRequestUpdateCategory,
} from "@/core/api/category/types";

function* fetchCategories(): Generator<any, void, any> {
  try {
    const response = yield call(getCategoriesApi, {
      page: 1,
      limit: 10,
      search: "",
      sort: "",
      order: "",
    });

    yield put(getCategoriesSuccess(response.data.data));
  } catch (error) {
    yield put(getCategoriesError(error));
  }
}

function* addCategorySaga(action: {
  payload: IRequestCreateCategory;
}): Generator<any, void, any> {
  try {
    const response = yield call(addCategoryApi, action.payload);
    yield put(addCategorySuccess(response.data.data));
  } catch (error) {
    yield put(addCategoryError(error));
  }
}

function* editCategorySaga(
  action: PayloadAction<IRequestUpdateCategory>
): Generator<any, void, any> {
  try {
    const data = {
      name: action.payload.name,
      description: action.payload.description,
    };
    const response = yield call(() =>
      editCategoryApi(action.payload.id as string, data)
    );
    yield put(editCategorySuccess(response.data.data));
  } catch (error) {
    yield put(editCategoryError(error));
  }
}
function* deleteCategorySaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    yield call(deleteCategoryApi, action.payload);
    yield put(deleteCategorySuccess(action.payload));
  } catch (error) {
    yield put(deleteCategoryError(error));
  }
}
function* watchDeleteCategory() {
  yield takeLatest(deleteCategoryRequest.type, deleteCategorySaga);
}
function* watchAddCategory() {
  yield takeLatest(addCategoryRequest.match, addCategorySaga);
}

function* watchGetCategories() {
  yield takeLatest(getCategories, fetchCategories);
}

function* watchEditCategory() {
  yield takeLatest(editCategoryRequest.type, editCategorySaga);
}

export default function* categorySaga() {
  yield all([
    watchGetCategories(),
    watchAddCategory(),
    watchEditCategory(),
    watchDeleteCategory(),
  ]);
}

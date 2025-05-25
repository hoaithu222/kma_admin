import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  addSubcategoryError,
  addSubcategorySuccess,
  deleteSubcategory,
  deleteSubcategoryError,
  deleteSubcategorySuccess,
  getAllSubcategories,
  getAllSubcategoriesError,
  getAllSubcategoriesSuccess,
  getSubcategories,
  getSubcategoriesError,
  getSubcategoriesSuccess,
  editSubcategory,
  editSubcategorySuccess,
  editSubcategoryError,
  addSubcategory,
} from "./subcategory.slice";
import {
  addSubcategoryApi,
  deleteSubcategoryApi,
  editSubcategoryApi,
  getAllSubcategoriesApi,
  getSubcategoriesApi,
} from "@/core/api/subcategory";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IRequestAddSubcategory,
  IRequestEditSubcategory,
} from "@/core/api/subcategory/types";
function* fetchAllSubcategories(): Generator<any, void, any> {
  try {
    const response = yield call(getAllSubcategoriesApi);
    yield put(getAllSubcategoriesSuccess(response.data.data));
  } catch (error) {
    yield put(getAllSubcategoriesError(error));
  }
}
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
      yield put(getSubcategoriesSuccess(response.data.data));
    } else {
      yield put(getSubcategoriesError(response.error));
    }
  } catch (error) {
    yield put(getSubcategoriesError(error));
  }
}
function* addSubcategorySaga(
  action: PayloadAction<IRequestAddSubcategory>
): Generator<any, void, any> {
  try {
    const response = yield call(addSubcategoryApi, action.payload);

    if (response.ok) {
      yield put(addSubcategorySuccess(response.data.data));
    } else {
      yield put(addSubcategoryError(response.error));
    }
  } catch (error) {
    yield put(addSubcategoryError(error));
  }
}
function* editSubcategorySaga(
  action: PayloadAction<IRequestEditSubcategory>
): Generator<any, void, any> {
  try {
    const data = {
      name: action.payload.name,
      categoryId: action.payload.categoryId,
      slug: action.payload.slug,
      description: action.payload.description,
    };
    const response = yield call(() =>
      editSubcategoryApi(action.payload.id as string, data)
    );
    if (response.ok) {
      yield put(editSubcategorySuccess(response.data.data));
    } else {
      yield put(editSubcategoryError(response.error));
    }
  } catch (error) {
    yield put(editSubcategoryError(error));
  }
}
function* deleteSubcategorySaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    const response = yield call(deleteSubcategoryApi, action.payload);
    if (response.ok) {
      yield put(deleteSubcategorySuccess(response.data));
    } else {
      yield put(deleteSubcategoryError(response.error));
    }
  } catch (error) {
    yield put(deleteSubcategoryError(error));
  }
}
function* watchAddSubcategory() {
  yield takeLatest(addSubcategory.type, addSubcategorySaga);
}
function* watchEditSubcategory() {
  yield takeLatest(editSubcategory.type, editSubcategorySaga);
}
function* watchDeleteSubcategory() {
  yield takeLatest(deleteSubcategory.type, deleteSubcategorySaga);
}
function* watchGetCategories() {
  yield takeLatest(getSubcategories, fetchCategories);
}
function* watchGetAllSubcategories() {
  yield takeLatest(getAllSubcategories, fetchAllSubcategories);
}

export default function* categorySaga() {
  yield all([
    watchGetCategories(),
    watchGetAllSubcategories(),
    watchAddSubcategory(),
    watchEditSubcategory(),
    watchDeleteSubcategory(),
  ]);
}

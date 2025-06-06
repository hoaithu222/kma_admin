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
  addSubcategory,
  editSubcategory,
  editSubcategoryError,
  editSubcategorySuccess,
  getSubCategories,
  getSubCategoriesSuccess,
  getSubCategoriesError,
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
import { toast } from "react-toastify";

function* fetchAllSubcategories(): Generator<any, void, any> {
  try {
    const response = yield call(getAllSubcategoriesApi);
    yield put(getAllSubcategoriesSuccess(response.data.data));
  } catch (error) {
    yield put(getAllSubcategoriesError(error));
  }
}

function* addSubcategorySaga(
  action: PayloadAction<IRequestAddSubcategory>
): Generator<any, void, any> {
  try {
    const response = yield call(addSubcategoryApi, action.payload);
    yield put(addSubcategorySuccess(response.data.data));
    toast.success("Thêm danh mục con thành công");
  } catch (error) {
    yield put(addSubcategoryError(error));
    toast.error("Thêm danh mục con thất bại");
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
    yield put(editSubcategorySuccess(response.data.data));
    toast.success("Sửa danh mục con thành công");
  } catch (error) {
    yield put(editSubcategoryError(error));
    toast.error("Sửa danh mục con thất bại");
  }
}
function* deleteSubcategorySaga(
  action: PayloadAction<string>
): Generator<any, void, any> {
  try {
    const response = yield call(deleteSubcategoryApi, action.payload);
    yield put(deleteSubcategorySuccess(response.data));
    toast.success("Xóa danh mục con thành công");
  } catch (error) {
    yield put(deleteSubcategoryError(error));
    toast.error("Xóa danh mục con thất bại");
  }
}
function* getSubCategoriesSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(getSubcategoriesApi, action.payload);
    yield put(getSubCategoriesSuccess(response.data.data));
  } catch (error) {
    yield put(getSubCategoriesError(error));
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

function* watchGetAllSubcategories() {
  yield takeLatest(getAllSubcategories, fetchAllSubcategories);
}
function* watchGetSubCategories() {
  yield takeLatest(getSubCategories, getSubCategoriesSaga);
}
export default function* categorySaga() {
  yield all([
    watchGetAllSubcategories(),
    watchAddSubcategory(),
    watchEditSubcategory(),
    watchDeleteSubcategory(),
    watchGetSubCategories(),
  ]);
}

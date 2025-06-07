import {
  addTag,
  deleteTagApi,
  getAllTag,
  getTag,
  updateTag,
} from "@/core/api/tags";
import {
  IRequestAddTag,
  IRequestDeleteTag,
  IRequestGetTag,
  IRequestUpdateTag,
} from "@/core/api/tags/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  getAllTags,
  getAllTagsError,
  getAllTagsSuccess,
  getTagError,
  getTagSuccess,
  getTagRequest,
  addTagSlice,
  addTagSuccess,
  addTagError,
  editTagError,
  deleteTag,
  deleteTagSuccess,
  deleteTagError,
  editTagSuccess,
  editTagSlice,
} from "./tag.slice";
import { toast } from "react-toastify";

function* fetchAllTags(): Generator<any, void, any> {
  try {
    const response = yield call(getAllTag);

    yield put(getAllTagsSuccess(response.data));
  } catch (error) {
    yield put(getAllTagsError(error));
  }
}

function* fetchTag(
  action: PayloadAction<IRequestGetTag>
): Generator<any, void, any> {
  try {
    const response = yield call(getTag, action.payload.id);
    yield put(getTagSuccess(response.data));
  } catch (error) {
    yield put(getTagError(error));
  }
}
function* fetchAddTag(
  action: PayloadAction<IRequestAddTag>
): Generator<any, void, any> {
  try {
    const response = yield call(addTag, action.payload);
    yield put(addTagSuccess(response.data));
    toast.success("Thêm tag thành công");
  } catch (error) {
    yield put(addTagError(error));
    toast.error("Thêm tag thất bại");
  }
}
function* fetchEditTag(
  action: PayloadAction<IRequestUpdateTag>
): Generator<any, void, any> {
  try {
    const { id, name } = action.payload;
    const response = yield call(updateTag, { id, name });
    yield put(editTagSuccess(response.data));
    toast.success("Sửa tag thành công");
  } catch (error) {
    yield put(editTagError(error));
    toast.error("Sửa tag thất bại");
  }
}
function* fetchDeleteTag(
  action: PayloadAction<IRequestDeleteTag>
): Generator<any, void, any> {
  try {
    const response = yield call(deleteTagApi, action.payload.id);
    yield put(deleteTagSuccess(response.data.data));
    toast.success("Xóa tag thành công");
  } catch (error) {
    yield put(deleteTagError(error));
    toast.error("Xóa tag thất bại");
  }
}
function* watchAddTag(): Generator<any, void, any> {
  yield takeEvery(addTagSlice, fetchAddTag);
}
function* watchEditTag(): Generator<any, void, any> {
  yield takeEvery(editTagSlice, fetchEditTag);
}
function* watchDeleteTag(): Generator<any, void, any> {
  yield takeEvery(deleteTag, fetchDeleteTag);
}
function* watchTag(): Generator<any, void, any> {
  yield takeEvery(getTagRequest, fetchTag);
}
function* watchAllTags(): Generator<any, void, any> {
  yield takeEvery(getAllTags, fetchAllTags);
}

export default function* tagSaga() {
  yield all([
    watchAllTags(),
    watchTag(),
    watchAddTag(),
    watchEditTag(),
    watchDeleteTag(),
  ]);
}

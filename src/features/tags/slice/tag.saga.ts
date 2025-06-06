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

function* fetchAllTags(): Generator<any, void, any> {
  try {
    const response = yield call(getAllTag);
    console.log(response.data.data);
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
  } catch (error) {
    yield put(addTagError(error));
  }
}
function* fetchEditTag(
  action: PayloadAction<IRequestUpdateTag>
): Generator<any, void, any> {
  try {
    const { id, name } = action.payload;
    const response = yield call(updateTag, { id, name });
    yield put(editTagSuccess(response.data));
  } catch (error) {
    yield put(editTagError(error));
  }
}
function* fetchDeleteTag(
  action: PayloadAction<IRequestDeleteTag>
): Generator<any, void, any> {
  try {
    const response = yield call(deleteTagApi, action.payload.id);
    yield put(deleteTagSuccess(response.data.data));
  } catch (error) {
    yield put(deleteTagError(error));
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

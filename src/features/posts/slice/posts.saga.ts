import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  addPost,
  addPostError,
  addPostSuccess,
  deletePost,
  deletePostError,
  deletePostSuccess,
  getDetailPostError,
  getDetailPostSuccess,
  getPostById,
  getPosts,
  getPostsError,
  getPostsSuccess,
  updatePost,
  updatePostError,
  updatePostSuccess,
} from "./posts.slice";

import {
  addArticle,
  deleteArticle,
  getArticle,
  searchArticle,
  updateArticle,
} from "@/core/api/posts/index";
import {
  IRequestGetArticleById,
  IRequestSearchArticle,
  IRequestUpdateArticle,
} from "@/core/api/posts/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { selectDeletePost, selectEditPost } from "./posts.selector";
// thêm bài viết
function* addPostSaga(action: any): Generator<any, any, any> {
  try {
    const response = yield call(addArticle, action.payload);
    yield put(addPostSuccess(response.data));
  } catch (error: any) {
    yield put(addPostError(error.response?.data || error.message));
  }
}
// lấy danh sách bài viết
function* getPostsSaga(
  action: PayloadAction<IRequestSearchArticle>
): Generator<any, any, any> {
  try {
    const response = yield call(searchArticle, action.payload);
    yield put(
      getPostsSuccess({
        content: response.data.data.content,
        totalPages: response.data.data.totalPages,
        totalItems: response.data.data.totalElements,
      })
    );
  } catch (error: any) {
    yield put(getPostsError(error.response?.data || error.message));
  }
}
// lấy thông tin chi tiết bài viết
function* getDetailPostSaga(
  action: PayloadAction<IRequestGetArticleById>
): Generator<any, any, any> {
  try {
    const response = yield call(getArticle, action.payload.id.toString());
    yield put(getDetailPostSuccess(response.data.data));
  } catch (error: any) {
    yield put(getDetailPostError(error.response?.data || error.message));
  }
}

function* watchAddPostSaga() {
  yield takeLatest(addPost, addPostSaga);
}

function* watchGetPostsSaga() {
  yield takeLatest(getPosts, getPostsSaga);
}
// lấy thông tin chi tiết bài viết
function* watchGetDetailPostSaga() {
  yield takeLatest(getPostById, getDetailPostSaga);
}
// sửa bài viết
function* updatePostSaga(
  action: PayloadAction<IRequestUpdateArticle>
): Generator<any, any, any> {
  try {
    const getEditPost = yield select(selectEditPost);
    const response = yield call(
      updateArticle,
      getEditPost.editPost.id.toString(),
      action.payload
    );
    yield put(updatePostSuccess(response.data.data));
  } catch (error: any) {
    yield put(updatePostError(error.response?.data || error.message));
  }
}
// lấy danh sách bài viết
function* watchUpdatePost() {
  yield takeLatest(updatePost, updatePostSaga);
}
// xóa bài viết
function* deletePostSaga(): Generator<any, any, any> {
  try {
    const getDeletePost = yield select(selectDeletePost);
    const response = yield call(deleteArticle, getDeletePost.id.toString());
    yield put(deletePostSuccess(response.data.data));
  } catch (error: any) {
    yield put(deletePostError(error.response?.data || error.message));
  }
}
function* watchDeletePost() {
  yield takeLatest(deletePost, deletePostSaga);
}

export default function* postSaga() {
  yield all([
    watchAddPostSaga(),
    watchGetPostsSaga(),
    watchGetDetailPostSaga(),
    watchUpdatePost(),
    watchDeletePost(),
  ]);
}

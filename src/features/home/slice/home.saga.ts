import { all, call, put, takeLatest } from "redux-saga/effects";
import { getPosts, getPostsError, getPostsSuccess } from "./home.slice";

// import { IRequestBanner } from "@/core/api/home/types";
import { fetchPostsApi } from "@/core/api/home";

function* fetchPosts(): Generator<any, void, any> {
  try {
    const response = yield call(fetchPostsApi);
    if (response.ok) {
      yield put(getPostsSuccess(response.data));
    } else {
      yield put(getPostsError(response.error));
    }
  } catch (error) {
    yield put(getPostsError(error));
  }
}

function* watchGetPosts() {
  yield takeLatest(getPosts.type, fetchPosts);
}

export function* homeSaga() {
  yield all([watchGetPosts()]);
}

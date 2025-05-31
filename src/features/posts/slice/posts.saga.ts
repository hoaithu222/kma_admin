// import { all, call, put, takeLatest } from "redux-saga/effects";

// import { getPostsApi } from "@/core/api/posts";
// import { getPosts, getPostsError, getPostsSuccess } from "./posts.slice";

// function* fetchPosts(): Generator<any, void, any> {
//   try {
//     const response = yield call(getPostsApi, {
//       page: 1,
//       limit: 10,
//       search: "",
//       sort: "",
//       order: "",
//     });

//     yield put(getPostsSuccess(response.data));
//   } catch (error) {
//     yield put(getPostsError(error));
//   }
// }
// function* watchFetchPosts() {
//   yield takeLatest(getPosts, fetchPosts);
// }

// export default function* postSaga() {
//   yield all([watchFetchPosts()]);
// }

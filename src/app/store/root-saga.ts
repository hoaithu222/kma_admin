import { authSaga } from "@/features/auth/slice/auth.saga";
import categorySaga from "@/features/category/slice/category.saga";
import { homeSaga } from "@/features/home/slice/home.saga.ts";
import postSaga from "@/features/posts/slice/posts.saga";
import subcategorySaga from "@/features/subcategory/slice/subcategory.saga";
import tagSaga from "@/features/tags/slice/tag.saga";
import { all } from "redux-saga/effects";

export const rootSage = function* () {
  try {
    yield all([
      homeSaga(),
      categorySaga(),
      subcategorySaga(),
      postSaga(),
      authSaga(),
      tagSaga(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

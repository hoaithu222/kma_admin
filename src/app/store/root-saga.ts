import { authSaga } from "@/features/auth/slice/auth.saga";
import categorySaga from "@/features/category/slice/category.saga";

import postSaga from "@/features/posts/slice/posts.saga";
import subcategorySaga from "@/features/subcategory/slice/subcategory.saga";
import tagSaga from "@/features/tags/slice/tag.saga";
import { all } from "redux-saga/effects";
import mediaSaga from "@/features/media/slice/media.saga";
import { majorSaga } from "@/features/major/slice/major.saga";
import { submajorSaga } from "@/features/submajor/slice/submajor.saga";
import { lecturerSaga } from "@/features/lecturer/slice/lecturer.saga";
import basePostSaga from "@/foundation/components/base/slice/base-post.saga";
import { userSaga } from "@/features/user-management/slice/user.saga";
import menuSaga from "@/features/menu/slice/menu.saga";
export const rootSage = function* () {
  try {
    yield all([
      categorySaga(),
      subcategorySaga(),
      postSaga(),
      authSaga(),
      tagSaga(),
      mediaSaga(),
      majorSaga(),
      submajorSaga(),
      lecturerSaga(),
      basePostSaga(),
      userSaga(),
      menuSaga(),
    ]);
  } catch (error) {
    console.error(error);
  }
};

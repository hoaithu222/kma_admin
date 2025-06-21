import { RootState } from "@/app/store";
import { initialStateType } from "./base-post.types";
import { createSelector } from "@reduxjs/toolkit";

const selectPosts = (state: RootState) => state.basePost as initialStateType;

export const getPostsSelector = createSelector(
  [selectPosts],
  (state) => state.posts
);

export const isAddPostSelector = createSelector(
  [selectPosts],
  (state) => state.isAddPost
);
export const isLoadingSelector = createSelector(
  [selectPosts],
  (state) => state.isLoading
);
export const errorSelector = createSelector(
  [selectPosts],
  (state) => state.error
);
export const isEditPostSelector = createSelector(
  [selectPosts],
  (state) => state.isEditPost
);

export const selectEditPost = createSelector(
  [selectPosts],
  (state) => state.editPost
);

// lấy thông tin chi tiết bài viết
export const selectDetailPost = createSelector(
  [selectPosts],
  (state) => state.detailPost
);
export const statusGetDetailPost = createSelector(
  [selectPosts],
  (state) => state.detailPost.statusGetDetailPost
);
// lấy thông tin bài viết để xóa
export const selectDeletePost = createSelector(
  [selectPosts],
  (state) => state.deletePost
);
export const isDeletePostSelector = createSelector(
  [selectPosts],
  (state) => state.isDeletePost
);

// lấy trạng thái thêm bài viết
export const selectStatusAddPostSelector = createSelector(
  [selectPosts],
  (state) => state.addPost.statusAddPost
);

// lấy trạng thái sửa bài viết
export const selectStatusEditPostSelector = createSelector(
  [selectPosts],
  (state) => state.editPost.statusEditPost
);

// lấy trạng thái lấy danh sách bài viết
export const selectStatusGetListPostSelector = createSelector(
  [selectPosts],
  (state) => state.posts.statusGetListPost
);

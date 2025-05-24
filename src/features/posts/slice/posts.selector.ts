import { RootState } from "@/app/store";
import { initialStateType } from "./posts.type";
import { createSelector } from "@reduxjs/toolkit";

const selectPosts = (state: RootState) => state.post as initialStateType;

export const getPostsSelector = createSelector(
  [selectPosts],
  (state) => state.posts
);

export const isAddPostSelector = createSelector(
  [selectPosts],
  (state) => state.isAddPost
);

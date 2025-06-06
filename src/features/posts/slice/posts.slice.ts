import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { initialStateType } from "./posts.type";
import {
  IRequestAddArticle,
  IRequestDeleteArticle,
  IRequestGetArticleById,
  IRequestSearchArticle,
  IRequestUpdateArticle,
} from "@/core/api/posts/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { ReduxStateType } from "@/app/store/types";

const initialState: initialStateType = {
  posts: {
    content: [],
    totalPages: 0,
    totalItems: 0,
  },
  isAddPost: false,
  isEditPost: false,
  isDeletePost: false,
  isLoading: false,
  error: null,
  detailPost: {
    detailPost: null,
    statusGetDetailPost: ReduxStateType.INIT,
  },
  editPost: {
    editPost: null,
    statusEditPost: ReduxStateType.INIT,
  },
  deletePost: {
    deletePost: null,
    id: 0,
    statusDeletePost: ReduxStateType.INIT,
  },
  detailPostById: {
    detailPostById: null,
    statusGetDetailPostById: ReduxStateType.INIT,
  },
};

const { slice, reducer } = createResettableSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, _action: PayloadAction<IRequestAddArticle>) => {
      state.isLoading = true;
      state.error = null;
    },
    addPostSuccess: (state, action) => {
      state.posts.content.push(action.payload);
      state.posts.totalItems++;
      state.isLoading = false;
      state.isAddPost = false;
    },
    addPostError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setIsAddPost: (state, action) => {
      state.isAddPost = action.payload;
    },
    getPosts: (state, _action: PayloadAction<IRequestSearchArticle>) => {
      state.isLoading = true;
      state.error = null;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    getPostsError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // lấy thông tin chi tiết bài viết
    getDetailPost: (state, _action: PayloadAction<IRequestGetArticleById>) => {
      state.detailPost.statusGetDetailPost = ReduxStateType.LOADING;
    },
    getDetailPostSuccess: (state, action) => {
      state.detailPost.detailPost = action.payload;
      state.detailPost.statusGetDetailPost = ReduxStateType.SUCCESS;
    },
    getDetailPostError: (state) => {
      state.detailPost.statusGetDetailPost = ReduxStateType.ERROR;
    },
    // sửa bài viết
    setIsEditPost: (state, action) => {
      state.isEditPost = action.payload;
    },
    setIsEditPostId: (state, action) => {
      state.editPost.editPost = action.payload;
    },
    updatePost: (state, _action: PayloadAction<IRequestUpdateArticle>) => {
      state.editPost.statusEditPost = ReduxStateType.LOADING;
    },
    updatePostSuccess: (state, action) => {
      state.editPost.editPost = action.payload;
      state.editPost.statusEditPost = ReduxStateType.SUCCESS;
      state.isEditPost = false;
      state.posts.content = state.posts.content.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    },
    updatePostError: (state) => {
      state.editPost.statusEditPost = ReduxStateType.ERROR;
    },
    // xóa bài viết
    deletePost: (state, _action: PayloadAction<IRequestDeleteArticle>) => {
      state.deletePost.statusDeletePost = ReduxStateType.LOADING;
    },
    setIsDeletePost: (state, action) => {
      state.isDeletePost = action.payload;
    },
    deletePostSuccess: (state, action) => {
      state.deletePost.deletePost = action.payload;
      state.deletePost.statusDeletePost = ReduxStateType.SUCCESS;
      state.isDeletePost = false;
      state.posts.content = state.posts.content.filter(
        (post) => post.id !== state.deletePost.id
      );
      state.posts.totalItems--;
    },
    deletePostError: (state) => {
      state.deletePost.statusDeletePost = ReduxStateType.ERROR;
    },
    // set id delete post
    setIdDeletePost: (state, action) => {
      state.deletePost.id = action.payload;
    },
    // lấy bài viết theo id
    getPostById: (state, _action: PayloadAction<IRequestGetArticleById>) => {
      state.detailPost.statusGetDetailPost = ReduxStateType.LOADING;
    },
    getPostByIdSuccess: (state, action) => {
      state.detailPost.detailPost = action.payload;
      state.detailPost.statusGetDetailPost = ReduxStateType.SUCCESS;
    },
    getPostByIdError: (state) => {
      state.detailPost.statusGetDetailPost = ReduxStateType.ERROR;
    },
  },
});

export const {
  // thêm bài viết
  addPost,
  addPostSuccess,
  addPostError,
  setIsAddPost,
  // lấy danh sách bài viết
  getPosts,
  getPostsSuccess,
  getPostsError,
  // lấy thông tin chi tiết bài viết
  getDetailPost,
  getDetailPostSuccess,
  getDetailPostError,
  // sửa bài viết
  setIsEditPost,
  setIsEditPostId,
  updatePost,
  updatePostSuccess,
  updatePostError,
  // xóa bài viết
  deletePost,
  setIsDeletePost,
  setIdDeletePost,
  deletePostSuccess,
  deletePostError,
  // lấy bài viết theo id
  getPostById,
  getPostByIdSuccess,
  getPostByIdError,
} = slice.actions;
export default reducer;

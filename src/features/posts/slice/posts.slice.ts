import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { initialStateType } from "./posts.type";

const initialState: initialStateType = {
  posts: [],
  isAddPost: false,
  isEditPost: false,
  isDeletePost: false,
  isViewPost: false,
  isSearchPost: false,
  isFilterPost: false,
  isSortPost: false,
  isLoading: false,
  error: null,
};

const { slice, reducer } = createResettableSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state) => {
      state.isLoading = true;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
    },
    getPostsError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setIsAddPost: (state, action) => {
      state.isAddPost = action.payload;
    },
    setIsEditPost: (state, action) => {
      state.isEditPost = action.payload;
    },
    setIsDeletePost: (state, action) => {
      state.isDeletePost = action.payload;
    },
    setIsViewPost: (state, action) => {
      state.isViewPost = action.payload;
    },
    setIsSearchPost: (state, action) => {
      state.isSearchPost = action.payload;
    },
    setIsFilterPost: (state, action) => {
      state.isFilterPost = action.payload;
    },
    setIsSortPost: (state, action) => {
      state.isSortPost = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getPosts,
  getPostsSuccess,
  getPostsError,
  setIsAddPost,
  setIsEditPost,
  setIsDeletePost,
  setIsViewPost,
  setIsSearchPost,
  setIsFilterPost,
  setIsSortPost,
  setIsLoading,
  setError,
} = slice.actions;
export default reducer;

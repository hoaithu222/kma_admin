import { AppReducerType, ReduxStateType } from "@/app/store/types";
import { initialStateType } from "./home.types";
import { PAGE_SIZE, PAGE_SIZE_SMALL } from "@/shared/consts/consts";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";

const initialState: initialStateType = {
  posts: [],
  status: ReduxStateType.INIT,
  error: null,
  filter: {
    page: PAGE_SIZE_SMALL,
    size: PAGE_SIZE,
  },
  category: [],
};

const { slice, reducer } = createResettableSlice({
  name: AppReducerType.HOME,
  initialState,
  reducers: {
    getPosts: (state) => {
      state.status = ReduxStateType.LOADING;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.status = ReduxStateType.SUCCESS;
    },
    getPostsError: (state, action) => {
      state.error = action.payload;
    },
    getCategory: (state) => {
      state.status = ReduxStateType.LOADING;
    },
    getCategorySuccess: (state, action) => {
      state.category = action.payload;
      state.status = ReduxStateType.SUCCESS;
    },
    getCategoryError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getPosts,
  getPostsSuccess,
  getPostsError,
  getCategory,
  getCategorySuccess,
  getCategoryError,
} = slice.actions;
export default reducer;

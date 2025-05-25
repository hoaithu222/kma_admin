import { AppReducerType, ReduxStateType } from "@/app/store/types";
import { initialStateType } from "./home.types";
import { PAGE_SIZE, PAGE_SIZE_SMALL } from "@/shared/consts/consts";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";

const initialState: initialStateType = {
  articles: [],
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
    getArticles: (state) => {
      state.status = ReduxStateType.LOADING;
    },
    getArticlesSuccess: (state, action) => {
      state.articles = action.payload;
      state.status = ReduxStateType.SUCCESS;
    },
    getArticlesError: (state, action) => {
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
  getArticles,
  getArticlesSuccess,
  getArticlesError,
  getCategory,
  getCategorySuccess,
  getCategoryError,
} = slice.actions;
export default reducer;

import { combineReducers } from "@reduxjs/toolkit";
import languageReducer from "./slices/language";
import themeReducer from "./slices/theme";
import { AppReducerType } from "./types";
import homeReducer from "@/features/home/slice/home.slice.ts";
import categoryReducer from "@/features/category/slice/category.slice.ts";
import subcategoryReducer from "@/features/subcategory/slice/subcategory.slice.ts";
import postReducer from "@/features/posts/slice/posts.slice.ts";
import authReducer from "@/features/auth/slice/auth.slice.ts";
import tagReducer from "@/features/tags/slice/tag.slice.ts";
import mediaReducer from "@/features/media/slice/media.slice.ts";
import settingsReducer from "./slices/settings";
import majorReducer from "@/features/major/slice/major.slice.ts";
import submajorReducer from "@/features/submajor/slice/submajor.slice.ts";

export const rootReducer = combineReducers({
  [AppReducerType.LANGUAGE]: languageReducer,
  [AppReducerType.THEME]: themeReducer,
  [AppReducerType.HOME]: homeReducer,
  [AppReducerType.CATEGORY]: categoryReducer,
  [AppReducerType.SUBCATEGORY]: subcategoryReducer,
  [AppReducerType.POST]: postReducer,
  [AppReducerType.AUTH]: authReducer,
  [AppReducerType.TAG]: tagReducer,
  [AppReducerType.MEDIA]: mediaReducer,
  [AppReducerType.SETTINGS]: settingsReducer,
  [AppReducerType.MAJOR]: majorReducer,
  [AppReducerType.SUBMAJOR]: submajorReducer,
});

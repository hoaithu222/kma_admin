import { Action, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/**
 * Khai báo tên các slice ở đây
 *
 *
 *
 *
 */
export enum AppReducerType {
  LANGUAGE = "language",
  TOAST = "toast",
  THEME = "theme",
  AUTH = "auth",
  HOME = "home",
  CATEGORY = "category",
  SUBCATEGORY = "subcategory",
  POST = "post",
}
export enum ReduxStateType {
  INIT = "init",
  LOADING = "loading",
  LOADED = "loaded",
  SUCCESS = "success",
  ERROR = "error",
  CANCELLED = "cancelled",
  LIMIT = "limit",
}

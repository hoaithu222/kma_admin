import { IAuthState } from "./auth.types";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { AppReducerType, ReduxStateType } from "@/app/store/types";
import {
  IRegister,
  IRequestLogin,
  IRequestLogout,
} from "@/core/api/auth/types";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  isAuthenticated: false,
  user: {
    id: "",
    username: "",
    active: true,
    role: "",
    token: "",
    createdAt: "",
    fullName: "",
    session: {
      sessionId: "",
      userId: "",
      isActive: false,
    },
  },
  isLogin: true,
  isRegister: false,
  isLoadingLogin: false,
  isLoadingRegister: false,
  logout: {
    logoutStatus: ReduxStateType.INIT,
  },
};

export const { slice, reducer } = createResettableSlice({
  name: AppReducerType.AUTH,
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setIsRegister: (state, action) => {
      state.isRegister = action.payload;
    },
    setIsLoadingLogin: (state, action) => {
      state.isLoadingLogin = action.payload;
    },
    loginUser: (state, _action: PayloadAction<IRequestLogin>) => {
      state.isLoadingLogin = true;
      state.isAuthenticated = false;
      state.user = null;
    },
    loginSuccess: (state, action) => {
      state.isLoadingLogin = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailed: (state) => {
      state.isLoadingLogin = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    register: (state, _action: PayloadAction<IRegister>) => {
      state.isLoadingRegister = true;
      state.user = null;
    },
    registerSuccess: (state) => {
      state.isLoadingRegister = false;
    },
    registerFailed: (state) => {
      state.isLoadingRegister = false;
    },
    logoutUser: (state, _action: PayloadAction<IRequestLogout>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.logout.logoutStatus = ReduxStateType.LOADING;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.logout.logoutStatus = ReduxStateType.SUCCESS;
    },
    logoutFailed: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.logout.logoutStatus = ReduxStateType.ERROR;
    },
  },
  persist: {
    whitelist: ["user", "isAuthenticated"],
  },
});
export const {
  setIsAuthenticated,
  setIsLogin,
  setIsRegister,
  setIsLoadingLogin,
  loginUser,
  loginSuccess,
  loginFailed,
  register,
  registerSuccess,
  registerFailed,
  logoutUser,
  logoutSuccess,
  logoutFailed,
} = slice.actions;
export default reducer;

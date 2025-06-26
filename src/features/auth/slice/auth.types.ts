import { ReduxStateType } from "@/app/store/types";
import { ISession } from "@/core/api/auth/types";

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isLogin: boolean;
  isRegister: boolean;
  isLoadingLogin: boolean;
  isLoadingRegister: boolean;
  logout: {
    logoutStatus: ReduxStateType;
  };
}

export interface IUser {
  id: string;
  username: string;
  active: boolean;
  role: string;
  token: string;
  fullName: string;
  createdAt: string;
  session: ISession;
}

export interface ILogin {
  username: string;
  password: string;
}

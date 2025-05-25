export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  isLogin: boolean;
  isRegister: boolean;
  isLoadingLogin: boolean;
  isLoadingRegister: boolean;
}

export interface IUser {
  id: string;
  username: string;
  active: boolean;
  role: string;
  token: string;
  createdAt: string;
}

export interface ILogin {
  username: string;
  password: string;
}

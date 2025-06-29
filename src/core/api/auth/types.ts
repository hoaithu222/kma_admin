import { IResponse } from "@/core/base/Response";

export interface IRequestLogin {
  username: string;
  password: string;
  active: boolean;
  role: string;
}
export interface ISession {
  sessionId: string;
  userId: string;
  isActive: boolean;
}
export interface IResponseDataLogin {
  id: string;
  username: string;
  active: boolean;
  role: string;
  token: string;
  createdAt: string;
  session: ISession;
  fullName: string;
}

export interface IRequestUpdateUser {
  username?: string;
  password?: string;
  active?: boolean;
  fullName?: string;
}
export interface IRequestLogout {
  sessionId: string;
}
export interface IRegister {
  username?: string;
  password?: string;
  fullName?: string;
  active?: boolean;
}
export interface IRequestGetList {
  active?: boolean;
  page?: number;
  size?: number;
}

export interface IResponseLogout {
  date: string;
}
export interface IResponseLogin extends IResponse<IResponseDataLogin> {}

export interface IResponseUpdateUser extends IResponse<IResponseDataLogin> {}

export interface IResponseDeleteUser extends IResponse<{ message: string }> {}

export interface IResponseGetUser extends IResponse<IResponseDataLogin[]> {}

export interface IResponseRegister extends IResponse<IResponseDataLogin> {}

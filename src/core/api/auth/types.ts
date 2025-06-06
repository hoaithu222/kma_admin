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
}

export interface IRequestUpdateUser {
  username: string;
}
export interface IRequestLogout {
  sessionId: string;
}
export interface IRegister {
  username: string;
  password: string;
}
export interface IRequestGetList {
  active: boolean;
  page: number;
  size: number;
}
export interface IResponseLogout {
  date: string;
}
export interface IResponseLogin extends IResponse<IResponseDataLogin> {}

export interface IResponseUpdateUser extends IResponse<IResponseDataLogin> {}

export interface IResponseDeleteUser extends IResponse<IResponseDataLogin> {}

export interface IResponseGetUser extends IResponse<IResponseDataLogin[]> {}

export interface IResponseRegister extends IResponse<IResponseDataLogin> {}

export interface IResponseLogout extends IResponse<IResponseLogout> {}

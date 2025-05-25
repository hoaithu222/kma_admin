export interface IRequestLogin {
  username: string;
  password: string;
  active: boolean;
  role: string;
}
export interface IResponseDataLogin {
  id: string;
  username: string;
  active: boolean;
  role: string;
  token: string;
  createdAt: string;
}

export interface IResponseLogin {
  status: number;
  message: string;
  data: IResponseDataLogin;
}
export interface IRequestUpdateUser {
  username: string;
  active: boolean;
  role: string;
}
export interface IResponseUpdateUser {
  status: number;
  message: string;
}

export interface IResponseDeleteUser {
  status: number;
  message: string;
}

export interface IResponseGetUser {
  status: number;
  message: string;
  data: IResponseDataLogin[];
}

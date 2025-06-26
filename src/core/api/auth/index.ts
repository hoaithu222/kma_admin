import {
  IRequestLogin,
  IRequestUpdateUser,
  IResponseUpdateUser,
  IResponseLogin,
  IResponseDeleteUser,
  IResponseGetUser,
  IRequestLogout,
  IResponseLogout,
  IResponseRegister,
  IRegister,
  IRequestGetList,
} from "./types";
import { AUTH_PATH } from "./paths";
import Axios from "@/core/base/Axios";

export const login = async (data: IRequestLogin) => {
  try {
    const response = await Axios.post<IResponseLogin>(AUTH_PATH.login, data);

    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const updateUser = async (id: string, data: IRequestUpdateUser) => {
  try {
    const response = await Axios.put<IResponseUpdateUser>(
      AUTH_PATH.updateUser.replace(":id", id),
      data
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await Axios.delete<IResponseDeleteUser>(
      AUTH_PATH.delete.replace(":id", id)
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const getUser = async (data: IRequestGetList) => {
  try {
    const response = await Axios.post<IResponseGetUser>(
      AUTH_PATH.getUser,
      data
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};
export const logout = async (data: IRequestLogout) => {
  try {
    const response = await Axios.post<IResponseLogout>(AUTH_PATH.logout, data);
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const registerRequest = async (data: IRegister) => {
  try {
    const response = await Axios.post<IResponseRegister>(
      AUTH_PATH.register,
      data
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

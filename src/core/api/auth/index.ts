import {
  IRequestLogin,
  IRequestUpdateUser,
  IResponseUpdateUser,
  IResponseLogin,
  IResponseDeleteUser,
  IResponseGetUser,
  IRequestLogout,
  IResponseLogout,
} from "./types";
import { AUTH_PATH } from "./paths";
import Axios from "@/core/base/Axios";

export const login = async (data: IRequestLogin) => {
  try {
    const response = await Axios.post<IResponseLogin>(AUTH_PATH.login, data);
    console.log(response);
    return { ok: true, data: response.data };
  } catch (error) {
    console.log(error);
    return { ok: false, error: error };
  }
};

export const updateUser = async (data: IRequestUpdateUser) => {
  try {
    const response = await Axios.put<IResponseUpdateUser>(
      AUTH_PATH.updateUser,
      data
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const deleteUser = async (username: string) => {
  try {
    const response = await Axios.delete<IResponseDeleteUser>(
      AUTH_PATH.delete.replace(":username", username)
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const getUser = async (username: string) => {
  try {
    const response = await Axios.get<IResponseGetUser>(
      AUTH_PATH.getUser.replace(":username", username)
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

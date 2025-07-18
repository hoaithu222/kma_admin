import Axios from "@/core/base/Axios";
import { MENU_PATH } from "./paths";
import {
  IRequestCreateMenu,
  IRequestUpdateMenu,
  IRequestUpdateMenuOrder,
} from "./types";

export const getMenusApi = () => {
  return Axios.get(MENU_PATH.GET_MENUS);
};
export const getVisibleMenuApi = () => {
  return Axios.get(MENU_PATH.GET_MENU_VISIBLE);
};
export const createMenuApi = (data: IRequestCreateMenu) => {
  return Axios.post(MENU_PATH.CREATE_MENU, data);
};

export const updateMenuApi = (id: number, data: IRequestUpdateMenu) => {
  return Axios.put(MENU_PATH.UPDATE_MENU.replace(":id", id.toString()), data);
};
export const updateMenuOrderApi = (
  id: number,
  data: IRequestUpdateMenuOrder
) => {
  return Axios.put(
    MENU_PATH.UPDATE_ORDER_MENU.replace(":id", id.toString()),
    data
  );
};
export const updateMenuVisibilityApi = (id: number) => {
  return Axios.put(MENU_PATH.UPDATE_TOGGLE_MENU.replace(":id", id.toString()));
};
export const deleteMenuApi = (id: number) => {
  return Axios.delete(
    MENU_PATH.DELETE_MENU_BY_CATEGORY_ID.replace(":id", id.toString())
  );
};

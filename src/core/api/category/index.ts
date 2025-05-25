import Axios from "@/core/base/Axios";
import { CATEGORY_PATH } from "./paths";
import {
  IRequestCategory,
  IRequestCreateCategory,
  IRequestUpdateCategory,
} from "./types";

export const getCategoriesApi = (params: IRequestCategory) => {
  return Axios.get(CATEGORY_PATH.GET_CATEGORIES, { params });
};

export const addCategoryApi = (data: IRequestCreateCategory) => {
  return Axios.post(CATEGORY_PATH.ADD_CATEGORY, data);
};

export const editCategoryApi = (id: string, data: IRequestUpdateCategory) => {
  return Axios.post(CATEGORY_PATH.EDIT_CATEGORY.replace(":id", id), data);
};

export const deleteCategoryApi = (id: string) => {
  return Axios.delete(CATEGORY_PATH.DELETE_CATEGORY.replace(":id", id));
};

export const getCategoryByIdApi = (id: string) => {
  return Axios.get(CATEGORY_PATH.GET_CATEGORY.replace(":id", id));
};

import Axios from "@/core/base/Axios";
import { CATEGORY_PATH } from "./paths";
import { IRequestCategory } from "./types";

export const getCategoriesApi = (params: IRequestCategory) => {
  return Axios.get(CATEGORY_PATH.GET_CATEGORIES, { params });
};

export const addCategoryApi = (data: IRequestCategory) => {
  return Axios.post(CATEGORY_PATH.ADD_CATEGORY, data);
};

export const editCategoryApi = (id: string, data: IRequestCategory) => {
  return Axios.put(CATEGORY_PATH.EDIT_CATEGORY.replace(":id", id), data);
};

export const deleteCategoryApi = (id: string) => {
  return Axios.delete(CATEGORY_PATH.DELETE_CATEGORY.replace(":id", id));
};

export const getCategoryApi = (id: string) => {
  return Axios.get(CATEGORY_PATH.GET_CATEGORY.replace(":id", id));
};

export const searchCategoryApi = (data: IRequestCategory) => {
  return Axios.post(CATEGORY_PATH.SEARCH_CATEGORY, data);
};

export const filterCategoryApi = (data: IRequestCategory) => {
  return Axios.post(CATEGORY_PATH.FILTER_CATEGORY, data);
};

export const sortCategoryApi = (data: IRequestCategory) => {
  return Axios.post(CATEGORY_PATH.SORT_CATEGORY, data);
};

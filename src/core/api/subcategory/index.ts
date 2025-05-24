import Axios from "@/core/base/Axios";
import { SUBCATEGORY_PATH } from "./paths";
import { IRequestSubcategory } from "./types";

export const getSubcategoriesApi = (params: IRequestSubcategory) => {
  return Axios.get(SUBCATEGORY_PATH.GET_SUBCATEGORIES, { params });
};

export const addSubcategoryApi = (data: IRequestSubcategory) => {
  return Axios.post(SUBCATEGORY_PATH.ADD_SUBCATEGORY, data);
};

export const editSubcategoryApi = (id: string, data: IRequestSubcategory) => {
  return Axios.put(SUBCATEGORY_PATH.EDIT_SUBCATEGORY.replace(":id", id), data);
};

export const deleteSubcategoryApi = (id: string) => {
  return Axios.delete(SUBCATEGORY_PATH.DELETE_SUBCATEGORY.replace(":id", id));
};

export const getSubcategoryApi = (id: string) => {
  return Axios.get(SUBCATEGORY_PATH.GET_SUBCATEGORY.replace(":id", id));
};

export const searchSubcategoryApi = (data: IRequestSubcategory) => {
  return Axios.post(SUBCATEGORY_PATH.SEARCH_SUBCATEGORY, data);
};

export const filterSubcategoryApi = (data: IRequestSubcategory) => {
  return Axios.post(SUBCATEGORY_PATH.FILTER_SUBCATEGORY, data);
};

export const sortSubcategoryApi = (data: IRequestSubcategory) => {
  return Axios.post(SUBCATEGORY_PATH.SORT_SUBCATEGORY, data);
};

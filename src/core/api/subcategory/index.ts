import Axios from "@/core/base/Axios";
import { SUBCATEGORY_PATH } from "./paths";
import {
  IRequestAddSubcategory,
  IRequestEditSubcategory,
  IRequestSubcategory,
} from "./types";

export const getSubcategoriesApi = (params: IRequestSubcategory) => {
  return Axios.get(SUBCATEGORY_PATH.GET_SUBCATEGORIES, { params });
};

export const addSubcategoryApi = (data: IRequestAddSubcategory) => {
  return Axios.post(SUBCATEGORY_PATH.ADD_SUBCATEGORY, data);
};

export const editSubcategoryApi = (
  id: string,
  data: IRequestEditSubcategory
) => {
  return Axios.put(SUBCATEGORY_PATH.EDIT_SUBCATEGORY.replace(":id", id), data);
};

export const deleteSubcategoryApi = (id: string) => {
  return Axios.delete(SUBCATEGORY_PATH.DELETE_SUBCATEGORY, {
    data: [id],
  });
};

export const getAllSubcategoriesApi = () => {
  return Axios.get(SUBCATEGORY_PATH.GET_ALL_SUBCATEGORIES);
};

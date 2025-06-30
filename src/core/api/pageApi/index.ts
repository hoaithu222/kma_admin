import Axios from "@/core/base/Axios";
import { PAGE_PATH } from "./path";
import {
  PageRequestCreate,
  PageRequestUpdate,
  PageRequestWithId,
} from "./types";

export const getPage = async (id: string) => {
  const response = await Axios.get(PAGE_PATH.getById.replace(":id", id));
  return response.data;
};

export const createPage = async (params: PageRequestCreate) => {
  const response = await Axios.post(PAGE_PATH.create, params);
  return response.data;
};

export const updatePage = async (id: string, params: PageRequestUpdate) => {
  const response = await Axios.put(PAGE_PATH.update.replace(":id", id), params);
  return response.data;
};

export const deletePage = async (params: PageRequestWithId) => {
  const response = await Axios.delete(
    PAGE_PATH.delete.replace(":id", params.id)
  );
  return response.data;
};

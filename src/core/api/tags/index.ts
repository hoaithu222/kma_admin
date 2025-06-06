import Axios from "@/core/base/Axios";
import { IRequestAddTag, IRequestUpdateTag } from "./types";
import { TAG_PATH } from "./paths";

export const addTag = async (data: IRequestAddTag) => {
  const response = await Axios.post(TAG_PATH.create, data);
  return response.data;
};

export const getTag = async (id: number) => {
  const response = await Axios.get(
    TAG_PATH.getTag.replace(":id", id.toString())
  );
  return response.data;
};

export const updateTag = async (data: IRequestUpdateTag) => {
  const response = await Axios.post(
    TAG_PATH.update.replace(":id", data.id?.toString() || ""),
    { name: data.name }
  );
  return response.data;
};

export const deleteTagApi = async (id: number) => {
  const response = await Axios.delete(
    TAG_PATH.delete.replace(":id", id.toString())
  );
  return response.data;
};

export const getAllTag = async () => {
  const response = await Axios.get(TAG_PATH.getAll);
  return response.data;
};

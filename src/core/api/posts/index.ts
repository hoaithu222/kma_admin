import Axios from "@/core/base/Axios";
import { POST_PATH } from "./paths";
import { IRequestPost } from "./types";

export const getPostsApi = (params: IRequestPost) => {
  return Axios.get(POST_PATH.GET_POSTS, { params });
};

export const addPostApi = (data: IRequestPost) => {
  return Axios.post(POST_PATH.ADD_POST, data);
};

export const editPostApi = (id: string, data: IRequestPost) => {
  return Axios.put(POST_PATH.EDIT_POST.replace(":id", id), data);
};

export const deletePostApi = (id: string) => {
  return Axios.delete(POST_PATH.DELETE_POST.replace(":id", id));
};

export const getPostApi = (id: string) => {
  return Axios.get(POST_PATH.GET_POST.replace(":id", id));
};

export const searchPostApi = (data: IRequestPost) => {
  return Axios.post(POST_PATH.SEARCH_POST, data);
};

export const filterPostApi = (data: IRequestPost) => {
  return Axios.post(POST_PATH.FILTER_POST, data);
};

export const sortPostApi = (data: IRequestPost) => {
  return Axios.post(POST_PATH.SORT_POST, data);
};

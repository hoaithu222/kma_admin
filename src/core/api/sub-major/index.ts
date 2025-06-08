import Axios from "@/core/base/Axios";
import { SUB_MAJOR_PATH } from "./paths";
import {
  IRequestCreateSubMajor,
  IRequestGetSubMajor,
  IRequestGetSubMajorWithMajor,
  IRequestUpdateSubMajor,
} from "./types";

export const getSubMajorsApi = (params: IRequestGetSubMajor) => {
  return Axios.get(SUB_MAJOR_PATH.GET_SUB_MAJORS, { params });
};

export const getSubMajorWithMajorApi = (
  params: IRequestGetSubMajorWithMajor
) => {
  return Axios.get(
    SUB_MAJOR_PATH.GET_SUB_MAJOR_WITH_MAJOR.replace(
      ":majorId",
      params.majorId.toString()
    )
  );
};

export const getSubMajorByIdApi = (id: number) => {
  return Axios.get(
    SUB_MAJOR_PATH.GET_SUB_MAJOR_BY_ID.replace(":id", id.toString())
  );
};

export const createSubMajorApi = (data: IRequestCreateSubMajor) => {
  return Axios.post(SUB_MAJOR_PATH.CREATE_SUB_MAJOR, data);
};

export const updateSubMajorApi = (id: number, data: IRequestUpdateSubMajor) => {
  return Axios.put(
    SUB_MAJOR_PATH.UPDATE_SUB_MAJOR.replace(":id", id.toString()),
    data
  );
};

export const deleteSubMajorApi = (id: number) => {
  return Axios.delete(
    SUB_MAJOR_PATH.DELETE_SUB_MAJOR.replace(":id", id.toString())
  );
};

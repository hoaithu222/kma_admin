import Axios from "@/core/base/Axios";
import { MAJOR_PATH } from "./paths";
import { IRequestCreateMajor, IRequestUpdateMajor } from "./types";

export const getMajorsApi = () => {
  return Axios.get(MAJOR_PATH.GET_MAJORS);
};

export const getMajorWithSubMajorApiAll = () => {
  return Axios.get(MAJOR_PATH.GET_MAJOR_WITH_SUB_MAJOR_ALL);
};

export const getMajorByIdApi = (id: number) => {
  return Axios.get(MAJOR_PATH.GET_MAJOR_BY_ID.replace(":id", id.toString()));
};
export const addMajorApi = (data: IRequestCreateMajor) => {
  return Axios.post(MAJOR_PATH.CREATE_MAJOR, data);
};

export const editMajorApi = (id: number, data: IRequestUpdateMajor) => {
  return Axios.put(MAJOR_PATH.UPDATE_MAJOR.replace(":id", id.toString()), data);
};
export const deleteMajorApi = (id: number) => {
  return Axios.delete(MAJOR_PATH.DELETE_MAJOR.replace(":id", id.toString()));
};
export const getMajorWithSubMajorApi = (id: number) => {
  return Axios.get(
    MAJOR_PATH.GET_MAJOR_WITH_SUB_MAJOR.replace(":id", id.toString())
  );
};

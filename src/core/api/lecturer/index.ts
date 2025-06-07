import Axios from "@/core/base/Axios";
import { LECTURER_PATH } from "./paths";
import {
  IRequestCreateLecturer,
  IRequestGetLecturer,
  IRequestSearchLecturer,
  IRequestUpdateLecturer,
} from "./types";

export const getLecturersAllApi = (params: IRequestGetLecturer) => {
  return Axios.get(LECTURER_PATH.GET_LECTURERS_ALL, { params });
};

export const searchLecturersApi = (params: IRequestSearchLecturer) => {
  return Axios.get(LECTURER_PATH.SEARCH_LECTURERS, { params });
};

export const getLecturerByIdApi = (id: number) => {
  return Axios.get(
    LECTURER_PATH.GET_LECTURER_BY_ID.replace(":id", id.toString())
  );
};

export const createLecturerApi = (data: IRequestCreateLecturer) => {
  return Axios.post(LECTURER_PATH.CREATE_LECTURER, data);
};
export const updateLecturerApi = (id: number, data: IRequestUpdateLecturer) => {
  return Axios.put(
    LECTURER_PATH.UPDATE_LECTURER.replace(":id", id.toString()),
    data
  );
};
export const deleteLecturerApi = (id: number) => {
  return Axios.delete(
    LECTURER_PATH.DELETE_LECTURER.replace(":id", id.toString())
  );
};

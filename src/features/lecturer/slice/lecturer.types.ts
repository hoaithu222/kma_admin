import { ReduxStateType } from "@/app/store/types";
import { dataLecturer } from "@/core/api/lecturer/types";

export interface initialStateLecturer {
  lecturer: {
    dataLecturer: dataLecturer[];
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  };
  detailLecturer: dataLecturer | null;
  isEditLecturer: boolean;
  isAddLecturer: boolean;
  isDeleteLecturer: boolean;
  idDeleteLecturer: number | null;
  statusDeleteLecturer: ReduxStateType;
  statusAddLecturer: ReduxStateType;
  statusEditLecturer: ReduxStateType;
  statusGetLecturer: ReduxStateType;
  statusGetDetailLecturer: ReduxStateType;
}

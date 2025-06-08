import { ReduxStateType } from "@/app/store/types";
import { dataLecturer } from "@/core/api/lecturer/types";

export interface initialStateLecturer {
  lecturer: dataLecturer[];
  isEditLecturer: boolean;
  isAddLecturer: boolean;
  isDeleteLecturer: boolean;
  idDeleteLecturer: number | null;
  statusDeleteLecturer: ReduxStateType;
  statusAddLecturer: ReduxStateType;
  statusEditLecturer: ReduxStateType;
  statusGetLecturer: ReduxStateType;
}

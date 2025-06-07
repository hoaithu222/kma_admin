import { ReduxStateType } from "@/app/store/types";

export interface initialStateType {
  majorData: {
    id: number;
    name: string;
    description: string;
  }[];

  isAddMajor: boolean;
  isEditMajor: boolean;
  isDeleteMajor: boolean;
  idDelete: number | null;
  statusAddMajor: ReduxStateType;
  statusEditMajor: ReduxStateType;
  statusDeleteMajor: ReduxStateType;
  statusGetMajor: ReduxStateType;
}

import { ReduxStateType } from "@/app/store/types";

export interface initialStateType {
  submajorData: {
    id: number;
    name: string;
    majorId: number;
  }[];
  isAddSubmajor: boolean;
  isEditSubmajor: boolean;
  isDeleteSubmajor: boolean;
  idDelete: number | null;
  statusAddSubmajor: ReduxStateType;
  statusEditSubmajor: ReduxStateType;
  statusDeleteSubmajor: ReduxStateType;
  statusGetSubmajor: ReduxStateType;
}

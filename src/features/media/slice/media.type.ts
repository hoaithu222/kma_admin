import { ReduxStateType } from "@/app/store/types";

export interface initialStateType {
  media: any[];
  isDeleteMedia: boolean;
  idDeleteMedia: number | null;
  statusGetMedia: ReduxStateType;
}

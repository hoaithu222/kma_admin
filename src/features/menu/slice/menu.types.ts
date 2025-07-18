import { ReduxStateType } from "@/app/store/types";

export interface dataMenu {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
  displayOrder: number;
  level: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  children: dataMenu[];
}

export interface initialState {
  menuCategories: dataMenu[];
  statusGetMenu: ReduxStateType;
  error: string | null;
}

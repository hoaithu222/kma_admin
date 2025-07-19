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
  createdAt?: string;
  updatedAt?: string;
  children: dataMenu[];
}

export interface initialState {
  menuCategories: dataMenu[];
  statusGetMenu: ReduxStateType;
  error: string | null;
  isAddMenu: boolean;
  isEditMenu: boolean;
  menuEdit: dataMenu | null;
  statusAddMenu: ReduxStateType;
  statusEditMenu: ReduxStateType;
  errorAddMenu: string | null;
  errorEditMenu: string | null;
  isDeleteMenu: boolean;
  statusDeleteMenu: ReduxStateType;
  errorDeleteMenu: string | null;
  idMenuDelete: number | null;
  idMenuEdit: number | null;
  statusUpdateMenuOrder: ReduxStateType;
  errorUpdateMenuOrder: string | null;
  visibleMenu: boolean;
  statusVisibleMenu: ReduxStateType;
  statusUpdateMenuVisibility: ReduxStateType;
  errorUpdateMenuVisibility: string | null;
}

import { ReduxStateType } from "@/app/store/types";

export interface IUser {
  id: string;
  username: string;
  active: boolean;
  role: string;
  fullName: string;
  token?: string;
  createdAt?: string;
  session?: any;
}

export interface IUserState {
  users: IUser[];
  isAddUser: boolean;
  isUpdateUser: boolean;
  isDeleteUser: boolean;
  isGetUser: boolean;
  editUser: IUser | null;
  idUpdate: number;
  idDelete: number;
  statusAdd: ReduxStateType;
  statusUpdate: ReduxStateType;
  statusDelete: ReduxStateType;
  isLockUser: boolean;
  lockUser: IUser | null;
}

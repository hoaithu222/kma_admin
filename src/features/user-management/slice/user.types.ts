import { ReduxStateType } from "@/app/store/types";

interface IUser {
  id: string;
  username: string;
  active: boolean;
  role: string;
  fullName: string;
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
}

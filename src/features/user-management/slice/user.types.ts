import { ReduxStateType } from "@/app/store/types";

interface IUser {
  id: string;
  username: string;
  active: boolean;
  role: string;
}

export interface IUserState {
  users: IUser[];
  isModalAddUser: boolean;
  isModalUpdateUser: boolean;
  isModalDeleteUser: boolean;
  editUser: IUser | null;
  isAddUser: ReduxStateType;
  isUpdateUser: ReduxStateType;
  isDeleteUser: ReduxStateType;
  isGetUser: ReduxStateType;
  idUpdate: number;
  idDelete: number;
  nameDelete: string;
  deleteUser: string;
}

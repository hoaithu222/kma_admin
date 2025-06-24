interface IUser {
  id: string;
  username: string;
  active: boolean;
  role: string;
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
}

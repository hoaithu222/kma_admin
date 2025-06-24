import { useDispatch, useSelector } from "react-redux";
import {
  addUserRequest,
  updateUserRequest,
  getUserRequest,
  setIsAddUser,
  setIsDeleteUser,
  setIsUpdateUser,
  setEditUser,
} from "../slice/user.slice";
import {
  selectIsAddUser,
  selectIsUpdateUser,
  selectIdUpdate,
  selectUsers,
  selectIdDelete,
  selectEditUser,
  selectIsDeleteUser,
  selectIsGetUser,
} from "../slice/user.selector";
import { IUser } from "@/features/auth/slice/auth.types";

export const useUser = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isAddUser = useSelector(selectIsAddUser);
  const isUpdateUser = useSelector(selectIsUpdateUser);
  const isDeleteUser = useSelector(selectIsDeleteUser);
  const isGetUser = useSelector(selectIsGetUser);
  const idUpdate = useSelector(selectIdUpdate);
  const idDelete = useSelector(selectIdDelete);

  const editUser = useSelector(selectEditUser);

  const addUser = (username: string, password: string) => {
    dispatch(addUserRequest({ username, password }));
  };

  const updateUser = (id: string, username: string) => {
    dispatch(updateUserRequest({ id, username }));
  };

  const getUser = (active: boolean, page: number, size: number) => {
    dispatch(getUserRequest({ active, page, size }));
  };
  // modal
  const handleAddUser = (isOpen: boolean) => {
    dispatch(setIsAddUser(isOpen));
  };

  const handleUpdateUser = (isOpen: boolean) => {
    dispatch(setIsUpdateUser(isOpen));
  };

  const handleDeleteUser = (isOpen: boolean) => {
    dispatch(setIsDeleteUser(isOpen));
  };

  // Alias for backward compatibility
  const closeModalAddUserDispatch = () => {
    dispatch(setIsAddUser(false));
  };
  const setEditUserDispatch = (user: IUser) => {
    dispatch(setEditUser(user));
  };

  return {
    addUser,
    updateUser,
    getUser,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    closeModalAddUserDispatch, // For backward compatibility
    users,
    isAddUser,
    isUpdateUser,
    isGetUser,
    idUpdate,
    idDelete,
    isDeleteUser,
    editUser,
    setEditUserDispatch,
  };
};

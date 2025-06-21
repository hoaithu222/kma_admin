import { useDispatch, useSelector } from "react-redux";
import {
  addUserRequest,
  deleteUserRequest,
  updateUserRequest,
  getUserRequest,
  updateNameDelete,
  openModalAddUser,
  closeModalAddUser,
  closeModalUpdateUser,
  openModalUpdateUser,
  openModalDeleteUser,
  closeModalDeleteUser,
  updateEditUser,
  updateDelete,
  updateDeleteUser,
} from "../slice/user.slice";
import {
  selectIsAddUser,
  selectIdDeleteUser,
  selectIdGetUser,
  selectIsUpdateUser,
  selectIdUpdate,
  selectUsers,
  selectIdDelete,
  selectIsModalAddUser,
  selectEditUser,
  selectIsModalDeleteUser,
  selectIsModalUpdateUser,
} from "../slice/user.selector";
import { IUser } from "@/features/auth/slice/auth.types";

export const useUser = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isAddUser = useSelector(selectIsAddUser);
  const isUpdateUser = useSelector(selectIsUpdateUser);
  const isDeleteUser = useSelector(selectIdDeleteUser);
  const isGetUser = useSelector(selectIdGetUser);
  const idUpdate = useSelector(selectIdUpdate);
  const idDelete = useSelector(selectIdDelete);
  const isModalAddUser = useSelector(selectIsModalAddUser);
  const isModalUpdateUser = useSelector(selectIsModalUpdateUser);
  const isModalDeleteUser = useSelector(selectIsModalDeleteUser);
  const editUser = useSelector(selectEditUser);

  const addUser = (username: string, password: string) => {
    dispatch(addUserRequest({ username, password }));
  };
  const updateNameDeleteDispatch = (name: string) => {
    dispatch(updateNameDelete(name));
  };

  const updateUser = (username: string) => {
    dispatch(updateUserRequest({ username }));
  };

  const deleteUser = () => {
    dispatch(deleteUserRequest());
  };

  const getUser = (active: boolean, page: number, size: number) => {
    dispatch(getUserRequest({ active, page, size }));
  };

  const updateDeleteDispatch = (id: number) => {
    dispatch(updateDelete(id));
  };

  const openModalAddUserDispatch = () => {
    dispatch(openModalAddUser());
  };
  const closeModalAddUserDispatch = () => {
    dispatch(closeModalAddUser());
  };
  const openModalUpdateUserDispatch = () => {
    dispatch(openModalUpdateUser());
  };
  const closeModalUpdateUserDispatch = () => {
    dispatch(closeModalUpdateUser());
  };
  const openModalDeleteUserDispatch = () => {
    dispatch(openModalDeleteUser());
  };
  const closeModalDeleteUserDispatch = () => {
    dispatch(closeModalDeleteUser());
  };
  const updateEditUserDispatch = (user: IUser) => {
    dispatch(updateEditUser(user));
  };
  const handleIdDelete = (id: number) => {
    dispatch(updateDelete(id));
  };
  const updateDeleteUserDispatch = (username: string) => {
    dispatch(updateDeleteUser(username));
  };

  return {
    addUser,
    updateUser,
    deleteUser,
    getUser,

    updateNameDeleteDispatch,
    updateDeleteDispatch,
    users,
    isAddUser,
    isUpdateUser,
    isDeleteUser,
    isGetUser,
    idUpdate,
    idDelete,
    openModalAddUserDispatch,
    closeModalAddUserDispatch,
    openModalUpdateUserDispatch,
    closeModalUpdateUserDispatch,
    openModalDeleteUserDispatch,
    closeModalDeleteUserDispatch,
    updateEditUserDispatch,
    isModalAddUser,
    isModalUpdateUser,
    isModalDeleteUser,
    editUser,
    handleIdDelete,
    updateDeleteUserDispatch,
  };
};

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
  selectStatusDelete,
  selectStatusAdd,
  selectStatusUpdate,
} from "../slice/user.selector";
import { IUser } from "@/features/auth/slice/auth.types";
import { IRequestUpdateUser } from "@/core/api/auth/types";

export const useUser = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isAddUser = useSelector(selectIsAddUser);
  const isUpdateUser = useSelector(selectIsUpdateUser);
  const isDeleteUser = useSelector(selectIsDeleteUser);
  const isGetUser = useSelector(selectIsGetUser);
  const idUpdate = useSelector(selectIdUpdate);
  const idDelete = useSelector(selectIdDelete);
  const statusAdd = useSelector(selectStatusAdd);
  const statusUpdate = useSelector(selectStatusUpdate);
  const statusDelete = useSelector(selectStatusDelete);

  const editUser = useSelector(selectEditUser);

  const addUser = (username: string, password: string, fullName: string) => {
    dispatch(addUserRequest({ username, password, fullName, active: true }));
  };

  const updateUser = (id: string, data: IRequestUpdateUser) => {
    dispatch(updateUserRequest({ id, ...data }));
  };

  const getUser = () => {
    dispatch(getUserRequest({}));
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
  // cập nhật active user
  const handleChangeActive = (user: IUser) => {
    dispatch(
      updateUserRequest({
        id: user.id,
        username: user.username,
        active: !user.active,
      })
    );
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
    statusAdd,
    statusUpdate,
    statusDelete,

    setEditUserDispatch,
    handleChangeActive,
  };
};

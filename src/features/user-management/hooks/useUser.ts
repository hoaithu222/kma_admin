import { useDispatch, useSelector } from "react-redux";
import {
  addUserRequest,
  updateUserRequest,
  getUserRequest,
  setIsAddUser,
  setIsDeleteUser,
  setIsUpdateUser,
  setEditUser,
  setIsLockUser,
  setLockUser,
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
  selectIsLockUser,
  selectLockUser,
} from "../slice/user.selector";
import { IRequestUpdateUser } from "@/core/api/auth/types";
import { IUser } from "../slice/user.types";

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
  const isLockUser = useSelector(selectIsLockUser);
  const lockUser = useSelector(selectLockUser);

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

  const handleLockUser = (isOpen: boolean) => {
    dispatch(setIsLockUser(isOpen));
  };

  const handleSetLockUser = (user: IUser) => {
    dispatch(setLockUser(user));
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
    handleLockUser,
    handleSetLockUser,
    isLockUser,
    lockUser,
  };
};

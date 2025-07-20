import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";
import Button from "@/foundation/components/buttons/Button";
import { EditIcon, LockIcon, Trash2Icon, UnlockIcon } from "lucide-react";
import EditUser from "./EditUser";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";
import {
  deleteUserRequest,
  setEditUser,
  updateDeleteId,
} from "../slice/user.slice";
import { useDispatch } from "react-redux";
import LoadingPage from "@/foundation/components/loading/LoadingPage";

const ListUser = () => {
  const dispatch = useDispatch();
  const {
    users,
    getUser,
    handleUpdateUser,
    handleDeleteUser,
    isUpdateUser,
    isDeleteUser,
    isGetUser,
    statusUpdate,
    statusDelete,
    statusAdd,
    idDelete,
    handleChangeActive,
    handleLockUser,
    handleSetLockUser,
    isLockUser,
    lockUser,
  } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  const handleDeleteClick = (user: any) => {
    dispatch(updateDeleteId(Number(user.id)));
    handleDeleteUser(true);
  };

  const handleEditClick = (user: any) => {
    dispatch(setEditUser(user));
    handleUpdateUser(true);
  };

  const handleConfirmDelete = () => {
    if (idDelete) {
      dispatch(deleteUserRequest(Number(idDelete)));
    }
    handleDeleteUser(false);
  };

  const handleLockClick = (user: any) => {
    handleSetLockUser(user);
    handleLockUser(true);
  };

  const handleConfirmLock = () => {
    if (lockUser) {
      handleChangeActive(lockUser);
    }
    handleLockUser(false);
  };
  // call lại getUser khi sửa hoặc xóa
  useEffect(() => {
    getUser();
  }, [statusUpdate, statusDelete, statusAdd]);

  const columns = [
    {
      key: "id",
      title: "ID",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },

    {
      key: "username",
      title: "Tên người dùng",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },
    {
      key: "fullName",
      title: "Họ và tên",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },
    {
      key: "role",
      title: "Vai trò",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },

    {
      key: "createdAt",
      title: "Ngày tạo",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },
    {
      key: "action",
      title: "Hành động",
      width: "100px",
      render: (_value: any, record: any, _index: number) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="success"
              size="small"
              iconLeft={<EditIcon className="w-4 h-4" />}
              onClick={() => handleEditClick(record)}
            />
            <Button
              variant="secondary"
              size="small"
              iconLeft={<Trash2Icon className="w-4 h-4" />}
              onClick={() => handleDeleteClick(record)}
            />
            {/* active user or not */}
            <Button
              variant="secondary"
              size="small"
              iconLeft={
                record.active ? (
                  <LockIcon className="w-4 h-4" />
                ) : (
                  <UnlockIcon className="w-4 h-4" />
                )
              }
              onClick={() => handleLockClick(record)}
            />
          </div>
        );
      },
    },
  ];

  if (isGetUser) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Table
        columns={columns}
        data={users || []}
        emptyText={<Empty variant="data" />}
        hoverColor="accent"
        pageSize={15}
        pagination={true}
        hover={true}
        hoverEffect="border"
        hoverIntensity="medium"
        size="medium"
        striped={true}
      />
      {isUpdateUser && <EditUser />}
      {isDeleteUser && (
        <ModalConfirm
          isOpen={true}
          onClose={() => handleDeleteUser(false)}
          onConfirm={handleConfirmDelete}
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa người dùng này không?"
        />
      )}
      {isLockUser && lockUser && (
        <ModalConfirm
          isOpen={true}
          onClose={() => handleLockUser(false)}
          onConfirm={handleConfirmLock}
          title={lockUser.active ? "Xác nhận khóa" : "Xác nhận mở khóa"}
          message={
            lockUser.active
              ? "Bạn có chắc chắn muốn khóa người dùng này không?"
              : "Bạn có chắc chắn muốn mở khóa người dùng này không?"
          }
        />
      )}
    </div>
  );
};

export default ListUser;

import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";
import Button from "@/foundation/components/buttons/Button";
import { EditIcon, Trash2Icon } from "lucide-react";
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
    idDelete,
  } = useUser();

  useEffect(() => {
    getUser(true, 0, 10);
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
      render: (value: any, _record: any, _index: number) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="success"
              size="small"
              iconLeft={<EditIcon className="w-4 h-4" />}
              onClick={() => handleEditClick(value)}
            />
            <Button
              variant="secondary"
              size="small"
              iconLeft={<Trash2Icon className="w-4 h-4" />}
              onClick={() => handleDeleteClick(value)}
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
    </div>
  );
};

export default ListUser;

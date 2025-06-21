import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";
import { ReduxStateType } from "@/app/store/types";
import Button from "@/foundation/components/buttons/Button";
import { EditIcon, Trash2Icon } from "lucide-react";
import EditUser from "./EditUser";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";

const ListUser = () => {
  const {
    users,
    isGetUser,
    getUser,
    openModalUpdateUserDispatch,
    openModalDeleteUserDispatch,
    updateEditUserDispatch,
    updateDeleteDispatch,
    isModalUpdateUser,
    isModalDeleteUser,
    closeModalDeleteUserDispatch,

    updateDeleteUserDispatch,

    deleteUser,
  } = useUser();

  useEffect(() => {
    getUser(true, 0, 10);
  }, []);

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
              onClick={() => {
                openModalUpdateUserDispatch();
                updateDeleteDispatch(value.id);
                updateEditUserDispatch(value);
              }}
            />
            <Button
              variant="secondary"
              size="small"
              iconLeft={<Trash2Icon className="w-4 h-4" />}
              onClick={() => {
                openModalDeleteUserDispatch();
                updateDeleteDispatch(value.id);
                updateDeleteUserDispatch(value.username);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={users}
        emptyText={<Empty variant="data" />}
        hoverColor="accent"
        pageSize={15}
        pagination={true}
        hover={true}
        hoverEffect="border"
        loading={isGetUser === ReduxStateType.LOADING}
        hoverIntensity="medium"
        size="medium"
        striped={true}
      />
      {isModalUpdateUser && <EditUser />}
      {isModalDeleteUser && (
        <ModalConfirm
          isOpen={true}
          onClose={() => {
            closeModalDeleteUserDispatch();
          }}
          onConfirm={() => {
            deleteUser();
            closeModalDeleteUserDispatch();
          }}
        />
      )}
    </div>
  );
};

export default ListUser;

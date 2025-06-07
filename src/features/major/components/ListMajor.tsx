import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md";

import { useEffect } from "react";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";

import Button from "@/foundation/components/buttons/Button";
import { useMajor } from "../hooks/useMajor";
import { IRequestUpdateMajor } from "@/core/api/major/types";
import { setIdDeleteMajor } from "../slice/major.slice";
import EditMajor from "./EditMajor";

const ListMajor = () => {
  const {
    majorData,
    isDeleteMajor,
    idDelete,
    isEditMajor,
    handleChangeEditMajor,
    handleChangeDeleteMajor,
    deleteMajor,
    getMajors,
  } = useMajor();

  const dispatch = useDispatch();
  const [major, setMajor] = useState<IRequestUpdateMajor | null>(null);

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
      key: "name",
      title: "Name",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },
    {
      key: "description",
      title: "Description",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },

    {
      key: "action",
      title: "Action",
      width: "100px",
      render: (_value: any, record: any, _index: number) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="success"
              size="small"
              iconLeft={<MdModeEdit className="text-xl text-white" />}
              shape="round"
              onClick={() => {
                setMajor(record);
                handleChangeEditMajor(true);
              }}
            ></Button>
            <Button
              variant="danger"
              size="small"
              iconLeft={
                <MdOutlineDeleteForever className="text-xl text-white" />
              }
              shape="round"
              onClick={() => {
                dispatch(setIdDeleteMajor(record.id));
                handleChangeDeleteMajor(true);
              }}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getMajors();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={majorData}
        emptyText={<Empty variant="data" />}
        pageSize={10}
        pagination={true}
        hover={true}
        size="medium"
        striped={true}
      />

      {isDeleteMajor && (
        <ModalConfirm
          title="Xóa chuyên ngành"
          onConfirm={() => {
            deleteMajor(idDelete as number);
            setIdDeleteMajor(null);
          }}
          isOpen={true}
          onClose={() => handleChangeDeleteMajor(false)}
        />
      )}
      {isEditMajor && major && <EditMajor major={major} />}
    </div>
  );
};

export default ListMajor;

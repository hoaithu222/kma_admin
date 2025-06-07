import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md";

import { useEffect } from "react";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";

import Button from "@/foundation/components/buttons/Button";

import { useSubmajor } from "../hooks/useSubmajor";
import { dataSubMajor } from "@/core/api/sub-major/types";
import { setIdDeleteSubmajor } from "../slice/submajor.slice";
import EditSubMajor from "./EditSubMajor";

const ListSubMajor = () => {
  const {
    submajorData,
    isDeleteSubmajor,
    idDelete,
    isEditSubmajor,
    handleChangeEditSubmajor,
    handleChangeDeleteSubmajor,
    deleteSubmajor,
    getSubmajor,
  } = useSubmajor();

  const dispatch = useDispatch();
  const [submajor, setSubmajor] = useState<dataSubMajor | null>(null);

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
      title: "Tên chuyên ngành",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },
    {
      key: "majorId",
      title: "Chuyên ngành cha",
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
                if (record.id) {
                  setSubmajor(record);
                  handleChangeEditSubmajor(true);
                }
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
                dispatch(setIdDeleteSubmajor(record.id));
                handleChangeDeleteSubmajor(true);
              }}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getSubmajor();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={submajorData}
        emptyText={<Empty variant="data" />}
        pageSize={10}
        pagination={true}
        hover={true}
        size="medium"
        striped={true}
      />

      {isDeleteSubmajor && (
        <ModalConfirm
          title="Xóa chuyên ngành"
          onConfirm={() => {
            deleteSubmajor(idDelete as number);
            setIdDeleteSubmajor(null);
          }}
          isOpen={true}
          onClose={() => handleChangeDeleteSubmajor(false)}
        />
      )}
      {isEditSubmajor && submajor && <EditSubMajor submajor={submajor} />}
    </div>
  );
};

export default ListSubMajor;

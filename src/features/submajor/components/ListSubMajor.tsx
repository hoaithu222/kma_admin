import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md";

import { useEffect } from "react";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";

import Button from "@/foundation/components/buttons/Button";
import Select from "@/foundation/components/inputs/SelectOption";

import { useSubmajor } from "../hooks/useSubmajor";
import { dataSubMajor } from "@/core/api/sub-major/types";
import { setIdDeleteSubmajor } from "../slice/submajor.slice";
import EditSubMajor from "./EditSubMajor";
import { useMajor } from "@/features/major/hooks/useMajor";

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
  const { majorData, getMajors } = useMajor();
  const [selectedMajorId, setSelectedMajorId] = useState<string>("");

  const filteredSubmajors = selectedMajorId
    ? submajorData.filter((item) => String(item.majorId) === selectedMajorId)
    : submajorData;
  console.log(majorData);

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
      key: "majorName",
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
    getMajors();
  }, []);

  return (
    <div>
      <div className="mb-4 w-64">
        <Select
          options={majorData.map((major) => ({
            label: major.name,
            value: major.id.toString(),
          }))}
          placeholder="Chọn chuyên ngành cha"
          name="majorId"
          value={selectedMajorId}
          onChange={(value) => setSelectedMajorId(value)}
          fullWidth={true}
        />
      </div>
      <Table
        columns={columns}
        data={filteredSubmajors}
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

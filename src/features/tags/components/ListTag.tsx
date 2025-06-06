import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useTag from "../hooks/useTag";
import moment from "moment";
import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md";
import { setIdDelete } from "../slice/tag.slice";
import { useEffect } from "react";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";
import EditTag from "./EditTag";
import { selectTags } from "../slice/tag.selector";
import { IRequestUpdateTag } from "@/core/api/tags/types";

const ListTag = () => {
  const {
    isDeleteTag,
    handleEditTag,
    handleDeleteTag,
    handleDeleteTagApi,
    handleGetAllTags,
    isEditTag,
    idDelete,
  } = useTag();
  const tags = useSelector(selectTags);

  const dispatch = useDispatch();
  const [tag, setTag] = useState<IRequestUpdateTag | null>(null);

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
      key: "createdAt",
      title: "Created At",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{moment(value).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      key: "action",
      title: "Action",
      width: "100px",
      render: (_value: any, record: any, _index: number) => {
        return (
          <div className="flex gap-2">
            <MdModeEdit
              className="text-xl cursor-pointer text-secondary"
              onClick={() => {
                setTag(record);
                handleEditTag(true);
              }}
            />
            <MdOutlineDeleteForever
              className="text-xl cursor-pointer text-error"
              onClick={() => {
                dispatch(setIdDelete(record.id));
                handleDeleteTag();
              }}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    handleGetAllTags();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={tags}
        emptyText={<Empty variant="data" />}
        hoverColor="accent"
        hover={true}
        hoverEffect="border"
        hoverIntensity="strong"
        size="small"
        striped={true}
      />

      {isDeleteTag && (
        <ModalConfirm
          title="Xóa tag"
          onConfirm={() => {
            handleDeleteTagApi({ id: idDelete as number });
            handleDeleteTag();
            setIdDelete(null);
          }}
          isOpen={true}
          onClose={() => handleDeleteTag()}
        />
      )}
      {isEditTag && tag && <EditTag tag={tag} />}
    </div>
  );
};

export default ListTag;

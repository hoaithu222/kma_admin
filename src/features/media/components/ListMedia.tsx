import Table from "@/foundation/components/table/Table";
import { useMedia } from "../hooks/useMedia";
import { ReduxStateType } from "@/app/store/types";
import { useEffect, useState } from "react";

import Empty from "@/foundation/components/empty/Empty";
import { FileIcon, TrashIcon } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";
import { setIdDeleteMedia } from "../slice/media.slice";
import { useDispatch } from "react-redux";

const ListMedia = () => {
  const [page, _setPage] = useState(0);
  const [pageSize, _setPageSize] = useState(10);
  const {
    media,
    getMediaStatus,
    getMediaDispatch,
    handleConfirmDeleteMedia,
    handleCancelDeleteMedia,

    isDeleteMedia,
    idDeleteMedia,
    deleteMediaDispatch,
  } = useMedia();
  const dispatch = useDispatch();
  useEffect(() => {
    getMediaDispatch(page, pageSize);
  }, [page, pageSize]);

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
      key: "originalName",
      title: "Original Name",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div className="truncate text-text-primary">{value}</div>;
      },
    },
    {
      key: "filePath",
      title: "File Path",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 ">
              <FileIcon className="w-4 h-4 text-primary" />
              <a
                href={`${import.meta.env.VITE_API_URL_FILE}/${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-text-secondary"
              >
                {value}
              </a>
            </div>
          </div>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      width: "100px",
      render: (_value: any, record: any, _index: number) => {
        return (
          <div>
            <Button
              variant="danger"
              size="small"
              iconLeft={<TrashIcon className="w-4 h-4 text-white" />}
              shape="round"
              onClick={() => {
                dispatch(setIdDeleteMedia(record.id));
                handleConfirmDeleteMedia();
              }}
            ></Button>
          </div>
        );
      },
    },
    {
      key: "fileType",
      title: "File Type",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },
    {
      key: "fileSize",
      title: "File Size",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return <div>{value}</div>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Table
        columns={columns}
        data={media}
        loading={getMediaStatus === ReduxStateType.LOADING}
        emptyText={<Empty variant="data" />}
        hover={true}
        striped={true}
        pagination={true}
        pageSize={pageSize}
        bordered={true}
      />
      {isDeleteMedia && (
        <ModalConfirm
          isOpen={isDeleteMedia}
          onClose={handleCancelDeleteMedia}
          onConfirm={() => {
            deleteMediaDispatch(idDeleteMedia as number);
            handleCancelDeleteMedia();
          }}
          title="Xóa media"
          message="Bạn có chắc chắn muốn xóa media này không?"
          confirmText="Xóa"
          cancelText="Hủy"
          type="danger"
        />
      )}
    </div>
  );
};

export default ListMedia;

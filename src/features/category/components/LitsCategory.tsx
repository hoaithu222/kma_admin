import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";
import { useCategory } from "../hooks/useCategory";
import { useEffect, useState } from "react";
import moment from "moment";

import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md";
import EditCategory from "./EditCategory";
import { Category } from "../slice/category.type";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";

const LitsCategory = () => {
  const {
    getCategoriesAction,
    categories,
    isEditCategory,
    isConfirmDeleteCategory,
    handleEditCategory,
    handleConfirmDeleteCategory,
    handleDeleteCategory,
  } = useCategory();
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const columns = [
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
              className="text-xl text-secondary"
              onClick={() => {
                setEditCategory(record);
                handleEditCategory(true);
              }}
            />
            <MdOutlineDeleteForever
              className="text-xl text-error"
              onClick={() => {
                setIdDelete(record.id);
                handleConfirmDeleteCategory(true);
              }}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getCategoriesAction();
  }, [isConfirmDeleteCategory]);

  return (
    <div>
      <Table
        columns={columns}
        data={categories}
        emptyText={<Empty variant="data" />}
        pagination={true}
        pageSize={10}
        striped={true}
        bordered={true}
        hover={true}
        size="small"
        onRowClick={() => {}}
      />
      {isEditCategory && editCategory && (
        <EditCategory category={editCategory} />
      )}
      {isConfirmDeleteCategory && (
        <ModalConfirm
          isOpen={isConfirmDeleteCategory}
          onClose={() => handleConfirmDeleteCategory(false)}
          onConfirm={() => {
            handleDeleteCategory(idDelete as string);
            handleConfirmDeleteCategory(false);
            setIdDelete(null);
          }}
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa danh mục này?"
          confirmText="Xóa"
          cancelText="Hủy"
          type="danger"
        />
      )}
    </div>
  );
};

export default LitsCategory;

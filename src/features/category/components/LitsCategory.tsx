import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";
import { useCategory } from "../hooks/useCategory";
import { useEffect, useState } from "react";
import moment from "moment";

import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md";
import EditCategory from "./EditCategory";
import { Category } from "../slice/category.type";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { idDeleteSelector } from "../slice/category.selector";
import { setIdDelete } from "../slice/category.slice";
import Button from "@/foundation/components/buttons/Button";

const LitsCategory = () => {
  const {
    categories,
    isEditCategory,
    isConfirmDeleteCategory,
    handleEditCategory,
    handleConfirmDeleteCategory,
    handleDeleteCategory,
    getCategoriesAction,
  } = useCategory();
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const dispatch = useDispatch();
  const idDelete = useSelector(idDeleteSelector);
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
            <Button
              variant="success"
              size="small"
              iconLeft={<MdModeEdit className="text-xl text-white" />}
              shape="round"
              onClick={() => {
                setEditCategory(record);
                handleEditCategory(true);
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
                dispatch(setIdDelete(record.id));
                handleConfirmDeleteCategory(true);
              }}
            ></Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getCategoriesAction();
  }, []);

  return (
    <div>
      <Table
        columns={columns}
        data={categories}
        emptyText={<Empty variant="data" />}
        pagination={true}
        pageSize={15}
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

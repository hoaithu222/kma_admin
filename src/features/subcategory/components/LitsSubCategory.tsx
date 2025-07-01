import Empty from "@/foundation/components/empty/Empty";
import Table from "@/foundation/components/table/Table";
import { useSubcategory } from "../hooks/useSubcategory";
import { useEffect, useState } from "react";
import { MdModeEdit, MdOutlineDeleteForever } from "react-icons/md";
import moment from "moment";
import { Subcategory } from "../slice/subcategory.type";

import { useCategory } from "@/features/category/hooks/useCategory";
import EditSubCategory from "./EditSubCategory";

import ModalConfirm from "@/foundation/components/modal/ModalConfirm";
import { setIdDelete } from "../slice/subcategory.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  idDeleteSelector,
  selectSubcategories,
} from "../slice/subcategory.selector";
import Button from "@/foundation/components/buttons/Button";

const LitsSubCategory = () => {
  const {
    isEditSubcategory,
    isDeleteSubcategory,
    handleEditSubcategory,
    handleDeleteSubcategory,
    handleDeleteSubcategoryAction,
    getAllSubcategoriesAction,
  } = useSubcategory();
  const { getCategoriesAction } = useCategory();
  const [editSubcategory, setEditSubcategory] = useState<Subcategory | null>(
    null
  );
  const dispatch = useDispatch();
  const subcategories = useSelector(selectSubcategories);
  const idDelete = useSelector(idDeleteSelector);
  const { categories } = useCategory();

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
      key: "categoryId",
      title: "Category",
      width: "100px",
      render: (value: any, _record: any, _index: number) => {
        return (
          <div>
            {categories.find((category) => category.id === value)?.name}
          </div>
        );
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
                setEditSubcategory(record);
                handleEditSubcategory(true);
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
                handleDeleteSubcategory(true);
              }}
            />
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getAllSubcategoriesAction();
    getCategoriesAction();
  }, []);
  return (
    <div>
      <Table
        columns={columns}
        data={subcategories}
        emptyText={<Empty variant="data" />}
        pagination={true}
        pageSize={10}
        hover={true}
        size="small"
        striped={true}
      />
      {isEditSubcategory && editSubcategory && (
        <EditSubCategory subcategory={editSubcategory} />
      )}
      {isDeleteSubcategory && (
        <ModalConfirm
          title="Xóa danh mục con"
          onConfirm={() => {
            handleDeleteSubcategoryAction(idDelete as string);
            handleDeleteSubcategory(false);
            setIdDelete(null);
          }}
          isOpen={true}
          onClose={() => handleDeleteSubcategory(false)}
        />
      )}
    </div>
  );
};

export default LitsSubCategory;

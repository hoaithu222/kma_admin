import { useDispatch, useSelector } from "react-redux";
import {
  addSubcategory,
  deleteSubcategory,
  editSubcategory,
  getAllSubcategories,
  getSubcategories,
  setIsAddSubcategory,
  setIsDeleteSubcategory,
  setIsEditSubcategory,
} from "../slice/subcategory.slice";
import {
  isAddSubcategorySelector,
  isEditSubcategorySelector,
  selectSubcategories,
  isDeleteSubcategorySelector,
} from "../slice/subcategory.selector";
import {
  IRequestAddSubcategory,
  IRequestEditSubcategory,
} from "@/core/api/subcategory/types";

export const useSubcategory = () => {
  const dispatch = useDispatch();

  const isAddSubcategory = useSelector(isAddSubcategorySelector);
  const isEditSubcategory = useSelector(isEditSubcategorySelector);
  const isDeleteSubcategory = useSelector(isDeleteSubcategorySelector);
  const isConfirmDeleteSubcategory = useSelector(isDeleteSubcategorySelector);
  const subcategories = useSelector(selectSubcategories);
  const getSubcategoriesAction = () => {
    dispatch(getSubcategories());
  };
  const handleAddSubcategory = (action: boolean) => {
    dispatch(setIsAddSubcategory(action));
  };
  const getAllSubcategoriesAction = () => {
    dispatch(getAllSubcategories());
  };
  const handleEditSubcategory = (action: boolean) => {
    dispatch(setIsEditSubcategory(action));
  };
  const handleDeleteSubcategory = (action: boolean) => {
    dispatch(setIsDeleteSubcategory(action));
  };
  const handleAddSubcategoryAction = (data: IRequestAddSubcategory) => {
    dispatch(addSubcategory(data));
  };
  const handleEditSubcategoryAction = (data: IRequestEditSubcategory) => {
    dispatch(editSubcategory(data));
  };
  const handleDeleteSubcategoryAction = (id: string) => {
    dispatch(deleteSubcategory(id));
  };

  return {
    isAddSubcategory,
    isEditSubcategory,
    isDeleteSubcategory,
    isConfirmDeleteSubcategory,
    subcategories,
    getSubcategoriesAction,
    handleAddSubcategory,
    getAllSubcategoriesAction,
    handleEditSubcategory,
    handleDeleteSubcategory,
    handleAddSubcategoryAction,
    handleEditSubcategoryAction,
    handleDeleteSubcategoryAction,
  };
};

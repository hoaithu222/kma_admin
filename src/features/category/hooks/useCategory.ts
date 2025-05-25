import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryRequest,
  deleteCategoryRequest,
  editCategoryRequest,
  getCategories,
  setConfirmDeleteCategory,
  setIsAddCategory,
  setIsEditCategory,
} from "../slice/category.slice";
import {
  isAddCategorySelector,
  selectCategories,
  isEditCategorySelector,
  isConfirmDeleteCategorySelector,
} from "../slice/category.selector";
import {
  IRequestCreateCategory,
  IRequestUpdateCategory,
} from "@/core/api/category/types";

export const useCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const getCategoriesAction = () => {
    dispatch(getCategories());
  };
  const isAddCategory = useSelector(isAddCategorySelector);
  const isEditCategory = useSelector(isEditCategorySelector);
  const isConfirmDeleteCategory = useSelector(isConfirmDeleteCategorySelector);
  const handleAddCategory = (action: boolean) => {
    dispatch(setIsAddCategory(action));
  };
  const handleEditCategory = (action: boolean) => {
    dispatch(setIsEditCategory(action));
  };
  const addCategoryDispatch = (data: IRequestCreateCategory) => {
    dispatch(addCategoryRequest(data));
  };
  const editCategoryDispatch = (data: IRequestUpdateCategory) => {
    dispatch(editCategoryRequest(data));
  };
  const handleConfirmDeleteCategory = (action: boolean) => {
    dispatch(setConfirmDeleteCategory(action));
  };
  const handleDeleteCategory = (id: string) => {
    dispatch(deleteCategoryRequest(id));
  };
  return {
    isAddCategory,
    isEditCategory,
    isConfirmDeleteCategory,
    getCategoriesAction,
    handleAddCategory,
    categories,
    addCategoryDispatch,
    editCategoryDispatch,
    handleEditCategory,
    handleConfirmDeleteCategory,
    handleDeleteCategory,
  };
};

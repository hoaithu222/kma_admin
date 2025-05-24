import { useDispatch, useSelector } from "react-redux";
import { getCategories, setIsAddCategory } from "../slice/category.slice";
import { isAddCategorySelector } from "../slice/category.selector";

export const useCategory = () => {
  const dispatch = useDispatch();

  const getCategoriesAction = () => {
    dispatch(getCategories());
  };
  const isAddCategory = useSelector(isAddCategorySelector);
  const handleAddCategory = (action: boolean) => {
    dispatch(setIsAddCategory(action));
  };
  return {
    isAddCategory,
    getCategoriesAction,
    handleAddCategory,
  };
};

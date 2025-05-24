import { useDispatch, useSelector } from "react-redux";
import {
  getSubcategories,
  setIsAddSubcategory,
} from "../slice/subcategory.slice";
import { isAddSubcategorySelector } from "../slice/subcategory.selector";

export const useSubcategory = () => {
  const dispatch = useDispatch();

  const getSubcategoriesAction = () => {
    dispatch(getSubcategories());
  };
  const isAddSubcategory = useSelector(isAddSubcategorySelector);
  const handleAddSubcategory = (action: boolean) => {
    dispatch(setIsAddSubcategory(action));
  };
  return {
    isAddSubcategory,
    getSubcategoriesAction,
    handleAddSubcategory,
  };
};

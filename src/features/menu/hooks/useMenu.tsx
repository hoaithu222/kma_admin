import { useSelector } from "react-redux";
import {
  selectErrorSelector,
  selectStatusGetMenuSelector,
} from "../slice/menu.selector";
import { getMenu } from "../slice/menu.slice";
import { useDispatch } from "react-redux";
import { selectMenuSelector } from "../slice/menu.selector";

export const useMenu = () => {
  const dispatch = useDispatch();
  const menu = useSelector(selectMenuSelector);
  const statusGetMenu = useSelector(selectStatusGetMenuSelector);
  const error = useSelector(selectErrorSelector);

  const handleGetMenu = () => {
    dispatch(getMenu());
  };

  return { menu, statusGetMenu, error, handleGetMenu };
};

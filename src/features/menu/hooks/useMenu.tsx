import { useSelector } from "react-redux";
import {
  selectErrorSelector,
  selectIsAddMenuSelector,
  selectIsEditMenuSelector,
  selectMenuEditSelector,
  selectStatusGetMenuSelector,
  selectIsDeleteMenuSelector,
  selectIdMenuDeleteSelector,
  selectIdMenuEditSelector,
  selectStatusAddMenuSelector,
  selectStatusEditMenuSelector,
  selectStatusDeleteMenuSelector,
} from "../slice/menu.selector";
import {
  addMenu,
  closeModalAddMenu,
  closeModalDeleteMenu,
  closeModalEditMenu,
  deleteMenu,
  editMenu,
  getMenu,
  openModalAddMenu,
  openModalDeleteMenu,
  openModalEditMenu,
  setIdMenuDelete,
  setIdMenuEdit,
  setMenuEdit,
  updateMenuOrder,
  updateMenuVisibility,
} from "../slice/menu.slice";
import { useDispatch } from "react-redux";
import { selectMenuSelector } from "../slice/menu.selector";

export const useMenu = () => {
  const dispatch = useDispatch();
  const menu = useSelector(selectMenuSelector);
  const statusGetMenu = useSelector(selectStatusGetMenuSelector);
  const isAddMenu = useSelector(selectIsAddMenuSelector);
  const isEditMenu = useSelector(selectIsEditMenuSelector);
  const isDeleteMenu = useSelector(selectIsDeleteMenuSelector);
  const menuEdit = useSelector(selectMenuEditSelector);
  const idMenuDelete = useSelector(selectIdMenuDeleteSelector);
  const idMenuEdit = useSelector(selectIdMenuEditSelector);
  const statusAddMenu = useSelector(selectStatusAddMenuSelector);
  const statusEditMenu = useSelector(selectStatusEditMenuSelector);
  const statusDeleteMenu = useSelector(selectStatusDeleteMenuSelector);
  const error = useSelector(selectErrorSelector);

  const handleGetMenu = () => {
    dispatch(getMenu());
  };

  // thêm menu
  const handleAddMenu = () => {
    dispatch(openModalAddMenu());
  };

  // close modal add menu
  const handleCloseModalAddMenu = () => {
    dispatch(closeModalAddMenu());
  };

  // open modal edit menu
  const handleEditMenu = () => {
    dispatch(openModalEditMenu());
  };

  // close modal edit menu
  const handleCloseModalEditMenu = () => {
    dispatch(closeModalEditMenu());
  };

  // open modal delete menu
  const handleDeleteMenu = () => {
    dispatch(openModalDeleteMenu());
  };

  // close modal delete menu
  const handleCloseModalDeleteMenu = () => {
    dispatch(closeModalDeleteMenu());
  };

  // thêm menu
  const handleAddMenuAction = (data: {
    name: string;
    description: string;
    parentId: number | null;
    displayOrder: number;
    level: number;
    isVisible: boolean;
    children: Array<{
      name: string;
      description: string;
      parentId: number;
      displayOrder: number;
      level: number;
      isVisible: boolean;
      children: any[];
    }>;
  }) => {
    dispatch(addMenu(data as any));
  };

  // sửa menu
  const handleEditMenuAction = (
    id: number,
    data: {
      name: string;
      description: string;
      parentId: number | null;
      displayOrder: number;
      level: number;
      isVisible: boolean;
      children: Array<{
        name: string;
        description: string;
        parentId: number;
        displayOrder: number;
        level: number;
        isVisible: boolean;
        children: any[];
      }>;
    }
  ) => {
    dispatch(editMenu({ id, data } as any));
  };

  // xóa menu
  const handleDeleteMenuAction = () => {
    if (idMenuDelete) {
      dispatch(deleteMenu(idMenuDelete));
    }
  };

  // cập nhật thứ tự menu
  const handleUpdateMenuOrderAction = (id: number, newOrder: number) => {
    dispatch(updateMenuOrder({ id, data: { newOrder } } as any));
  };

  // cập nhật trạng thái menu
  const handleUpdateMenuVisibilityAction = (id: number) => {
    dispatch(updateMenuVisibility({ id } as any));
  };

  // cập nhật id menu edit
  const handleSetIdMenuEdit = (id: number) => {
    dispatch(setIdMenuEdit(id));

    // Recursively search for menu item including nested children
    const findMenuItem = (items: any[]): any => {
      for (const item of items) {
        if (item.id === id) {
          return item;
        }
        if (item.children && item.children.length > 0) {
          const found = findMenuItem(item.children);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    const menuItem = findMenuItem(menu);
    if (menuItem) {
      dispatch(setMenuEdit(menuItem));
    }
  };

  // cập nhật id menu delete
  const handleSetIdMenuDelete = (id: number) => {
    dispatch(setIdMenuDelete(id));
  };

  return {
    menu,
    statusGetMenu,
    statusAddMenu,
    statusEditMenu,
    statusDeleteMenu,
    error,
    handleGetMenu,
    handleAddMenu,
    handleEditMenu,
    handleCloseModalAddMenu,
    handleCloseModalEditMenu,
    handleDeleteMenu,
    handleCloseModalDeleteMenu,
    handleAddMenuAction,
    handleEditMenuAction,
    handleDeleteMenuAction,
    handleUpdateMenuOrderAction,
    handleUpdateMenuVisibilityAction,
    handleSetIdMenuEdit,
    handleSetIdMenuDelete,
    isAddMenu,
    isEditMenu,
    isDeleteMenu,
    menuEdit,
    idMenuDelete,
    idMenuEdit,
  };
};

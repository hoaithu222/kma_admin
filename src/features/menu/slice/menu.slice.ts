import { initialState as initialStateType } from "./menu.types";
import { ReduxStateType } from "@/app/store/types";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: initialStateType = {
  menuCategories: [],
  statusGetMenu: ReduxStateType.INIT,
  error: null,
  isAddMenu: false,
  isEditMenu: false,
  menuEdit: null,
  statusAddMenu: ReduxStateType.INIT,
  statusEditMenu: ReduxStateType.INIT,
  errorAddMenu: null,
  errorEditMenu: null,
  isDeleteMenu: false,
  statusDeleteMenu: ReduxStateType.INIT,
  errorDeleteMenu: null,
  idMenuDelete: null,
  idMenuEdit: null,
  statusUpdateMenuOrder: ReduxStateType.INIT,
  errorUpdateMenuOrder: null,
  visibleMenu: false,
  statusVisibleMenu: ReduxStateType.INIT,
  statusUpdateMenuVisibility: ReduxStateType.INIT,
  errorUpdateMenuVisibility: null,
};

const { slice, reducer } = createResettableSlice({
  name: "menu",
  initialState,
  reducers: {
    // get menu
    getMenu: (state) => {
      state.statusGetMenu = ReduxStateType.LOADING;
    },
    getMenuSuccess: (state, action) => {
      state.menuCategories = action.payload;
      state.statusGetMenu = ReduxStateType.SUCCESS;
    },
    getMenuError: (state, action) => {
      state.statusGetMenu = ReduxStateType.ERROR;
      state.error = action.payload;
    },
    // add menu
    addMenu: (state, _action: PayloadAction<any>) => {
      state.statusAddMenu = ReduxStateType.LOADING;
    },
    addMenuSuccess: (state, _action) => {
      // state.menuCategories.push(action.payload);
      state.statusAddMenu = ReduxStateType.SUCCESS;
    },
    addMenuError: (state, action) => {
      state.statusAddMenu = ReduxStateType.ERROR;
      state.errorAddMenu = action.payload;
    },
    // edit menu
    editMenu: (state, _action: PayloadAction<any>) => {
      state.statusEditMenu = ReduxStateType.LOADING;
    },
    editMenuSuccess: (state, _action) => {
      // const index = state.menuCategories.findIndex(
      //   (menu) => menu.id === action.payload.id
      // );
      // if (index !== -1) {
      //   state.menuCategories[index] = action.payload;
      // }
      state.statusEditMenu = ReduxStateType.SUCCESS;
    },
    editMenuError: (state, action) => {
      state.statusEditMenu = ReduxStateType.ERROR;
      state.errorEditMenu = action.payload;
    },
    // delete menu
    deleteMenu: (state, _action: PayloadAction<number>) => {
      state.statusDeleteMenu = ReduxStateType.LOADING;
    },
    deleteMenuSuccess: (state, action) => {
      state.menuCategories = state.menuCategories.filter(
        (menu) => menu.id !== action.payload
      );
      state.statusDeleteMenu = ReduxStateType.SUCCESS;
    },
    deleteMenuError: (state, action) => {
      state.statusDeleteMenu = ReduxStateType.ERROR;
      state.errorDeleteMenu = action.payload;
    },
    // mở modal add menu
    openModalAddMenu: (state) => {
      state.isAddMenu = true;
    },
    closeModalAddMenu: (state) => {
      state.isAddMenu = false;
    },
    // mở modal edit menu
    openModalEditMenu: (state) => {
      state.isEditMenu = true;
    },
    closeModalEditMenu: (state) => {
      state.isEditMenu = false;
    },
    // set id menu edit
    setIdMenuEdit: (state, action) => {
      state.idMenuEdit = action.payload;
    },
    // set menu edit
    setMenuEdit: (state, action) => {
      state.menuEdit = action.payload;
    },
    // set id menu delete
    setIdMenuDelete: (state, action) => {
      state.idMenuDelete = action.payload;
    },
    // mở modal delete menu
    openModalDeleteMenu: (state) => {
      state.isDeleteMenu = true;
    },
    closeModalDeleteMenu: (state) => {
      state.isDeleteMenu = false;
    },
    // update menu order
    updateMenuOrder: (state) => {
      state.statusUpdateMenuOrder = ReduxStateType.LOADING;
    },
    updateMenuOrderSuccess: (state, _action) => {
      // state.menuCategories = action.payload;
      state.statusUpdateMenuOrder = ReduxStateType.SUCCESS;
    },
    updateMenuOrderError: (state, action) => {
      state.statusUpdateMenuOrder = ReduxStateType.ERROR;
      state.errorUpdateMenuOrder = action.payload;
    },
    // mở modal visible menu
    openModalVisibleMenu: (state) => {
      state.visibleMenu = true;
    },
    closeModalVisibleMenu: (state) => {
      state.visibleMenu = false;
    },
    updateMenuVisibility: (state) => {
      state.statusUpdateMenuVisibility = ReduxStateType.LOADING;
    },
    updateMenuVisibilitySuccess: (state, action) => {
      state.menuCategories = action.payload;
      state.statusUpdateMenuVisibility = ReduxStateType.SUCCESS;
    },
    updateMenuVisibilityError: (state, action) => {
      state.statusUpdateMenuVisibility = ReduxStateType.ERROR;
      state.errorUpdateMenuVisibility = action.payload;
    },

    // reset menu
    resetMenu: (state) => {
      state.menuCategories = [];
      state.statusGetMenu = ReduxStateType.INIT;
      state.error = null;
    },
  },
  persist: {
    whitelist: ["menuCategories"],
  },
});

export const {
  getMenu,
  getMenuSuccess,
  getMenuError,
  addMenu,
  addMenuSuccess,
  addMenuError,
  editMenu,
  editMenuSuccess,
  editMenuError,
  deleteMenu,
  deleteMenuSuccess,
  deleteMenuError,
  resetMenu,
  openModalAddMenu,
  closeModalAddMenu,
  openModalEditMenu,
  closeModalEditMenu,
  setIdMenuEdit,
  setMenuEdit,
  setIdMenuDelete,
  openModalDeleteMenu,
  closeModalDeleteMenu,
  updateMenuOrder,
  updateMenuOrderSuccess,
  updateMenuOrderError,
  openModalVisibleMenu,
  closeModalVisibleMenu,
  updateMenuVisibility,
  updateMenuVisibilitySuccess,
  updateMenuVisibilityError,
} = slice.actions;
export default reducer;

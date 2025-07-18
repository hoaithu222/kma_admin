import { initialState as initialStateType } from "./menu.types";
import { ReduxStateType } from "@/app/store/types";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";

const initialState: initialStateType = {
  menuCategories: [],
  statusGetMenu: ReduxStateType.INIT,
  error: null,
};

const { slice, reducer } = createResettableSlice({
  name: "menu",
  initialState,
  reducers: {
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

export const { getMenu, getMenuSuccess, getMenuError, resetMenu } =
  slice.actions;
export default reducer;

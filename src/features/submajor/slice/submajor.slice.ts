import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { initialStateType } from "./submajor.types";
import { ReduxStateType } from "@/app/store/types";

const initialState: initialStateType = {
  submajorData: [],
  isAddSubmajor: false,
  isEditSubmajor: false,
  isDeleteSubmajor: false,
  idDelete: null,
  statusAddSubmajor: ReduxStateType.INIT,
  statusEditSubmajor: ReduxStateType.INIT,
  statusDeleteSubmajor: ReduxStateType.INIT,
  statusGetSubmajor: ReduxStateType.INIT,
};

const { slice, reducer } = createResettableSlice({
  name: "submajor",
  initialState,
  reducers: {
    setIsAddSubmajor: (state, action) => {
      state.isAddSubmajor = action.payload;
    },
    setIsEditSubmajor: (state, action) => {
      state.isEditSubmajor = action.payload;
    },
    setIsDeleteSubmajor: (state, action) => {
      state.isDeleteSubmajor = action.payload;
    },
    setIdDeleteSubmajor: (state, action) => {
      state.idDelete = action.payload;
    },
    getSubmajorRequest: (state, _action) => {
      state.statusGetSubmajor = ReduxStateType.LOADING;
    },
    getSubmajorSuccess: (state, action) => {
      state.submajorData = action.payload;
      state.statusGetSubmajor = ReduxStateType.SUCCESS;
    },
    getSubmajorFailed: (state, action) => {
      state.statusGetSubmajor = action.payload;
      state.submajorData = [];
      state.statusGetSubmajor = ReduxStateType.ERROR;
    },
    addSubmajorRequest: (state, _action) => {
      state.statusAddSubmajor = ReduxStateType.LOADING;
    },
    addSubmajorSuccess: (state, action) => {
      state.submajorData.push(action.payload);
      state.statusAddSubmajor = ReduxStateType.SUCCESS;
      state.isAddSubmajor = false;
    },
    addSubmajorFailed: (state, action) => {
      state.statusAddSubmajor = action.payload;
      state.submajorData = [];
      state.statusAddSubmajor = ReduxStateType.ERROR;
      state.isAddSubmajor = false;
    },
    editSubmajorRequest: (state, _action) => {
      state.statusEditSubmajor = ReduxStateType.LOADING;
    },
    editSubmajorSuccess: (state, action) => {
      state.submajorData = state.submajorData.map((submajor) => {
        if (submajor.id === action.payload.id) {
          return action.payload;
        }
        return submajor;
      });
      state.statusEditSubmajor = ReduxStateType.SUCCESS;
      state.isEditSubmajor = false;
    },
    editSubmajorFailed: (state, action) => {
      state.statusEditSubmajor = action.payload;
      state.submajorData = [];
      state.statusEditSubmajor = ReduxStateType.ERROR;
      state.isEditSubmajor = false;
    },
    deleteSubmajorRequest: (state, _action) => {
      state.statusDeleteSubmajor = ReduxStateType.LOADING;
      state.isDeleteSubmajor = true;
    },
    deleteSubmajorSuccess: (state, _action) => {
      state.submajorData = state.submajorData.filter(
        (submajor) => submajor.id !== state.idDelete
      );
      state.statusDeleteSubmajor = ReduxStateType.SUCCESS;
      state.isDeleteSubmajor = false;
    },
    deleteSubmajorFailed: (state, action) => {
      state.statusDeleteSubmajor = action.payload;
      state.submajorData = [];
      state.statusDeleteSubmajor = ReduxStateType.ERROR;
      state.isDeleteSubmajor = false;
    },
  },
});

export const {
  setIsAddSubmajor,
  setIsEditSubmajor,
  setIsDeleteSubmajor,
  setIdDeleteSubmajor,
  getSubmajorRequest,
  getSubmajorSuccess,
  getSubmajorFailed,
  addSubmajorRequest,
  addSubmajorSuccess,
  addSubmajorFailed,
  editSubmajorRequest,
  editSubmajorSuccess,
  editSubmajorFailed,
  deleteSubmajorRequest,
  deleteSubmajorSuccess,
  deleteSubmajorFailed,
} = slice.actions;
export default reducer;

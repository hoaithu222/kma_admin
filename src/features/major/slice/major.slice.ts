import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { initialStateType } from "./major.types";
import { ReduxStateType } from "@/app/store/types";

const initialState: initialStateType = {
  majorData: [],
  isAddMajor: false,
  isEditMajor: false,
  isDeleteMajor: false,
  idDelete: null,
  statusAddMajor: ReduxStateType.INIT,
  statusEditMajor: ReduxStateType.INIT,
  statusDeleteMajor: ReduxStateType.INIT,
  statusGetMajor: ReduxStateType.INIT,
};

const { slice, reducer } = createResettableSlice({
  name: "major",
  initialState,
  reducers: {
    setIsAddMajor: (state, action) => {
      state.isAddMajor = action.payload;
    },
    setIsEditMajor: (state, action) => {
      state.isEditMajor = action.payload;
    },
    setIsDeleteMajor: (state, action) => {
      state.isDeleteMajor = action.payload;
    },
    getMajorRequest: (state, _action) => {
      state.statusGetMajor = ReduxStateType.LOADING;
    },
    getMajorSuccess: (state, action) => {
      state.majorData = action.payload;
      state.statusGetMajor = ReduxStateType.SUCCESS;
    },
    getMajorFailed: (state, action) => {
      state.statusGetMajor = action.payload;
      state.majorData = [];
      state.statusGetMajor = ReduxStateType.ERROR;
    },
    addMajorRequest: (state, _action) => {
      state.statusAddMajor = ReduxStateType.LOADING;
    },
    addMajorSuccess: (state, action) => {
      state.majorData.push(action.payload);
      state.statusAddMajor = ReduxStateType.SUCCESS;
      state.isAddMajor = false;
    },
    addMajorFailed: (state, action) => {
      state.statusAddMajor = action.payload;
      state.majorData = [];
      state.statusAddMajor = ReduxStateType.ERROR;
      state.isAddMajor = false;
    },
    editMajorRequest: (state, _action) => {
      state.statusEditMajor = ReduxStateType.LOADING;
    },
    editMajorSuccess: (state, action) => {
      state.majorData = state.majorData.map((major) => {
        if (major.id === action.payload.id) {
          return action.payload;
        }
        return major;
      });
      state.statusEditMajor = ReduxStateType.SUCCESS;
      state.isEditMajor = false;
    },
    editMajorFailed: (state, action) => {
      state.statusEditMajor = action.payload;
      state.majorData = [];
      state.statusEditMajor = ReduxStateType.ERROR;
      state.isEditMajor = false;
    },
    setIdDeleteMajor: (state, action) => {
      state.idDelete = action.payload;
    },
    deleteMajorRequest: (state, _action) => {
      state.statusDeleteMajor = ReduxStateType.LOADING;
      state.isDeleteMajor = true;
    },
    deleteMajorSuccess: (state, _action) => {
      state.majorData = state.majorData.filter(
        (major) => major.id !== state.idDelete
      );
      state.statusDeleteMajor = ReduxStateType.SUCCESS;
      state.isDeleteMajor = false;
    },
    deleteMajorFailed: (state, action) => {
      state.statusDeleteMajor = action.payload;
      state.majorData = [];
      state.statusDeleteMajor = ReduxStateType.ERROR;
      state.isDeleteMajor = false;
    },
  },
});

export const {
  setIsAddMajor,
  setIsEditMajor,
  setIsDeleteMajor,
  getMajorRequest,
  getMajorSuccess,
  getMajorFailed,
  setIdDeleteMajor,
  addMajorRequest,
  addMajorSuccess,
  addMajorFailed,
  editMajorRequest,
  editMajorSuccess,
  editMajorFailed,
  deleteMajorRequest,
  deleteMajorSuccess,
  deleteMajorFailed,
} = slice.actions;

export default reducer;

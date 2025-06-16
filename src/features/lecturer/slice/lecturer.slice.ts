import { ReduxStateType } from "@/app/store/types";
import { initialStateLecturer } from "./lecturer.types";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  dataLecturer,
  IRequestCreateLecturer,
  IRequestDeleteLecturer,
  IRequestUpdateLecturer,
} from "@/core/api/lecturer/types";

const initialState: initialStateLecturer = {
  lecturer: [],
  detailLecturer: null,
  isEditLecturer: false,
  isAddLecturer: false,
  isDeleteLecturer: false,
  idDeleteLecturer: null,
  statusDeleteLecturer: ReduxStateType.INIT,
  statusAddLecturer: ReduxStateType.INIT,
  statusEditLecturer: ReduxStateType.INIT,
  statusGetLecturer: ReduxStateType.INIT,
  statusGetDetailLecturer: ReduxStateType.INIT,
};

const { slice, reducer } = createResettableSlice({
  name: "lecturer",
  initialState,
  reducers: {
    setLecturer: (state, action) => {
      state.lecturer = action.payload;
    },
    setIsEditLecturer: (state, action) => {
      state.isEditLecturer = action.payload;
    },
    setIsAddLecturer: (state, action) => {
      state.isAddLecturer = action.payload;
    },
    setIsDeleteLecturer: (state, action) => {
      state.isDeleteLecturer = action.payload;
    },
    setIdDeleteLecturer: (state, action) => {
      state.idDeleteLecturer = action.payload;
    },
    // lấy danh sách giảng viên
    getLecturerRequest: (state) => {
      state.statusGetLecturer = ReduxStateType.LOADING;
    },
    getLecturerSuccess: (state, action: PayloadAction<dataLecturer[]>) => {
      state.lecturer = action.payload;
      state.statusGetLecturer = ReduxStateType.SUCCESS;
    },
    getLecturerFailure: (state, _action: PayloadAction<string>) => {
      state.statusGetLecturer = ReduxStateType.ERROR;
    },
    // thêm giảng viên
    addLecturerRequest: (
      state,
      _action: PayloadAction<IRequestCreateLecturer>
    ) => {
      state.statusAddLecturer = ReduxStateType.LOADING;
    },
    addLecturerSuccess: (state, action: PayloadAction<dataLecturer>) => {
      state.lecturer.push(action.payload);
      state.statusAddLecturer = ReduxStateType.SUCCESS;
      state.isAddLecturer = false;
    },
    addLecturerFailure: (state, _action: PayloadAction<string>) => {
      state.statusAddLecturer = ReduxStateType.ERROR;
      state.isAddLecturer = false;
    },
    // sửa giảng viên
    editLecturerRequest: (
      state,
      _action: PayloadAction<IRequestUpdateLecturer>
    ) => {
      state.statusEditLecturer = ReduxStateType.LOADING;
    },
    editLecturerSuccess: (state, action: PayloadAction<dataLecturer>) => {
      state.lecturer = state.lecturer.map((lecturer) =>
        lecturer.id === action.payload.id ? action.payload : lecturer
      );
      state.statusEditLecturer = ReduxStateType.SUCCESS;
      state.isEditLecturer = false;
    },
    editLecturerFailure: (state, _action: PayloadAction<string>) => {
      state.statusEditLecturer = ReduxStateType.ERROR;
      state.isEditLecturer = false;
    },
    // xóa giảng viên
    deleteLecturerRequest: (
      state,
      _action: PayloadAction<IRequestDeleteLecturer>
    ) => {
      state.statusDeleteLecturer = ReduxStateType.LOADING;
    },
    deleteLecturerSuccess: (state, _action: PayloadAction<number>) => {
      state.lecturer = state.lecturer.filter(
        (lecturer) => lecturer.id !== state.idDeleteLecturer
      );
      state.statusDeleteLecturer = ReduxStateType.SUCCESS;
      state.isDeleteLecturer = false;
    },
    deleteLecturerFailure: (state, _action: PayloadAction<string>) => {
      state.statusDeleteLecturer = ReduxStateType.ERROR;
      state.isDeleteLecturer = false;
    },
    // lấy chi tiết giảng viên
    getDetailLecturerRequest: (state, _action: PayloadAction<number>) => {
      state.statusGetDetailLecturer = ReduxStateType.LOADING;
    },
    getDetailLecturerSuccess: (state, action: PayloadAction<dataLecturer>) => {
      state.detailLecturer = action.payload;
      state.statusGetDetailLecturer = ReduxStateType.SUCCESS;
    },
    getDetailLecturerFailure: (state, _action: PayloadAction<string>) => {
      state.statusGetDetailLecturer = ReduxStateType.ERROR;
    },
  },
});
export const {
  setLecturer,
  setIsEditLecturer,
  setIsAddLecturer,
  setIsDeleteLecturer,
  setIdDeleteLecturer,
  getLecturerRequest,
  getLecturerSuccess,
  getLecturerFailure,
  addLecturerRequest,
  addLecturerSuccess,
  addLecturerFailure,
  editLecturerRequest,
  editLecturerSuccess,
  editLecturerFailure,
  deleteLecturerRequest,
  deleteLecturerSuccess,
  deleteLecturerFailure,
  getDetailLecturerRequest,
  getDetailLecturerSuccess,
  getDetailLecturerFailure,
} = slice.actions;
export default reducer;

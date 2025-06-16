import { call, put, takeLatest } from "redux-saga/effects";
import {
  createLecturerApi,
  deleteLecturerApi,
  getLecturerByIdApi,
  getLecturersAllApi,
  updateLecturerApi,
} from "@/core/api/lecturer";
import {
  getLecturerRequest,
  getLecturerSuccess,
  getLecturerFailure,
  addLecturerSuccess,
  addLecturerFailure,
  editLecturerSuccess,
  editLecturerFailure,
  addLecturerRequest,
  editLecturerRequest,
  deleteLecturerFailure,
  deleteLecturerSuccess,
  deleteLecturerRequest,
  getDetailLecturerSuccess,
  getDetailLecturerFailure,
  getDetailLecturerRequest,
} from "./lecturer.slice";
import { toast } from "react-toastify";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  IRequestCreateLecturer,
  IRequestDeleteLecturer,
  IRequestUpdateLecturer,
} from "@/core/api/lecturer/types";

function* getLecturerSaga(): Generator<any, void, any> {
  try {
    const response = yield call(getLecturersAllApi, {});
    yield put(getLecturerSuccess(response.data.data));
  } catch (error) {
    yield put(getLecturerFailure(error as string));
  }
}
// thêm giảng viêns
function* addLecturerSaga(
  action: PayloadAction<IRequestCreateLecturer>
): Generator<any, void, any> {
  try {
    const response = yield call(createLecturerApi, action.payload);
    yield put(addLecturerSuccess(response.data.data));
    toast.success("Thêm giảng viên thành công");
  } catch (error) {
    yield put(addLecturerFailure(error as string));
    toast.error("Thêm giảng viên thất bại");
  }
}
// sửa giảng viên
function* editLecturerSaga(
  action: PayloadAction<IRequestUpdateLecturer>
): Generator<any, void, any> {
  try {
    const response = yield call(
      updateLecturerApi,
      action.payload.id,
      action.payload
    );
    yield put(editLecturerSuccess(response.data.data));
    toast.success("Sửa giảng viên thành công");
  } catch (error) {
    yield put(editLecturerFailure(error as string));
    toast.error("Sửa giảng viên thất bại");
  }
}
// xóa giảng viên
function* deleteLecturerSaga(
  action: PayloadAction<IRequestDeleteLecturer>
): Generator<any, void, any> {
  try {
    const response = yield call(deleteLecturerApi, action.payload.id);
    yield put(deleteLecturerSuccess(response.data.data));
    toast.success("Xóa giảng viên thành công");
  } catch (error) {
    yield put(deleteLecturerFailure(error as string));
    toast.error("Xóa giảng viên thất bại");
  }
}
// lấy chi tiết giảng viên
function* getDetailLecturerSaga(
  action: PayloadAction<number>
): Generator<any, void, any> {
  try {
    const response = yield call(getLecturerByIdApi, +action.payload);
    yield put(getDetailLecturerSuccess(response.data.data));
  } catch (error) {
    yield put(getDetailLecturerFailure(error as string));
  }
}
export function* lecturerSaga() {
  yield takeLatest(getLecturerRequest, getLecturerSaga);
  yield takeLatest(addLecturerRequest, addLecturerSaga);
  yield takeLatest(editLecturerRequest, editLecturerSaga);
  yield takeLatest(deleteLecturerRequest, deleteLecturerSaga);
  yield takeLatest(getDetailLecturerRequest.type, getDetailLecturerSaga);
}

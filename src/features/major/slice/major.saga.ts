import { call, put, takeLatest } from "redux-saga/effects";
import {
  addMajorApi,
  deleteMajorApi,
  editMajorApi,
  getMajorsApi,
} from "@/core/api/major";
import {
  getMajorRequest,
  getMajorSuccess,
  getMajorFailed,
  addMajorRequest,
  addMajorFailed,
  addMajorSuccess,
  editMajorRequest,
  editMajorSuccess,
  editMajorFailed,
  deleteMajorRequest,
  deleteMajorFailed,
  deleteMajorSuccess,
} from "./major.slice";
import { toast } from "react-toastify";

function* getMajorSaga(): Generator<any, void, any> {
  try {
    const response = yield call(getMajorsApi);
    yield put(getMajorSuccess(response.data.data));
  } catch (error) {
    yield put(getMajorFailed(error));
  }
}
function* addMajorSaga(
  action: ReturnType<typeof addMajorRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(addMajorApi, action.payload);
    yield put(addMajorSuccess(response.data.data));
    toast.success("Thêm chuyên ngành thành công");
  } catch (error) {
    yield put(addMajorFailed(error));
    toast.error("Thêm chuyên ngành thất bại");
  }
}
function* editMajorSaga(
  action: ReturnType<typeof editMajorRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(
      editMajorApi,
      action.payload.id,
      action.payload.data
    );
    yield put(editMajorSuccess(response.data.data));
    toast.success("Sửa chuyên ngành thành công");
  } catch (error) {
    yield put(editMajorFailed(error));
    toast.error("Sửa chuyên ngành thất bại");
  }
}
function* deleteMajorSaga(
  action: ReturnType<typeof deleteMajorRequest>
): Generator<any, void, any> {
  try {
    yield call(deleteMajorApi, action.payload);
    yield put(deleteMajorSuccess(action.payload));
    toast.success("Xóa chuyên ngành thành công");
  } catch (error) {
    yield put(deleteMajorFailed(error));
    toast.error("Xóa chuyên ngành thất bại");
  }
}

export function* majorSaga() {
  yield takeLatest(getMajorRequest, getMajorSaga);
  yield takeLatest(addMajorRequest, addMajorSaga);
  yield takeLatest(editMajorRequest, editMajorSaga);
  yield takeLatest(deleteMajorRequest, deleteMajorSaga);
}

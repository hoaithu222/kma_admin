import { call, put, takeLatest } from "redux-saga/effects";
import {
  addSubmajorFailed,
  addSubmajorRequest,
  addSubmajorSuccess,
  deleteSubmajorFailed,
  deleteSubmajorRequest,
  deleteSubmajorSuccess,
  editSubmajorFailed,
  editSubmajorRequest,
  editSubmajorSuccess,
  getSubmajorFailed,
  getSubmajorRequest,
  getSubmajorSuccess,
} from "./submajor.slice";

import { toast } from "react-toastify";
import {
  createSubMajorApi,
  deleteSubMajorApi,
  getSubMajorsApi,
  updateSubMajorApi,
} from "@/core/api/sub-major";

function* getSubmajorSaga(): Generator<any, void, any> {
  try {
    const response = yield call(getSubMajorsApi, {});
    yield put(getSubmajorSuccess(response.data.data));
  } catch (error) {
    yield put(getSubmajorFailed(error));
  }
}

function* addSubmajorSaga(
  action: ReturnType<typeof addSubmajorRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(createSubMajorApi, action.payload);
    yield put(addSubmajorSuccess(response.data.data));
    toast.success("Thêm chuyên ngành thành công");
  } catch (error) {
    yield put(addSubmajorFailed(error));
    toast.error("Thêm chuyên ngành thất bại");
  }
}
function* editSubmajorSaga(
  action: ReturnType<typeof editSubmajorRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(
      updateSubMajorApi,
      action.payload.id,
      action.payload.data
    );
    yield put(editSubmajorSuccess(response.data.data));
    toast.success("Sửa chuyên ngành thành công");
  } catch (error) {
    yield put(editSubmajorFailed(error));
    toast.error("Sửa chuyên ngành thất bại");
  }
}

function* deleteSubmajorSaga(
  action: ReturnType<typeof deleteSubmajorRequest>
): Generator<any, void, any> {
  try {
    yield call(deleteSubMajorApi, action.payload);
    yield put(deleteSubmajorSuccess(action.payload));
    toast.success("Xóa chuyên ngành thành công");
  } catch (error) {
    yield put(deleteSubmajorFailed(error));
    toast.error("Xóa chuyên ngành thất bại");
  }
}

export function* submajorSaga() {
  yield takeLatest(getSubmajorRequest, getSubmajorSaga);
  yield takeLatest(addSubmajorRequest, addSubmajorSaga);
  yield takeLatest(editSubmajorRequest, editSubmajorSaga);
  yield takeLatest(deleteSubmajorRequest, deleteSubmajorSaga);
}

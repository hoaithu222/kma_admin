import { deleteMediaFile, getAll } from "@/core/api/upload";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  deleteMedia,
  deleteMediaError,
  deleteMediaSuccess,
  getMedia,
  getMediaError,
  getMediaSuccess,
} from "./media.slice";
import { toast } from "react-toastify";

function* getMediaSaga({
  payload,
}: {
  payload: { page: number; pageSize: number };
}): Generator<any, void, any> {
  try {
    const response = yield call(getAll, {
      page: payload.page,
      pageSize: payload.pageSize,
    });
    yield put(getMediaSuccess(response.data.data));
  } catch (error) {
    yield put(getMediaError(error));
  }
}
function* deleteMediaSaga({
  payload,
}: {
  payload: { id: number };
}): Generator<any, void, any> {
  try {
    yield call(deleteMediaFile, payload);
    yield put(deleteMediaSuccess(payload.id));
    toast.success("Xóa media thành công");
  } catch (error) {
    yield put(deleteMediaError(error));
    toast.error("Xóa media thất bại");
  }
}
export default function* mediaSaga() {
  yield takeEvery(getMedia, getMediaSaga);
  yield takeEvery(deleteMedia, deleteMediaSaga);
}

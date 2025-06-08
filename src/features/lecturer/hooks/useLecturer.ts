import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAddLecturer,
  selectIsEditLecturer,
  selectIsDeleteLecturer,
  selectIdDeleteLecturer,
  selectStatusGetLecturer,
  selectStatusDeleteLecturer,
  selectStatusEditLecturer,
  selectStatusAddLecturer,
  selectLecturers,
} from "../slice/lecturer.slector";
import {
  addLecturerRequest,
  deleteLecturerRequest,
  editLecturerRequest,
  getLecturerRequest,
  setIdDeleteLecturer,
  setIsAddLecturer,
  setIsDeleteLecturer,
  setIsEditLecturer,
} from "../slice/lecturer.slice";
import {
  IRequestCreateLecturer,
  IRequestUpdateLecturer,
} from "@/core/api/lecturer/types";
export const useLecturer = () => {
  const dispatch = useDispatch();
  const statusAddLecturer = useSelector(selectStatusAddLecturer);
  const statusEditLecturer = useSelector(selectStatusEditLecturer);
  const statusDeleteLecturer = useSelector(selectStatusDeleteLecturer);
  const statusGetLecturer = useSelector(selectStatusGetLecturer);
  const isAddLecturer = useSelector(selectIsAddLecturer);
  const isEditLecturer = useSelector(selectIsEditLecturer);
  const isDeleteLecturer = useSelector(selectIsDeleteLecturer);
  const idDelete = useSelector(selectIdDeleteLecturer);
  const lecturer = useSelector(selectLecturers);
  const handleChangeAddLecturer = (value: boolean) => {
    dispatch(setIsAddLecturer(value));
  };
  const handleChangeEditLecturer = (value: boolean) => {
    dispatch(setIsEditLecturer(value));
  };
  const handleChangeDeleteLecturer = (value: boolean) => {
    dispatch(setIsDeleteLecturer(value));
  };

  const getLecturers = () => {
    dispatch(getLecturerRequest());
  };
  const addLecturer = (data: IRequestCreateLecturer) => {
    dispatch(addLecturerRequest(data));
  };
  const editLecturer = (data: IRequestUpdateLecturer) => {
    dispatch(editLecturerRequest(data));
  };
  const deleteLecturer = (id: number) => {
    dispatch(deleteLecturerRequest({ id }));
  };
  const handleChangeIdDeleteLecturer = (id: number) => {
    dispatch(setIdDeleteLecturer(id));
  };

  return {
    statusAddLecturer,
    statusEditLecturer,
    statusDeleteLecturer,
    statusGetLecturer,
    isAddLecturer,
    isEditLecturer,
    isDeleteLecturer,
    idDelete,
    lecturer,
    handleChangeAddLecturer,
    handleChangeEditLecturer,
    handleChangeDeleteLecturer,
    handleChangeIdDeleteLecturer,
    getLecturers,
    addLecturer,
    editLecturer,
    deleteLecturer,
  };
};

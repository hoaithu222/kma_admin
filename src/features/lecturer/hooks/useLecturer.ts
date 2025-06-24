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
  selectStatusGetDetailLecturer,
  selectDetailLecturer,
  selectTotalPages,
  selectCurrentLecturers,
  selectTotalElements,
} from "../slice/lecturer.slector";
import {
  addLecturerRequest,
  deleteLecturerRequest,
  editLecturerRequest,
  getDetailLecturerRequest,
  getLecturerRequest,
  setIdDeleteLecturer,
  setIsAddLecturer,
  setIsDeleteLecturer,
  setIsEditLecturer,
} from "../slice/lecturer.slice";
import {
  IRequestCreateLecturer,
  IRequestSearchLecturer,
  IRequestUpdateLecturer,
} from "@/core/api/lecturer/types";
import { useState } from "react";
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
  const statusGetDetailLecturer = useSelector(selectStatusGetDetailLecturer);
  const detailLecturer = useSelector(selectDetailLecturer);
  const currentLecturers = useSelector(selectCurrentLecturers);
  const totalElements = useSelector(selectTotalElements);
  const totalPages = useSelector(selectTotalPages);

  const [filter, setFilter] = useState<IRequestSearchLecturer>({
    name: "",
    majorId: "",
    subMajorId: "",
    title: "",
    email: "",
    position: "",
    page: 0,
    size: 9,
  });

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
    dispatch(getLecturerRequest(filter));
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
  const getDetailLecturer = (id: number) => {
    dispatch(getDetailLecturerRequest(id));
  };

  return {
    currentLecturers,
    filter,
    setFilter,
    totalElements,
    totalPages,

    statusAddLecturer,
    statusEditLecturer,
    statusDeleteLecturer,
    statusGetLecturer,
    isAddLecturer,
    isEditLecturer,
    isDeleteLecturer,
    idDelete,
    lecturer,
    statusGetDetailLecturer,
    detailLecturer,
    handleChangeAddLecturer,
    handleChangeEditLecturer,
    handleChangeDeleteLecturer,
    handleChangeIdDeleteLecturer,
    getLecturers,
    addLecturer,
    editLecturer,
    deleteLecturer,
    getDetailLecturer,
  };
};

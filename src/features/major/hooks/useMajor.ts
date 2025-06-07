import { useDispatch, useSelector } from "react-redux";
import {
  addMajorRequest,
  deleteMajorRequest,
  editMajorRequest,
  getMajorRequest,
  setIsAddMajor,
  setIsDeleteMajor,
  setIsEditMajor,
} from "../slice/major.slice";
import {
  IRequestCreateMajor,
  IRequestUpdateMajor,
} from "@/core/api/major/types";
import {
  selectStatusAddMajor,
  selectStatusDeleteMajor,
  selectStatusEditMajor,
  selectStatusGetMajor,
  selectIsAddMajor,
  selectIsEditMajor,
  selectIsDeleteMajor,
  selectIdDelete,
  selectMajors,
} from "../slice/major.selector";

export const useMajor = () => {
  const dispatch = useDispatch();
  const statusAddMajor = useSelector(selectStatusAddMajor);
  const statusEditMajor = useSelector(selectStatusEditMajor);
  const statusDeleteMajor = useSelector(selectStatusDeleteMajor);
  const statusGetMajor = useSelector(selectStatusGetMajor);
  const isAddMajor = useSelector(selectIsAddMajor);
  const isEditMajor = useSelector(selectIsEditMajor);
  const isDeleteMajor = useSelector(selectIsDeleteMajor);
  const idDelete = useSelector(selectIdDelete);
  const majorData = useSelector(selectMajors);

  const handleChangeAddMajor = (value: boolean) => {
    dispatch(setIsAddMajor(value));
  };
  const handleChangeEditMajor = (value: boolean) => {
    dispatch(setIsEditMajor(value));
  };
  const handleChangeDeleteMajor = (value: boolean) => {
    dispatch(setIsDeleteMajor(value));
  };

  const getMajors = () => {
    dispatch(getMajorRequest(null));
  };
  const addMajor = (data: IRequestCreateMajor) => {
    dispatch(addMajorRequest(data));
  };
  const editMajor = (id: number, data: IRequestUpdateMajor) => {
    dispatch(editMajorRequest({ id, data: data }));
  };
  const deleteMajor = (id: number) => {
    dispatch(deleteMajorRequest(id));
  };
  return {
    majorData,
    statusAddMajor,
    statusEditMajor,
    statusDeleteMajor,
    statusGetMajor,
    isAddMajor,
    isEditMajor,
    isDeleteMajor,
    idDelete,
    getMajors,
    addMajor,
    editMajor,
    deleteMajor,
    handleChangeAddMajor,
    handleChangeEditMajor,
    handleChangeDeleteMajor,
  };
};

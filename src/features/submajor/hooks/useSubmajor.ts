import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAddSubmajor,
  selectIsEditSubmajor,
  selectIsDeleteSubmajor,
  selectStatusAddSubmajor,
  selectStatusEditSubmajor,
  selectStatusDeleteSubmajor,
  selectStatusGetSubmajor,
  selectIdDeleteSubmajor,
  selectSubmajors,
  selectSubMajorWithMajor,
} from "../slice/submajor.selector";
import {
  setIsAddSubmajor,
  setIsEditSubmajor,
  setIsDeleteSubmajor,
  getSubmajorRequest,
  addSubmajorRequest,
  editSubmajorRequest,
  deleteSubmajorRequest,
  getSubMajorWithMajorRequest,
} from "../slice/submajor.slice";
import {
  IRequestCreateSubMajor,
  IRequestUpdateSubMajor,
} from "@/core/api/sub-major/types";

export const useSubmajor = () => {
  const dispatch = useDispatch();
  const statusAddSubmajor = useSelector(selectStatusAddSubmajor);
  const statusEditSubmajor = useSelector(selectStatusEditSubmajor);
  const statusDeleteSubmajor = useSelector(selectStatusDeleteSubmajor);
  const statusGetSubmajor = useSelector(selectStatusGetSubmajor);
  const isAddSubmajor = useSelector(selectIsAddSubmajor);
  const isEditSubmajor = useSelector(selectIsEditSubmajor);
  const isDeleteSubmajor = useSelector(selectIsDeleteSubmajor);
  const idDelete = useSelector(selectIdDeleteSubmajor);
  const submajorData = useSelector(selectSubmajors);
  const subMajorWithMajor = useSelector(selectSubMajorWithMajor);

  const handleChangeAddSubmajor = (value: boolean) => {
    dispatch(setIsAddSubmajor(value));
  };
  const handleChangeEditSubmajor = (value: boolean) => {
    dispatch(setIsEditSubmajor(value));
  };
  const handleChangeDeleteSubmajor = (value: boolean) => {
    dispatch(setIsDeleteSubmajor(value));
  };
  const getSubmajor = () => {
    dispatch(getSubmajorRequest(null));
  };
  const addSubmajor = (data: IRequestCreateSubMajor) => {
    dispatch(addSubmajorRequest(data));
  };
  const editSubmajor = (id: number, data: IRequestUpdateSubMajor) => {
    dispatch(editSubmajorRequest({ id, data }));
  };
  const deleteSubmajor = (id: number) => {
    dispatch(deleteSubmajorRequest(id));
  };
  // lấy chuyên ngành con với chuyên ngành
  const getSubMajorWithMajor = (majorId: number) => {
    dispatch(getSubMajorWithMajorRequest(majorId));
  };

  return {
    statusAddSubmajor,
    statusEditSubmajor,
    statusDeleteSubmajor,
    statusGetSubmajor,
    isAddSubmajor,
    isEditSubmajor,
    isDeleteSubmajor,
    idDelete,
    submajorData,
    subMajorWithMajor,
    handleChangeAddSubmajor,
    handleChangeEditSubmajor,
    handleChangeDeleteSubmajor,
    getSubmajor,
    addSubmajor,
    editSubmajor,
    deleteSubmajor,
    getSubMajorWithMajor,
  };
};

export default useSubmajor;

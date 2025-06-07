import { useDispatch, useSelector } from "react-redux";

import {
  selectTags,
  selectIsAddTag,
  selectIsEditTag,
  selectIsDeleteTag,
  selectIsViewTag,
  selectIsSearchTag,
  selectIsFilterTag,
  selectIsSortTag,
  selectError,
  selectIsLoading,
  selectIdDelete,
  selectTag,
} from "../slice/tag.selector";
import {
  getTags,
  setIsAddTag,
  setIsDeleteTag,
  setIsEditTag,
  setIsFilterTag,
  setIsSearchTag,
  setIsSortTag,
  setIsViewTag,
  getAllTags,
  deleteTag,
  editTagSlice,
} from "../slice/tag.slice";
import { IRequestDeleteTag } from "@/core/api/tags/types";
import { IRequestUpdateTag } from "@/core/api/tags/types";

const useTag = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTags);

  const isAddTag = useSelector(selectIsAddTag);
  const isEditTag = useSelector(selectIsEditTag);
  const isDeleteTag = useSelector(selectIsDeleteTag);
  const isViewTag = useSelector(selectIsViewTag);
  const isSearchTag = useSelector(selectIsSearchTag);
  const isFilterTag = useSelector(selectIsFilterTag);
  const isSortTag = useSelector(selectIsSortTag);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const idDelete = useSelector(selectIdDelete);
  const tag = useSelector(selectTag);

  const handleAddTag = (action: boolean) => {
    dispatch(setIsAddTag(action));
  };
  const handleEditTag = (action: boolean) => {
    dispatch(setIsEditTag(action));
  };
  const handleDeleteTag = () => {
    dispatch(setIsDeleteTag(true));
  };
  const handleViewTag = () => {
    dispatch(setIsViewTag(true));
  };
  const handleSearchTag = () => {
    dispatch(setIsSearchTag(true));
  };
  const handleFilterTag = () => {
    dispatch(setIsFilterTag(true));
  };
  const handleSortTag = () => {
    dispatch(setIsSortTag(true));
  };
  const handleGetTag = ({ id }: { id: number }) => {
    dispatch(getTags(id));
  };
  const handleGetAllTags = () => {
    dispatch(getAllTags());
  };

  const handleEditTagApi = (data: IRequestUpdateTag) => {
    dispatch(editTagSlice(data));
  };
  const handleDeleteTagApi = (data: IRequestDeleteTag) => {
    dispatch(deleteTag(data));
  };

  return {
    tags,
    isAddTag,
    isEditTag,
    isDeleteTag,
    isViewTag,
    isSearchTag,
    isFilterTag,
    isSortTag,
    error,
    isLoading,
    handleAddTag,
    handleEditTag,
    handleDeleteTag,
    handleViewTag,
    idDelete,
    tag,
    handleSearchTag,
    handleFilterTag,
    handleSortTag,
    handleGetTag,
    handleGetAllTags,

    handleEditTagApi,
    handleDeleteTagApi,
  };
};

export default useTag;

import { useDispatch, useSelector } from "react-redux";
import { deleteMedia, getMedia, setIsDeleteMedia } from "../slice/media.slice";
import {
  selectIdDeleteMedia,
  selectIsDeleteMedia,
  selectMedia,
  selectStatusGetMedia,
} from "../slice/media.selector";

export const useMedia = () => {
  const dispatch = useDispatch();
  const media = useSelector(selectMedia);
  const isDeleteMedia = useSelector(selectIsDeleteMedia);
  const idDeleteMedia = useSelector(selectIdDeleteMedia);
  const getMediaStatus = useSelector(selectStatusGetMedia);

  const handleConfirmDeleteMedia = () => {
    dispatch(setIsDeleteMedia(true));
  };
  const handleCancelDeleteMedia = () => {
    dispatch(setIsDeleteMedia(false));
  };

  const getMediaDispatch = (page: number, pageSize: number) => {
    dispatch(getMedia({ page, pageSize }));
  };
  const deleteMediaDispatch = (id: number) => {
    dispatch(deleteMedia(id));
  };
  return {
    media,
    isDeleteMedia,
    idDeleteMedia,
    getMediaStatus,

    getMediaDispatch,
    deleteMediaDispatch,
    handleConfirmDeleteMedia,
    handleCancelDeleteMedia,
  };
};

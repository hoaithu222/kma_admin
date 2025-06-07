import { ReduxStateType } from "@/app/store/types";
import { initialStateType } from "./media.type";
import { createResettableSlice } from "@/app/store/create-resettabable-slice";

const initialState: initialStateType = {
  media: [],
  statusGetMedia: ReduxStateType.INIT,
  idDeleteMedia: null,
  isDeleteMedia: false,
};

const { slice, reducer } = createResettableSlice({
  name: "media",
  initialState,
  reducers: {
    // delete media để mở modal confirm
    setIsDeleteMedia: (state, action) => {
      state.isDeleteMedia = action.payload;
    },
    // id của media cần xóa
    setIdDeleteMedia: (state, action) => {
      state.idDeleteMedia = action.payload;
    },
    // thực hiện xóa
    deleteMedia: (state, action) => {
      state.idDeleteMedia = action.payload;
    },
    deleteMediaSuccess: (state, _action) => {
      state.media = state.media.filter(
        (media) => media.id !== state.idDeleteMedia
      );
    },
    deleteMediaError: (state, _action) => {
      state.idDeleteMedia = null;
    },
    // lấy danh sách media
    getMedia: (state, _action) => {
      state.statusGetMedia = ReduxStateType.LOADING;
      state.media = [];
    },
    getMediaSuccess: (state, action) => {
      state.statusGetMedia = ReduxStateType.SUCCESS;
      state.media = action.payload;
    },
    getMediaError: (state, _action) => {
      state.statusGetMedia = ReduxStateType.ERROR;
    },

    resetState: () => {
      return initialState;
    },
  },
});
export const {
  setIsDeleteMedia,
  setIdDeleteMedia,
  deleteMedia,
  deleteMediaSuccess,
  deleteMediaError,
  getMedia,
  getMediaSuccess,
  getMediaError,
  resetState,
} = slice.actions;
export default reducer;

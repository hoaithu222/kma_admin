import Axios from "@/core/base/Axios";
import { UPLOAD_PATH, UPLOAD_PATH_ARTICLE_MEDIA } from "./path";
import {
  IRequestUpload,
  IResponseUpload,
  IResponseGetAll,
  IRequestGetId,
  IResponseGetId,
  IRequestDelete,
  IResponseDelete,
  IRequestUploadsFiled,
  IResponseUploadsFiled,
  IRequestGetMediaFile,
  IRequestGetAll,
  IResponseAddMediaFile,
  IRequestAddMediaFile,
  IRequestGetMediaFilesWithArticleId,
  IResponseGetMediaFilesWithArticleId,
  IResponseRemoveMediaFile,
  IRequestRemoveMediaFile,
  IRequestRemoveAllMediaFile,
  IResponseRemoveAllMediaFile,
} from "./types";
export const upload = async (data: IRequestUpload) => {
  try {
    const response = await Axios.post<IResponseUpload>(
      UPLOAD_PATH.upload,
      data
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const getAll = async (data: IRequestGetAll) => {
  try {
    const response = await Axios.get<IResponseGetAll>(UPLOAD_PATH.getAll, {
      params: data,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const getById = async (data: IRequestGetId) => {
  try {
    const response = await Axios.get<IResponseGetId>(UPLOAD_PATH.getMediaFile, {
      params: data,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const deleteMediaFile = async (data: IRequestDelete) => {
  try {
    const response = await Axios.delete<IResponseDelete>(
      UPLOAD_PATH.deleteMediaFile,
      { params: data }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};
export const uploadsFiled = async (data: IRequestUploadsFiled) => {
  try {
    const response = await Axios.get<IResponseUploadsFiled>(
      UPLOAD_PATH.uploadsFiled,
      { params: data }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};
export const getMediaFile = async (data: IRequestGetMediaFile) => {
  try {
    const response = await Axios.get<IResponseGetId>(UPLOAD_PATH.getMediaFile, {
      params: data,
    });
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};
// article-media
export const addMediaFile = async (data: IRequestAddMediaFile) => {
  try {
    const response = await Axios.post<IResponseAddMediaFile>(
      UPLOAD_PATH_ARTICLE_MEDIA.addMediaFile,
      data
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};
export const getMediaFilesWithArticleId = async (
  data: IRequestGetMediaFilesWithArticleId
) => {
  try {
    const response = await Axios.get<IResponseGetMediaFilesWithArticleId>(
      UPLOAD_PATH_ARTICLE_MEDIA.getMediaFilesWithArticleId,
      { params: data }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};
export const getMediaFileArticle = async (data: IRequestGetMediaFile) => {
  try {
    const response = await Axios.get<IResponseGetId>(
      UPLOAD_PATH_ARTICLE_MEDIA.getMediaFileArticle,
      { params: data }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};
export const removeMediaFile = async (data: IRequestRemoveMediaFile) => {
  try {
    const response = await Axios.delete<IResponseRemoveMediaFile>(
      UPLOAD_PATH_ARTICLE_MEDIA.removeMediaFile,
      { params: data }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};
export const removeAllMediaFile = async (data: IRequestRemoveAllMediaFile) => {
  try {
    const response = await Axios.delete<IResponseRemoveAllMediaFile>(
      UPLOAD_PATH_ARTICLE_MEDIA.removeAllMediaFile,
      { params: data }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

import Axios from "@/core/base/Axios";
import { POST_PATH } from "./paths";
import {
  IRequestAddArticle,
  IRequestSearchArticle,
  IRequestUpdateArticle,
  IResponseAddArticle,
  IResponseDeleteArticle,
  IResponseGetArticle,
  IResponseGetArticleBySlug,
  IResponseGetHomeArticle,
  IResponseSearchArticle,
  IResponseUpdateArticle,
} from "./types";

export const addArticle = async (data: IRequestAddArticle) => {
  try {
    const response = await Axios.post<IResponseAddArticle>(
      POST_PATH.createArticle,
      data
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const getArticle = async (id: string) => {
  try {
    const response = await Axios.get<IResponseGetArticle>(
      POST_PATH.getArticle.replace(":id", id)
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const getArticleBySlug = async (slug: string) => {
  try {
    const response = await Axios.get<IResponseGetArticleBySlug>(
      POST_PATH.slugArticle,
      {
        params: {
          slug: slug,
        },
      }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const searchArticle = async (data: IRequestSearchArticle) => {
  try {
    const response = await Axios.get<IResponseSearchArticle>(
      POST_PATH.searchArticle,
      {
        params: data,
      }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const getHomeArticle = async () => {
  try {
    const response = await Axios.get<IResponseGetHomeArticle>(
      POST_PATH.homeArticle
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const updateArticle = async (
  id: string,
  data: IRequestUpdateArticle
) => {
  try {
    const response = await Axios.put<IResponseUpdateArticle>(
      POST_PATH.updateArticle.replace(":id", id),
      data
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const response = await Axios.delete<IResponseDeleteArticle>(
      POST_PATH.delete.replace(":id", id)
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error };
  }
};

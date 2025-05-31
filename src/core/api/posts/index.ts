import { IRequestAddArticle, IResponseAddArticle } from "./types";
import Axios from "@/core/base/Axios";
import { POST_PATH } from "./paths";

export const addArticle = async (data: IRequestAddArticle) => {
  const response = await Axios.post<IResponseAddArticle>(
    POST_PATH.createArticle,
    data
  );
  return response.data;
};

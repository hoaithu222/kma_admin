import { IResponse } from "@/core/base/Response";

export interface IRequestUpload {
  files: FormData;
}
export interface ResponseUpload {
  id: number;
  fileName: string;
  originalName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  mimeType: string;
  dimensions: string;
  createdAt: string;
}
export interface IRequestGetId {
  id: number;
}
export interface IRequestDelete {
  id: number;
}
export interface IRequestUploadsFiled {
  year: number;
  month: number;
  day: number;
  filename: string;
}
export interface IRequestGetAll {}
export interface IRequestGetMediaFile {
  id: number;
}
export interface ResponseDelete {
  data: string;
}
export interface ResponseMediaFile {
  data: string;
}
export interface IResponseUpload extends IResponse<ResponseUpload> {}

export interface IResponseGetAll extends IResponse<ResponseUpload> {}

export interface IResponseGetId extends IResponse<ResponseUpload> {}

export interface IResponseDelete extends IResponse<ResponseDelete> {}
export interface IResponseUploadsFiled extends IResponse<ResponseMediaFile> {}

// article-media

export interface IRequestAddMediaFile {
  articleId: string;
  mediaId: string;
}
export interface IRequestGetMediaFilesWithArticleId {
  articleId: string;
}
export interface IRequestRemoveMediaFile {
  articleId: string;
  mediaId: string;
}
export interface IRequestRemoveAllMediaFile {
  articleId: string;
}
export interface RequestGetMediaFile {
  articleId: number;
  mediaId: number;
  mediaFileName: string;
  mediaOriginalName: string;
  mediaFilePath: string;
  mediaFileType: string;
  mediaFileSize: number;
  mediaDimensions: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResponseAddMediaFile {
  articleId: number;
  mediaId: number;
  mediaFileName: string;
  mediaOriginalName: string;
  mediaFilePath: string;
  mediaFileType: string;
  mediaFileSize: number;
  mediaDimensions: string;
  createdAt: string;
  updatedAt: string;
}
export interface IResponseAddMediaFile
  extends IResponse<ResponseAddMediaFile> {}
export interface IResponseGetMediaFilesWithArticleId {
  data: string;
}
export interface ResponseRemoveMediaFile {
  data: "";
}
export interface IResponseRemoveMediaFile
  extends IResponse<ResponseRemoveMediaFile> {}
export interface IResponseRemoveAllMediaFile
  extends IResponse<ResponseRemoveMediaFile> {}

export interface ResponseGetMediaWithArticleId {
  data: RequestGetMediaFile[];
}
export interface IResponseGetMediaWithArticleId
  extends IResponse<ResponseGetMediaWithArticleId> {}

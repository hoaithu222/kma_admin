import { IResponse } from "@/core/base/Response";

export interface IRequestAddArticle {
  categoryId: number | null | string;
  subCategoryId: number | null | string;
  title: string;
  description: string;
  summary: string;
  content: string;
  thumbnailId: number;
  fileIds: number[];
  tagIds: number[];
  isPrivate: boolean;
  status: "draft" | "published";
}
export interface ITag {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
}
export interface IFile {
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
export interface ResponseAddArticle {
  id: number;
  categoryId: number;
  subCategoryName: string;
  folderUrl: string;
  subCategoryId: number;
  categoryName: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  content: string;
  files: IFile[];
  thumbnail: string[];
  tag: ITag[];
  thumbnailUrl: string;
  dimensions: string;
  viewCount: number;
  status: "draft" | "published" | "archived";
  publishedAt: string;
  updatedAt: string;
  isPrivate: boolean;
}

export interface IResponseAddArticle extends IResponse<ResponseAddArticle> {}

export interface IRequestGetArticle {
  id: number;
}
export interface ResponseGetArticle {}
export interface IResponseGetArticle extends IResponse<ResponseGetArticle> {}

export interface IRequestUpdateArticle {
  categoryId: number | string;
  subCategoryId: number | string | null;
  title: string;
  description: string;
  summary: string;
  content: string;
  thumbnail: string;
  files: string[];
  tagIds: number[];
  isPrivate: boolean;
  status: "draft" | "published";
}
export interface ResponseUpdateArticle {}
export interface IResponseUpdateArticle
  extends IResponse<ResponseUpdateArticle> {}

export interface IRequestDeleteArticle {
  id: number;
}
export interface ResponseDeleteArticle {
  data: string;
}
export interface IResponseDeleteArticle
  extends IResponse<ResponseDeleteArticle> {}

export interface IRequestGetArticleBySlug {
  subCategoryId: string;
}
export interface ResponseGetArticleBySlug {}
export interface IResponseGetArticleBySlug
  extends IResponse<ResponseGetArticleBySlug> {}

export interface IRequestGetArticleById {
  id: number;
}
export interface ResponseGetArticleById {}
export interface IResponseGetArticleById
  extends IResponse<ResponseGetArticleById> {}

export interface IRequestArticleFilterPage {
  page: number;
  filter: string;
  categoryId: number;
  keyword: string;
  size: number;
}

export interface IRequestGetHomeArticle {}
export interface IResponseGetHomeArticle
  extends IResponse<ResponseAddArticle> {}

export interface IRequestSearchArticle {
  keyword?: string | null;
  page: number;
  size: number;
  categoryId?: number | null;
  subCategoryId?: string | null;
  status?: "draft" | "published" | null;
  isPrivate?: boolean | null;
  tag?: string[] | null;
  sort?: "viewCount" | "publishedAt" | "createdAt" | null;
  order?: "asc" | "desc" | null;
}
export interface IResponseSearchArticle extends IResponse<ResponseAddArticle> {}

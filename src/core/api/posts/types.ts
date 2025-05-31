import { IResponse } from "@/core/base/Response";

export interface IRequestAddArticle {
  categoryId: number;
  title: string;
  folderUrl: string;
  subCategoryId: number;
  summary: string;
  content: string;
  thumbnailId: number;
  fileIds: number[];
  tags: number[];
  status: "draft" | "published" | "archived";
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
  content: string;
  files: [
    {
      id: 0;
      fileName: string;
      originalName: string;
      filePath: string;
      fileType: string;
      fileSize: number;
      mimeType: string;
      dimensions: string;
      createdAt: string;
    },
  ];
  thumbnailId: number;
  tag: [
    {
      id: number;
      name: string;
      slug: string;
      createdAt: string;
    },
  ];
  thumbnailUrl: string;
  dimensions: string;
  viewCount: number;
  status: "draft" | "published" | "archived";
  publishedAt: string;
  updatedAt: string;
}
export interface IResponseAddArticle extends IResponse<ResponseAddArticle> {}

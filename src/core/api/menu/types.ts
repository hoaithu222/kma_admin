import { IResponse } from "@/core/base/Response";

export interface IRequestGetMenus {}

export interface IRequestCreateMenu {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
  displayOrder: number;
  level: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  children: dataMenu[];
}
export interface IRequestUpdateMenu {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
  displayOrder: number;
  level: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  children: dataMenu[];
}
export interface IRequestUpdateMenuOrder {
  id: number;
  newOrder: number;
}
export interface IRequestUpdateMenuVisibility {
  id: number;
}
export interface IRequestDeleteMenu {
  id: number;
}

export interface IRequestGetMenuById {
  id: number;
}

export interface IRequestGetMenuBySlug {
  slug: string;
}
export interface dataMenu {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
  displayOrder: number;
  level: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  children: dataMenu[];
}

export interface IResponseGetMenus extends IResponse<dataMenu[]> {}

export interface IResponseDeleteMenu extends IResponse<{ data: string }> {}
export interface IResponseUpdateMenu extends IResponse<dataMenu> {}
export interface IResponseUpdateMenuOrder extends IResponse<dataMenu> {}
export interface IResponseUpdateMenuVisibility extends IResponse<dataMenu> {}
export interface IResponseCreateMenu extends IResponse<dataMenu> {}

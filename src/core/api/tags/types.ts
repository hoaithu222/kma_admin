import { IResponse } from "@/core/base/Response";

export interface IRequestAddTag {
  name: string;
}
export interface ResponseAddTag {
  id: number;
  name: string;
  slug: string;
}

export interface IResponseAddTag extends IResponse<ResponseAddTag> {}

export interface IRequestGetTag {
  id: number;
}
export interface ResponseGetTag {
  id: number;
  name: string;
  slug: string;
}
export interface IResponseGetTag extends IResponse<ResponseGetTag> {}

export interface IRequestUpdateTag {
  id?: number;
  name: string;
}
export interface ResponseUpdateTag {
  id: number;
  name: string;
  slug: string;
}

export interface IRequestDeleteTag {
  id: number;
}
export interface ResponseDeleteTag {}
export interface IResponseDeleteTag extends IResponse<ResponseDeleteTag> {}

export interface IRequestGetAllTag {}

export interface ResponseGetAllTag {
  id: number;
  name: string;
  slug: string;
}
export interface IResponseGetAllTag extends IResponse<ResponseGetAllTag> {}

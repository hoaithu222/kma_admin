import { IResponse } from "@/core/base/Response";

export interface IRequestGetSubMajor {}
export interface IRequestGetSubMajorWithMajor {
  majorId: number;
}
export interface IRequestCreateSubMajor {
  name: string;
  majorId: number | null;
}
export interface IRequestUpdateSubMajor {
  id?: number;
  name: string;
  majorId: number | null;
}
export interface IRequestDeleteSubMajor {
  id: number;
}
export interface IRequestGetSubMajorById {
  id: number;
}

export interface dataSubMajor {
  id: number;
  name?: string;
  majorId?: number;
  majorName?: string;
}

export interface dataDeleteSubMajor {
  data: string;
}

export interface IResponseGetSubMajor extends IResponse<dataSubMajor[]> {}
export interface IResponseGetSubMajorWithMajor
  extends IResponse<dataSubMajor[]> {}
export interface IResponseCreateSubMajor extends IResponse<dataSubMajor> {}
export interface IResponseUpdateSubMajor extends IResponse<dataSubMajor> {}
export interface IResponseDeleteSubMajor
  extends IResponse<dataDeleteSubMajor> {}

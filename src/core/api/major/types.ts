import { IResponse } from "@/core/base/Response";

export interface IRequestGetMajor {}

export interface IRequestGetMajorWithSubMajor {}

export interface IRequestCreateMajor {
  name: string;
  description: string;
}

export interface IRequestUpdateMajor {
  id?: number;
  name?: string;
  description?: string;
}
export interface IRequestDeleteMajor {
  id: number;
}
export interface IRequestGetMajorById {
  id: number;
}

export interface dataDeleteMajor {
  data: string;
}
export interface IRequestGetMajorWithSubMajor {
  id: number;
}

export interface dataMajor {
  id: number;
  name: string;
  description: string;
  subMajors: {
    id: number;
    name: string;
    majorId: number;
    majorName: string;
  }[];
}
export interface dataDeleteMajor {
  data: string;
}

export interface IResponseGetMajor extends IResponse<dataMajor[]> {}
export interface IResponseGetMajorWithSubMajor extends IResponse<dataMajor[]> {}
export interface IResponseDeleteMajor extends IResponse<dataDeleteMajor> {}
export interface IResponseCreateMajor extends IResponse<dataMajor> {}
export interface IResponseUpdateMajor extends IResponse<dataMajor> {}
export interface IResponseGetMajorById extends IResponse<dataMajor> {}

export interface IRequestCategory {
  page: number;
  limit: number;
  search: string;
  sort: string;
  order: string;
}
export interface IRequestCreateCategory {
  name: string;
  description: string;
}
export interface IRequestUpdateCategory {
  id?: string;
  name: string;
  description: string;
}
export interface IResponseData {
  status: boolean;
  message: string;
  data: IResponseCategory[];
}
export interface IResponseCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

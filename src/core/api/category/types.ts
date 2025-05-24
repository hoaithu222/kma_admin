export interface IRequestCategory {
  page: number;
  limit: number;
  search: string;
  sort: string;
  order: string;
}

export interface IResponseCategory {
  id: string;
  name: string;
  description: string;
}

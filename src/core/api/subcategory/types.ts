export interface IRequestSubcategory {
  page: number;
  limit: number;
  search: string;
  sort: string;
  order: string;
}

export interface IResponseSubcategory {
  id: string;
  name: string;
  description: string;
}

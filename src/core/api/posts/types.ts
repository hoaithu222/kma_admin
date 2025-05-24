export interface IRequestPost {
  page: number;
  limit: number;
  search: string;
  sort: string;
  order: string;
}

export interface IResponsePost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRequestSubcategory {
  page: number;
  limit: number;
  search: string;
  sort: string;
  order: string;
}
export interface IRequestAddSubcategory {
  name: string;
  categoryId: string;
  slug: string;
  description?: string;
}
export interface IRequestEditSubcategory {
  id?: string;
  name: string;
  categoryId: string;
  slug: string;
  description?: string;
}
export interface IResponseSubcategory {
  id: string;
  name: string;
  categoryId: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

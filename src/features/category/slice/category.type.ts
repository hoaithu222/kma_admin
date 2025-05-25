export interface initialStateType {
  categories: Category[];
  isAddCategory: boolean;
  isEditCategory: boolean;
  isDeleteCategory: boolean;
  isViewCategory: boolean;
  isSearchCategory: boolean;
  isFilterCategory: boolean;
  isSortCategory: boolean;
  confirmDeleteCategory: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

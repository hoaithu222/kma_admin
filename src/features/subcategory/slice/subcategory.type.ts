export interface initialStateType {
  subcategories: Subcategory[];
  isAddSubcategory: boolean;
  isEditSubcategory: boolean;
  isDeleteSubcategory: boolean;
  isViewSubcategory: boolean;
  isSearchSubcategory: boolean;
  isFilterSubcategory: boolean;
  isSortSubcategory: boolean;
  idDelete: string | null;
  isLoading: boolean;
  error: string | null;
  subCategoriesWithCategoryId: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  categoryId: string;
}

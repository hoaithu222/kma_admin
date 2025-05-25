export interface initialStateType {
  subcategories: Subcategory[];
  isAddSubcategory: boolean;
  isEditSubcategory: boolean;
  isDeleteSubcategory: boolean;
  isViewSubcategory: boolean;
  isSearchSubcategory: boolean;
  isFilterSubcategory: boolean;
  isSortSubcategory: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  categoryId: string;
}

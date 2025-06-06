export interface initialStateType {
  tags: Tag[];
  isAddTag: boolean;
  isEditTag: boolean;
  isDeleteTag: boolean;
  isViewTag: boolean;
  isSearchTag: boolean;
  isFilterTag: boolean;
  isSortTag: boolean;
  idDelete: number | null;
  isLoading: boolean;
  error: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

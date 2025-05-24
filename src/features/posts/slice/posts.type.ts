export interface initialStateType {
  posts: Post[];
  isAddPost: boolean;
  isEditPost: boolean;
  isDeletePost: boolean;
  isViewPost: boolean;
  isSearchPost: boolean;
  isFilterPost: boolean;
  isSortPost: boolean;
  isLoading: boolean;
  error: string | null;
}
export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

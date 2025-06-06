import { useDispatch, useSelector } from "react-redux";

import {
  getPostsSelector,
  isAddPostSelector,
  isDeletePostSelector,
  isEditPostSelector,
  selectDeletePost,
  selectEditPost,
} from "../slice/posts.selector";

import {
  getAllSubcategories,
  getSubCategories,
} from "@/features/subcategory/slice/subcategory.slice";
import { getCategories } from "@/features/category/slice/category.slice";
import {
  addPost,
  deletePost,
  getPostById,
  getPosts,
  setIsAddPost,
  setIsEditPost,
  updatePost,
} from "../slice/posts.slice";
import {
  IRequestAddArticle,
  IRequestSearchArticle,
  IRequestUpdateArticle,
} from "@/core/api/posts/types";
import { getAllTags } from "@/features/tags/slice/tag.slice";

export const usePost = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPostsSelector);
  const isAddPost = useSelector(isAddPostSelector);
  const isEditPost = useSelector(isEditPostSelector);
  const editPost = useSelector(selectEditPost);
  const isDeletePost = useSelector(isDeletePostSelector);
  const deletePostData = useSelector(selectDeletePost);

  const handleAddPost = (action: boolean) => {
    dispatch(setIsAddPost(action));
  };
  const handleGetCategoryAndSubCategory = () => {
    dispatch(getAllSubcategories());
    dispatch(getCategories());
    dispatch(getAllTags());
  };
  const handleAddArticle = (data: IRequestAddArticle) => {
    dispatch(addPost(data));
  };
  const handleGetArticle = (data: IRequestSearchArticle) => {
    dispatch(getPosts(data));
  };
  // lay danh sach subcategories theo categoryId
  const handleGetSubCategories = (categoryId: number) => {
    dispatch(getSubCategories(categoryId));
  };
  // lấy bài viết theo id
  const handleGetPostById = (id: number) => {
    dispatch(getPostById({ id }));
  };
  const handleEditPost = (data: IRequestUpdateArticle) => {
    dispatch(updatePost(data));
  };
  const handleSetIsEditPost = (data: boolean) => {
    dispatch(setIsEditPost(data));
  };
  // xóa bài viết
  const handleDeletePost = (id: number) => {
    dispatch(deletePost({ id }));
  };
  return {
    posts,
    isAddPost,
    isEditPost,
    editPost,
    isDeletePost,
    deletePostData,
    handleDeletePost,
    handleAddPost,
    handleGetCategoryAndSubCategory,
    handleAddArticle,
    handleGetArticle,
    handleGetSubCategories,
    handleGetPostById,
    handleEditPost,
    handleSetIsEditPost,
  };
};

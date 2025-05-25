import { useDispatch } from "react-redux";
import { getCategory } from "../slice/home.slice";
import { useCallback } from "react";

// import {
//   selectCategory,
//   selectFilter,
//   selectPosts,
// } from "../slice/home.selector";
// import { IRequestBanner } from "@/core/api/home/types";

export const useHome = () => {
  const dispatch = useDispatch();
  // const filter = useSelector(selectFilter);
  // const posts = useSelector(selectPosts);
  // const category = useSelector(selectCategory);

  // const getPostsDispatch = useCallback(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  const getCategoryDispatch = useCallback(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return {
    getCategoryDispatch,
  };
};

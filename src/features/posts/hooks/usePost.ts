import { useDispatch, useSelector } from "react-redux";
import { getPosts, setIsAddPost } from "../slice/posts.slice";
import { getPostsSelector, isAddPostSelector } from "../slice/posts.selector";

export const usePost = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPostsSelector);
  const isAddPost = useSelector(isAddPostSelector);

  const handleAddPost = (action: boolean) => {
    dispatch(setIsAddPost(action));
  };
  const getPostsAction = () => {
    dispatch(getPosts());
  };
  return {
    posts,
    isAddPost,
    handleAddPost,
    getPostsAction,
  };
};

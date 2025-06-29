import Button from "@/foundation/components/buttons/Button";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import ListPost from "./components/list-post/ListPost";
import { usePost } from "./hooks/usePost";
import AddPost from "./components/add-post/AddPost";
import EditPosts from "./components/edit/EditPosts";
import { ResponseAddArticle } from "@/core/api/posts/types";
import { useEffect } from "react";

const PostPage = () => {
  const {
    isAddPost,
    handleAddPost,
    isEditPost,
    editPost,
    handleGetCategoryAndSubCategory,
  } = usePost();
  useEffect(() => {
    handleGetCategoryAndSubCategory();
  }, []);

  return (
    <div
      className={clsx(
        "p-3 h-full rounded-lg border shadow-sm shadow-text-primary",
        "border-border-primary bg-background-base text-text-primary",
        "overflow-auto hidden-scrollbar"
      )}
    >
      <div className="flex justify-between items-center border-b-2 border-border-primary">
        <div className="flex gap-2 items-center p-2">
          <h2 className="text-2xl font-bold text-secondary">Bài viết</h2>
        </div>
        <Button
          variant="secondary"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => handleAddPost(true)}
        >
          Thêm bài viết
        </Button>
      </div>
      <div className="mt-4">
        <ListPost />
      </div>
      {isEditPost && (
        <EditPosts post={editPost.editPost as unknown as ResponseAddArticle} />
      )}
      {isAddPost && <AddPost />}
    </div>
  );
};

export default PostPage;

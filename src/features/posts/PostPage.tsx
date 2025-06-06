import Button from "@/foundation/components/buttons/Button";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import ListPost from "./components/list-post/ListPost";
import { usePost } from "./hooks/usePost";
import AddPost from "./components/add-post/AddPost";
import EditPosts from "./components/edit/EditPosts";

import { Post } from "./slice/posts.type";

const PostPage = () => {
  const { isAddPost, handleAddPost, isEditPost, editPost } = usePost();

  return (
    <div
      className={clsx(
        "h-full p-3 border rounded-lg shadow-sm shadow-text-primary",
        "border-border-primary bg-background-base text-text-primary"
      )}
    >
      <div className="flex items-center justify-between border-b-2 border-border-primary">
        <div className="flex items-center gap-2 p-2 ">
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
      <div className="mt-4 h-[calc(100vh-120px)] overflow-y-auto hidden-scrollbar">
        <ListPost />
      </div>
      {isEditPost && <EditPosts post={editPost.editPost as Post} />}
      {isAddPost && <AddPost />}
    </div>
  );
};

export default PostPage;

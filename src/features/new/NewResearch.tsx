import clsx from "clsx";
import Button from "@/foundation/components/buttons/Button";
import { PlusIcon } from "lucide-react";

import { useBase } from "@/foundation/components/base/hooks/useBase";
import ListPost from "@/foundation/components/base/ListPost";
import { Post } from "@/foundation/components/base/slice/base-post.types";
import EditPosts from "@/foundation/components/base/EditPost";
import AddPost from "@/foundation/components/base/AddPost";
import { NEWS_IDS } from "@/shared/consts/consts";

const NewResearch = () => {
  const { isAddPost, handleAddPost, isEditPost, editPost } = useBase();

  return (
    <div
      className={clsx(
        "p-3 h-full rounded-lg border shadow-sm shadow-text-primary",
        "overflow-auto hidden-scrollbar border-border-primary bg-background-base text-text-primary"
      )}
    >
      <div className="flex justify-between items-center border-b-2 border-border-primary">
        <div className="flex gap-2 items-center p-2">
          <h2 className="text-2xl font-bold text-secondary">
            Quản lý bài viết nghiên cứu khoa học
          </h2>
        </div>
        <Button
          variant="secondary"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => handleAddPost(true)}
        >
          Thêm bài viết về nghiên cứu khoa học
        </Button>
      </div>
      <div className="mt-4">
        <ListPost
          categoryId={NEWS_IDS.NEWS_CATEGORY}
          subCategoryId={NEWS_IDS.NEWS_RESEARCH}
        />
      </div>
      {isEditPost && <EditPosts post={editPost.editPost as Post} />}
      {isAddPost && (
        <AddPost
          categoryId={NEWS_IDS.NEWS_CATEGORY}
          subCategoryId={NEWS_IDS.NEWS_RESEARCH}
        />
      )}
    </div>
  );
};

export default NewResearch;

import clsx from "clsx";
import Button from "@/foundation/components/buttons/Button";
import { PlusIcon } from "lucide-react";

import { useBase } from "@/foundation/components/base/hooks/useBase";
import ListPost from "@/foundation/components/base/ListPost";
import EditPosts from "@/foundation/components/base/EditPost";
import AddPost from "@/foundation/components/base/AddPost";
import { CATEGORY_IDS, SUBCATEGORY_IDS } from "@/shared/consts/consts";
import { ResponseAddArticle } from "@/core/api/posts/types";

const NewPostPage = () => {
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
            Quản lý bài viết tin tức
          </h2>
        </div>
        <Button
          variant="secondary"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => handleAddPost(true)}
        >
          Thêm bài viết về tin tức
        </Button>
      </div>
      <div className="mt-4">
        <ListPost
          categoryId={CATEGORY_IDS.NEWS}
          subCategoryId={SUBCATEGORY_IDS.NEWS}
        />
      </div>
      {isEditPost && (
        <EditPosts post={editPost.editPost as unknown as ResponseAddArticle} />
      )}
      {isAddPost && (
        <AddPost
          categoryId={CATEGORY_IDS.NEWS}
          subCategoryId={SUBCATEGORY_IDS.NEWS}
        />
      )}
    </div>
  );
};

export default NewPostPage;

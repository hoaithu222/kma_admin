import clsx from "clsx";
import Button from "@/foundation/components/buttons/Button";
import { PlusIcon } from "lucide-react";

import { useBase } from "@/foundation/components/base/hooks/useBase";
import ListPost from "@/foundation/components/base/ListPost";
import EditPosts from "@/foundation/components/base/EditPost";
import AddPost from "@/foundation/components/base/AddPost";

import { useParams } from "react-router-dom";
import { useMenu } from "@/features/menu/hooks/useMenu";

const HomePage = () => {
  const { menu } = useMenu();
  const { id } = useParams();
  const { isAddPost, handleAddPost, isEditPost, editPost } = useBase();

  // tìm trong menu map đến items con có id bằng id lấy ra id cha
  const menuItem = menu?.find((item) =>
    item.children.some((child) => child.id === Number(id))
  );
  const parentId = menuItem?.id;

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
            Quản lý bài viết
          </h2>
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
        <ListPost subCategoryId={Number(id)} />
      </div>
      {isEditPost && editPost.editPost && (
        <EditPosts post={editPost.editPost} />
      )}
      {isAddPost && (
        <AddPost categoryId={Number(parentId)} subCategoryId={Number(id)} />
      )}
    </div>
  );
};

export default HomePage;

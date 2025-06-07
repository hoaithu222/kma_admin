import clsx from "clsx";
import Button from "@/foundation/components/buttons/Button";
import { PlusIcon } from "lucide-react";
import LitsCategory from "./components/LitsCategory";
import { useCategory } from "./hooks/useCategory";
import AddCategory from "./components/AddCategory";
const CategoryPage = () => {
  const { isAddCategory, handleAddCategory } = useCategory();
  return (
    <div
      className={clsx(
        "h-full p-3 border rounded-lg shadow-sm shadow-text-primary",
        "border-border-primary bg-background-base text-text-primary relative"
      )}
    >
      <div className="flex items-center justify-between border-b-2 border-border-primary">
        <div className="flex items-center gap-2 p-2 ">
          <h2 className="text-2xl font-bold text-secondary">
            Danh mục bài viết
          </h2>
        </div>
        <Button
          variant="gradientSubtle"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => handleAddCategory(true)}
        >
          Thêm danh mục
        </Button>
      </div>
      <div className="mt-4">
        <LitsCategory />
      </div>
      {isAddCategory && <AddCategory />}
    </div>
  );
};

export default CategoryPage;

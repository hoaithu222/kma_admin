import clsx from "clsx";
import Button from "@/foundation/components/buttons/Button";
import { PlusIcon } from "lucide-react";
import { useSubcategory } from "./hooks/useSubcategory";

import AddSubcategory from "./components/AddSubcategory";
import LitsSubCategory from "./components/LitsSubCategory";

const SubcategoryPage = () => {
  const { isAddSubcategory, handleAddSubcategory } = useSubcategory();
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
            Danh mục chuyên mục
          </h2>
        </div>
        <Button
          variant="gradientSubtle"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => handleAddSubcategory(true)}
        >
          Thêm danh mục chuyên mục
        </Button>
      </div>
      <div className="mt-4">
        <LitsSubCategory />
      </div>
      {isAddSubcategory && <AddSubcategory />}
    </div>
  );
};

export default SubcategoryPage;

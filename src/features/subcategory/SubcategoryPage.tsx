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
        "p-3 h-full rounded-lg border shadow-sm shadow-text-primary",
        "relative border-border-primary bg-background-base text-text-primary",
        "overflow-auto hidden-scrollbar"
      )}
    >
      <div className="flex justify-between items-center border-b-2 border-border-primary">
        <div className="flex gap-2 items-center p-2">
          <h2 className="text-2xl font-bold text-secondary">
            Danh mục chuyên mục
          </h2>
        </div>
        <Button
          variant="outlinedSecondary"
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

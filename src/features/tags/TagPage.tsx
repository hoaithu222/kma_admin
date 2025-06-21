import clsx from "clsx";
import Button from "@/foundation/components/buttons/Button";
import { PlusIcon } from "lucide-react";
import useTag from "./hooks/useTag";

import AddTag from "./components/AddTag";

import ListTag from "./components/ListTag";

const TagPage = () => {
  const { isAddTag, handleAddTag } = useTag();
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
          <h2 className="text-2xl font-bold text-secondary">Danh mục tag</h2>
        </div>
        <Button
          variant="outlinedSecondary"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => handleAddTag(true)}
        >
          Thêm tag
        </Button>
      </div>
      <div className="mt-4">
        <ListTag />
      </div>
      {isAddTag && <AddTag />}
    </div>
  );
};

export default TagPage;

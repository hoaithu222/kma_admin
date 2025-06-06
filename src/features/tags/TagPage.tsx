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
        "h-full p-3 border rounded-lg shadow-sm shadow-text-primary",
        "border-border-primary bg-background-base text-text-primary"
      )}
    >
      <div className="flex items-center justify-between border-b-2 border-border-primary">
        <div className="flex items-center gap-2 p-2 ">
          <h2 className="text-2xl font-bold text-secondary">Danh mục tag</h2>
        </div>
        <Button
          variant="gradientSubtle"
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

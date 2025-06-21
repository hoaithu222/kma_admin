import clsx from "clsx";

import { PlusIcon } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import { useSubmajor } from "./hooks/useSubmajor";
import ListSubMajor from "./components/ListSubMajor";
import AddSubMajor from "./components/AddSubMajor";

const SubMajorPage = () => {
  const { isAddSubmajor, handleChangeAddSubmajor } = useSubmajor();
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
          <h2 className="text-2xl font-bold text-secondary">
            Danh mục chuyên ngành
          </h2>
        </div>
        <Button
          variant="outlinedSecondary"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => handleChangeAddSubmajor(true)}
        >
          Thêm chuyên ngành
        </Button>
      </div>
      <div className="mt-4">
        <ListSubMajor />
      </div>
      {isAddSubmajor && <AddSubMajor />}
    </div>
  );
};

export default SubMajorPage;

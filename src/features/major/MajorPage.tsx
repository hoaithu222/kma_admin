import clsx from "clsx";
import AddMajor from "./components/AddMajor";

import ListMajor from "./components/ListMajor";
import { useMajor } from "./hooks/useMajor";
import { PlusIcon } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";

const MajorPage = () => {
  const { isAddMajor, handleChangeAddMajor } = useMajor();
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
          onClick={() => handleChangeAddMajor(true)}
        >
          Thêm chuyên ngành
        </Button>
      </div>
      <div className="mt-4">
        <ListMajor />
      </div>
      {isAddMajor && <AddMajor />}
    </div>
  );
};

export default MajorPage;

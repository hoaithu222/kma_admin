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
        "h-full p-3 border rounded-lg shadow-sm shadow-text-primary",
        "border-border-primary bg-background-base text-text-primary"
      )}
    >
      <div className="flex items-center justify-between border-b-2 border-border-primary">
        <div className="flex items-center gap-2 p-2 ">
          <h2 className="text-2xl font-bold text-secondary">
            Danh mục chuyên ngành
          </h2>
        </div>
        <Button
          variant="gradientSubtle"
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

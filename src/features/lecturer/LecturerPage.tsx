import Button from "@/foundation/components/buttons/Button";
import AddLecturer from "./components/add/AddLecturer";
import { useLecturer } from "./hooks/useLecturer";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import ListLecturer from "./components/list/ListLecturer";

const LecturerPage = () => {
  const { handleChangeAddLecturer, isAddLecturer } = useLecturer();
  return (
    <div
      className={clsx(
        "h-full p-3 border rounded-lg shadow-sm shadow-text-primary",
        "border-border-primary bg-background-base text-text-primary"
      )}
    >
      <div className="flex items-center justify-between border-b-2 border-border-primary">
        <div className="flex items-center gap-2 p-2 ">
          <h2 className="text-2xl font-bold text-secondary">Giảng viên</h2>
        </div>
        <Button
          variant="secondary"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => handleChangeAddLecturer(true)}
        >
          Thêm giảng viên
        </Button>
      </div>
      <div className="mt-4 h-[calc(100vh-120px)] overflow-y-auto hidden-scrollbar">
        <ListLecturer />
      </div>
      {isAddLecturer && <AddLecturer />}
    </div>
  );
};

export default LecturerPage;

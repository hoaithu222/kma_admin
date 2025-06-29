import Button from "@/foundation/components/buttons/Button";
import AddLecturer from "./components/add/AddLecturer";
import { useLecturer } from "./hooks/useLecturer";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import ListLecturer from "./components/list/ListLecturer";
import { useMajor } from "../major/hooks/useMajor";
import { useEffect } from "react";

const LecturerPage = () => {
  const { handleChangeAddLecturer, isAddLecturer } = useLecturer();
  const { getMajors } = useMajor();
  useEffect(() => {
    getMajors();
  }, []);
  return (
    <div
      className={clsx(
        "p-3 h-full rounded-lg border shadow-sm shadow-text-primary",
        "overflow-auto hidden-scrollbar border-border-primary bg-background-base text-text-primary"
      )}
    >
      <div className="flex justify-between items-center border-b-2 border-border-primary">
        <div className="flex gap-2 items-center p-2">
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
      <div className="mt-4">
        <ListLecturer />
      </div>
      {isAddLecturer && <AddLecturer />}
    </div>
  );
};

export default LecturerPage;

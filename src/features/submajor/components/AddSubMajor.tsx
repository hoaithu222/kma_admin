import Modal from "@/foundation/components/modal/Modal";

import Input from "@/foundation/components/inputs/Input";
import { FolderPen, PlusIcon } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import { useEffect, useState } from "react";

import { ReduxStateType } from "@/app/store/types";
import useSubmajor from "../hooks/useSubmajor";
import { IRequestCreateSubMajor } from "@/core/api/sub-major/types";
import Select from "@/foundation/components/inputs/SelectOption";
import { useMajor } from "@/features/major/hooks/useMajor";

const AddSubMajor = () => {
  const {
    handleChangeAddSubmajor,
    statusAddSubmajor,
    isAddSubmajor,
    addSubmajor,
  } = useSubmajor();
  const { majorData, getMajors } = useMajor();
  const [form, setForm] = useState<IRequestCreateSubMajor>({
    name: "",
    majorId: 0,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSubmajor({
      name: form.name,
      majorId: form.majorId,
    });
  };

  useEffect(() => {
    getMajors();
  }, []);

  return (
    <Modal
      isOpen={isAddSubmajor}
      onOpenChange={() => handleChangeAddSubmajor(false)}
      title="Thêm chuyên ngành"
      size="large"
      animation="slide"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Tên chuyên ngành"
          fullWidth
          label="Tên chuyên ngành"
          className="w-full"
          name="name"
          iconLeft={<FolderPen className="w-4 h-4" />}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Select
          options={majorData.map((major) => ({
            label: major.name,
            value: major.id.toString(),
          }))}
          placeholder="Chọn chuyên ngành cha"
          name="majorId"
          value={form.majorId?.toString() || ""}
          onChange={(value) => setForm({ ...form, majorId: Number(value) })}
          fullWidth={true}
        />

        <div className="flex justify-end">
          <Button
            variant="primary"
            type="submit"
            loading={statusAddSubmajor === ReduxStateType.LOADING}
            iconLeft={<PlusIcon className="w-4 h-4" />}
          >
            Thêm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSubMajor;

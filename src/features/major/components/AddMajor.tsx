import Modal from "@/foundation/components/modal/Modal";

import Input from "@/foundation/components/inputs/Input";
import { FolderPen, PlusIcon } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import Textarea from "@/foundation/components/inputs/TextArea";
import { useState } from "react";
import { IRequestCreateMajor } from "@/core/api/major/types";
import { useMajor } from "../hooks/useMajor";
import { ReduxStateType } from "@/app/store/types";

const AddMajor = () => {
  const { handleChangeAddMajor, statusAddMajor, isAddMajor, addMajor } =
    useMajor();
  const [form, setForm] = useState<IRequestCreateMajor>({
    name: "",
    description: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMajor({
      name: form.name,
      description: form.description,
    });
  };

  return (
    <Modal
      isOpen={isAddMajor}
      onOpenChange={() => handleChangeAddMajor(false)}
      title="Thêm chuyên ngành"
      size="large"
      animation="slide"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Tên tag"
          fullWidth
          label="Tên "
          className="w-full"
          name="name"
          iconLeft={<FolderPen className="w-4 h-4" />}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Textarea
          placeholder="Mô tả"
          fullWidth
          label="Mô tả"
          className="w-full"
          name="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex justify-end">
          <Button
            variant="gradientSubtle"
            type="submit"
            loading={statusAddMajor === ReduxStateType.LOADING}
            iconLeft={<PlusIcon className="w-4 h-4" />}
          >
            Thêm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMajor;

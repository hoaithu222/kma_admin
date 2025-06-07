import Modal from "@/foundation/components/modal/Modal";

import Input from "@/foundation/components/inputs/Input";
import { FolderPen, PencilIcon } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import Textarea from "@/foundation/components/inputs/TextArea";
import { useState } from "react";
import { IRequestUpdateMajor } from "@/core/api/major/types";
import { useMajor } from "../hooks/useMajor";
import { ReduxStateType } from "@/app/store/types";

interface IEditMajorProps {
  major: IRequestUpdateMajor;
}
const EditMajor = ({ major }: IEditMajorProps) => {
  const { handleChangeEditMajor, statusEditMajor, isEditMajor, editMajor } =
    useMajor();

  const [form, setForm] = useState<IRequestUpdateMajor>({
    name: major.name || "",
    description: major.description || "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editMajor(major.id || 0, {
      name: form.name || "",
      description: form.description || "",
    });
  };

  return (
    <Modal
      isOpen={isEditMajor}
      onOpenChange={() => handleChangeEditMajor(false)}
      title="Sửa chuyên ngành"
      size="large"
      animation="slide"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Tên tag"
          fullWidth
          label="Tên"
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
            variant="gradientDark"
            type="submit"
            loading={statusEditMajor === ReduxStateType.LOADING}
            iconLeft={<PencilIcon className="w-4 h-4" />}
          >
            Sửa
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditMajor;

import Modal from "@/foundation/components/modal/Modal";

import Input from "@/foundation/components/inputs/Input";
import { PencilIcon, FolderPen } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import { useEffect, useState } from "react";

import { ReduxStateType } from "@/app/store/types";
import useSubmajor from "../hooks/useSubmajor";
import {
  dataSubMajor,
  IRequestCreateSubMajor,
} from "@/core/api/sub-major/types";
import Select from "@/foundation/components/inputs/SelectOption";
import { useMajor } from "@/features/major/hooks/useMajor";

interface IEditSubMajorProps {
  submajor: dataSubMajor;
}
const EditSubMajor = ({ submajor }: IEditSubMajorProps) => {
  const {
    handleChangeEditSubmajor,
    statusEditSubmajor,
    isEditSubmajor,
    editSubmajor,
  } = useSubmajor();
  const { majorData, getMajors } = useMajor();
  const [form, setForm] = useState<IRequestCreateSubMajor>({
    name: submajor.name || "",
    majorId: submajor.majorId || null,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editSubmajor(submajor.id, {
      name: form.name,
      majorId: form.majorId,
    });
  };

  useEffect(() => {
    getMajors();
  }, []);

  return (
    <Modal
      isOpen={isEditSubmajor}
      onOpenChange={() => handleChangeEditSubmajor(false)}
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
          options={majorData.map((major: { id: number; name: string }) => ({
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
            loading={statusEditSubmajor === ReduxStateType.LOADING}
            iconLeft={<PencilIcon className="w-4 h-4" />}
          >
            Sửa
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditSubMajor;

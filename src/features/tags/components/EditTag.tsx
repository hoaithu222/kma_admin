import Modal from "@/foundation/components/modal/Modal";

import Input from "@/foundation/components/inputs/Input";
import { FolderPen, PlusIcon } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import { useState } from "react";
import { IRequestAddTag, IRequestUpdateTag } from "@/core/api/tags/types";
import useTag from "../hooks/useTag";
import { useDispatch } from "react-redux";
import { editTagSlice } from "../slice/tag.slice";

const EditTag = ({ tag }: { tag: IRequestUpdateTag }) => {
  const { handleEditTag } = useTag();
  const dispatch = useDispatch();
  const [form, setForm] = useState<IRequestAddTag>({
    name: tag.name,
  });
  const handleSubmit = () => {
    dispatch(editTagSlice({ id: tag.id, name: form.name }));
    handleEditTag(false);
  };
  return (
    <Modal
      isOpen={true}
      onOpenChange={() => handleEditTag(false)}
      title="Sửa tag"
      size="large"
      animation="slide"
    >
      <form className="space-y-4">
        <Input
          placeholder="Tên tag"
          fullWidth
          label="Tên tag"
          className="w-full"
          name="name"
          iconLeft={<FolderPen className="w-4 h-4" />}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div className="flex justify-end">
          <Button
            variant="gradientSubtle"
            type="submit"
            loading={false}
            iconLeft={<PlusIcon className="w-4 h-4" />}
            onClick={handleSubmit}
          >
            Sửa tag
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTag;

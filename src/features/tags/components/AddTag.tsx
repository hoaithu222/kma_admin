import Modal from "@/foundation/components/modal/Modal";

import Input from "@/foundation/components/inputs/Input";
import { FolderPen, PlusIcon } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import { useState } from "react";
import { IRequestAddTag } from "@/core/api/tags/types";
import useTag from "../hooks/useTag";
import { addTagSlice } from "../slice/tag.slice";
import { useDispatch } from "react-redux";

const AddTag = () => {
  const { handleAddTag } = useTag();
  const dispatch = useDispatch();
  const [form, setForm] = useState<IRequestAddTag>({
    name: "",
  });
  const handleSubmit = () => {
    dispatch(addTagSlice(form));
    handleAddTag(false);
  };
  return (
    <Modal
      isOpen={true}
      onOpenChange={() => handleAddTag(false)}
      title="Thêm tag"
      size="large"
      animation="slide"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
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
            variant="gradientDark"
            type="submit"
            loading={false}
            iconLeft={<PlusIcon className="w-4 h-4" />}
          >
            Thêm tag
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTag;

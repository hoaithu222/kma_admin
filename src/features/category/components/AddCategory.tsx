import Modal from "@/foundation/components/modal/Modal";
import { useCategory } from "../hooks/useCategory";
import Input from "@/foundation/components/inputs/Input";
import { FolderPen, PlusIcon } from "lucide-react";
import Textarea from "@/foundation/components/inputs/TextArea";
import Button from "@/foundation/components/buttons/Button";
import { useState } from "react";

const AddCategory = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const { handleAddCategory, addCategoryDispatch } = useCategory();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCategoryDispatch(data);
  };
  return (
    <Modal
      isOpen={true}
      onOpenChange={() => handleAddCategory(false)}
      title="Thêm danh mục"
      size="large"
      animation="slide"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Tên danh mục"
          fullWidth
          label="Tên danh mục"
          className="w-full"
          iconLeft={<FolderPen className="w-4 h-4" />}
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <Textarea
          placeholder="Mô tả danh mục"
          fullWidth
          label="Mô tả danh mục"
          className="w-full"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <div className="flex justify-end">
          <Button
            variant="gradientSuccess"
            type="submit"
            loading={false}
            iconLeft={<PlusIcon className="w-4 h-4" />}
          >
            Thêm danh mục
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategory;

import Modal from "@/foundation/components/modal/Modal";
import { useSubcategory } from "../hooks/useSubcategory";
import Input from "@/foundation/components/inputs/Input";
import { FolderPen, PlusIcon } from "lucide-react";
import Textarea from "@/foundation/components/inputs/TextArea";
import Button from "@/foundation/components/buttons/Button";
import Select from "@/foundation/components/inputs/SelectOption";

const AddCategory = () => {
  const { handleAddSubcategory } = useSubcategory();
  return (
    <Modal
      isOpen={true}
      onOpenChange={() => handleAddSubcategory(false)}
      title="Thêm danh mục con"
      size="large"
      animation="slide"
    >
      <form className="space-y-4">
        <Input
          placeholder="Tên danh mục con"
          fullWidth
          label="Tên danh mục"
          className="w-full"
          iconLeft={<FolderPen className="w-4 h-4" />}
        />
        <Select
          placeholder="Chọn danh mục cha"
          fullWidth
          label="Danh mục cha"
          className="w-full"
          options={[]}
        />
        <Textarea
          placeholder="Mô tả danh mục"
          fullWidth
          label="Mô tả danh mục"
          className="w-full"
        />
        <div className="flex justify-end">
          <Button
            variant="gradientDark"
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

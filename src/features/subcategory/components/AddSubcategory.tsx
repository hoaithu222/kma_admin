import Modal from "@/foundation/components/modal/Modal";
import { useSubcategory } from "../hooks/useSubcategory";
import Input from "@/foundation/components/inputs/Input";
import { FolderPen, PlusIcon } from "lucide-react";
import Textarea from "@/foundation/components/inputs/TextArea";
import Button from "@/foundation/components/buttons/Button";
import Select from "@/foundation/components/inputs/SelectOption";
import { useCategory } from "@/features/category/hooks/useCategory";
import { useState } from "react";
import { IRequestAddSubcategory } from "@/core/api/subcategory/types";

const AddCategory = () => {
  const { handleAddSubcategoryAction, handleAddSubcategory } = useSubcategory();
  const { categories } = useCategory();
  const [form, setForm] = useState<IRequestAddSubcategory>({
    name: "",
    categoryId: "",
    description: "",
    slug: "",
  });
  return (
    <Modal
      isOpen={true}
      onOpenChange={() => handleAddSubcategory(false)}
      title="Thêm danh mục con"
      size="large"
      animation="slide"
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddSubcategoryAction(form);
        }}
      >
        <Input
          placeholder="Tên danh mục con"
          fullWidth
          label="Tên danh mục"
          className="w-full"
          name="name"
          iconLeft={<FolderPen className="w-4 h-4" />}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Select
          placeholder="Chọn danh mục cha"
          fullWidth
          label="Danh mục cha"
          className="w-full"
          name="categoryId"
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
          value={form.categoryId}
          onChange={(value) => setForm({ ...form, categoryId: value })}
        />
        <Textarea
          placeholder="Mô tả danh mục"
          fullWidth
          label="Mô tả danh mục"
          className="w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          name="description"
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

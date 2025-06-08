import Modal from "@/foundation/components/modal/Modal";
import { useSubcategory } from "../hooks/useSubcategory";
import Input from "@/foundation/components/inputs/Input";
import { FolderPen, PlusIcon } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import Select from "@/foundation/components/inputs/SelectOption";
import { useCategory } from "@/features/category/hooks/useCategory";
import { useState } from "react";
import { IRequestEditSubcategory } from "@/core/api/subcategory/types";
import { Subcategory } from "../slice/subcategory.type";

const EditSubCategory = ({ subcategory }: { subcategory: Subcategory }) => {
  const { handleEditSubcategoryAction, handleEditSubcategory } =
    useSubcategory();
  const { categories } = useCategory();
  const [form, setForm] = useState<IRequestEditSubcategory>({
    id: subcategory.id,
    name: subcategory.name,
    categoryId: subcategory.categoryId as string,
    slug: subcategory.slug,
  });
  return (
    <Modal
      isOpen={true}
      onOpenChange={() => handleEditSubcategory(false)}
      title="Sửa danh mục con"
      size="large"
      animation="slide"
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleEditSubcategoryAction(form);
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
        <div className="flex justify-end">
          <Button
            variant="gradientDark"
            type="submit"
            loading={false}
            iconLeft={<PlusIcon className="w-4 h-4" />}
          >
            Sửa danh mục
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditSubCategory;

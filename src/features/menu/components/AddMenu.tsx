import React, { useState, useEffect } from "react";
import { FileText, Eye, EyeOff, Plus, Minus } from "lucide-react";
import { useMenu } from "../hooks/useMenu";
import { dataMenu } from "../slice/menu.types";
import Modal from "@/foundation/components/modal/Modal";
import Input from "@/foundation/components/inputs/Input";
import Textarea from "@/foundation/components/inputs/TextArea";
import Select from "@/foundation/components/inputs/SelectOption";
import Button from "@/foundation/components/buttons/Button";

interface ChildCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
  displayOrder: number;
  level: number;
  isVisible: boolean;
  children: dataMenu[];
}

interface GrandChildCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
  displayOrder: number;
  level: number;
  isVisible: boolean;
  children: dataMenu[];
}

interface FormErrors {
  name?: string;
  displayOrder?: string;
}

const AddMenu = () => {
  const {
    isAddMenu,
    handleCloseModalAddMenu,
    handleAddMenuAction,
    menu,
    statusAddMenu,
  } = useMenu();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentId: 0,
    displayOrder: 1,
    level: 0,
    isVisible: true,
  });

  const [childrenData, setChildrenData] = useState<ChildCategory[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  // Update level when parent changes
  useEffect(() => {
    const parentLevel =
      formData.parentId === 0 || formData.parentId === null
        ? 0
        : (menu.find((item) => item.id === formData.parentId)?.level ?? 0) + 1;
    setFormData((prev) => ({ ...prev, level: parentLevel }));
  }, [formData.parentId, menu]);

  // Auto close modal after successful add
  useEffect(() => {
    if (statusAddMenu === "success") {
      handleClose();
    }
  }, [statusAddMenu]);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên danh mục là bắt buộc";
    }

    if (formData.displayOrder < 1) {
      newErrors.displayOrder = "Thứ tự phải lớn hơn 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const newMenu = {
        name: formData.name,
        description: formData.description,
        parentId: formData.parentId === 0 ? null : formData.parentId,
        displayOrder: formData.displayOrder,
        level: formData.level,
        isVisible: formData.isVisible,
        children: childrenData.map((child) => ({
          name: child.name,
          description: child.description,
          parentId: 0,
          displayOrder: child.displayOrder,
          level: formData.level + 1,
          isVisible: child.isVisible,
          children: child.children.map((grandChild) => ({
            name: grandChild.name,
            description: grandChild.description,
            parentId: 0,
            displayOrder: grandChild.displayOrder,
            level: formData.level + 2,
            isVisible: grandChild.isVisible,
            children: [],
          })),
        })),
      };

      handleAddMenuAction(newMenu);
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    handleCloseModalAddMenu();
    setFormData({
      name: "",
      description: "",
      parentId: 0,
      displayOrder: 1,
      level: 0,
      isVisible: true,
    });
    setChildrenData([]);
    setErrors({});
    setLoading(false);
  };

  const addChildCategory = () => {
    const newChild: ChildCategory = {
      id: Date.now(),
      name: "",
      slug: "",
      description: "",
      parentId: 0,
      displayOrder: childrenData.length + 1,
      level: formData.level + 1,
      isVisible: true,
      children: [],
    };
    setChildrenData([...childrenData, newChild]);
  };

  const removeChildCategory = (index: number) => {
    setChildrenData(childrenData.filter((_, i) => i !== index));
  };

  const updateChildCategory = (
    index: number,
    field: keyof ChildCategory,
    value: any
  ) => {
    const updated = [...childrenData];
    updated[index] = { ...updated[index], [field]: value };
    setChildrenData(updated);
  };

  const addGrandChildCategory = (childIndex: number) => {
    const updated = [...childrenData];
    const newGrandChild: GrandChildCategory = {
      id: Date.now() + Math.random(),
      name: "",
      slug: "",
      description: "",
      parentId: 0,
      displayOrder: updated[childIndex].children.length + 1,
      level: formData.level + 2,
      isVisible: true,
      children: [],
    };
    updated[childIndex].children = [
      ...updated[childIndex].children,
      newGrandChild,
    ];
    setChildrenData(updated);
  };

  const removeGrandChildCategory = (
    childIndex: number,
    grandChildIndex: number
  ) => {
    const updated = [...childrenData];
    updated[childIndex].children = updated[childIndex].children.filter(
      (_, i) => i !== grandChildIndex
    );
    setChildrenData(updated);
  };

  const updateGrandChildCategory = (
    childIndex: number,
    grandChildIndex: number,
    field: keyof GrandChildCategory,
    value: any
  ) => {
    const updated = [...childrenData];
    updated[childIndex].children[grandChildIndex] = {
      ...updated[childIndex].children[grandChildIndex],
      [field]: value,
    };
    setChildrenData(updated);
  };

  if (!isAddMenu) {
    return null;
  }

  return (
    <Modal
      size="xlarge"
      isOpen={isAddMenu}
      onOpenChange={() => handleClose()}
      title="Thêm danh mục mới"
      showCloseButton={true}
      closeOnBackdropClick={false}
      backdrop="dark"
      animation="fade"
      className="z-50"
      overlayClassName="z-50"
      contentClassName="z-50 max-h-[90vh] hidden-scrollbar"
      scrollable={true}
    >
      <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-2 hidden-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Thông tin cơ bản */}
          <div className="space-y-3">
            <h3 className="pb-1 text-base font-semibold border-b text-text-primary border-border-primary">
              Thông tin cơ bản
            </h3>

            {/* Tên danh mục */}
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nhập tên danh mục..."
              label="Tên danh mục *"
              fullWidth={true}
              status={errors.name ? "error" : "default"}
              helperText={errors.name}
              className="text-base"
            />

            {/* Danh mục cha */}
            <Select
              options={[
                { value: 0, label: "Danh mục gốc" },
                ...menu.map((item) => ({
                  value: item.id,
                  label: item.name,
                })),
              ]}
              value={formData.parentId?.toString()}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  parentId: Number(value),
                })
              }
              placeholder="Chọn danh mục cha"
              label="Danh mục cha"
              fullWidth={true}
            />

            {/* Thứ tự hiển thị */}
            <Input
              type="number"
              min="1"
              value={formData.displayOrder}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  displayOrder: Number(e.target.value),
                })
              }
              placeholder="Nhập thứ tự hiển thị"
              label="Thứ tự hiển thị *"
              fullWidth={true}
              status={errors.displayOrder ? "error" : "default"}
              helperText={errors.displayOrder}
            />

            {/* Mô tả */}
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Mô tả chi tiết về danh mục..."
              label="Mô tả"
              fullWidth={true}
            />

            {/* Trạng thái hiển thị */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Trạng thái hiển thị
              </label>
              <div className="flex items-center space-x-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isVisible: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded text-primary border-border-secondary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-text-primary">
                    {formData.isVisible ? "Hiển thị" : "Ẩn"} danh mục
                  </span>
                </label>
                {formData.isVisible ? (
                  <Eye size={16} className="text-success" />
                ) : (
                  <EyeOff size={16} className="text-text-muted" />
                )}
              </div>
            </div>

            {/* Thông tin cấp độ */}
            <div className="p-3 bg-gradient-to-r rounded-lg border from-primary/10 to-secondary/10 border-border-secondary">
              <div className="flex items-center text-sm text-text-secondary">
                <div className="mr-2 w-2 h-2 bg-gradient-to-r rounded-full from-primary to-secondary"></div>
                <span className="font-medium">Cấp độ: {formData.level}</span>
                <span className="ml-2 text-text-muted">
                  {formData.level === 0 ? "(Danh mục gốc)" : "(Danh mục con)"}
                </span>
              </div>
            </div>
          </div>

          {/* Danh mục con */}
          {formData.level === 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-1 border-b text-text-primary border-border-primary">
                <h3 className="text-base font-semibold">Danh mục con</h3>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={addChildCategory}
                  iconLeft={<Plus size={16} />}
                >
                  Thêm con
                </Button>
              </div>

              {childrenData.length === 0 ? (
                <div className="py-8 text-center text-text-muted">
                  <FileText
                    size={48}
                    className="mx-auto mb-3 text-text-muted"
                  />
                  <p>Chưa có danh mục con nào</p>
                  <p className="text-sm">
                    Click "Thêm con" để thêm danh mục con
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {childrenData.map((child, childIndex) => (
                    <div
                      key={child.id}
                      className="p-4 bg-gradient-to-r rounded-lg border from-background-elevated to-background-muted border-border-secondary"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-text-primary">
                          Danh mục con #{childIndex + 1}
                        </h4>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => removeChildCategory(childIndex)}
                          iconLeft={<Minus size={16} />}
                        >
                          Xóa
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <Input
                          value={child.name}
                          onChange={(e) =>
                            updateChildCategory(
                              childIndex,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Nhập tên danh mục con..."
                          label="Tên danh mục con *"
                          fullWidth={true}
                        />

                        <Input
                          type="number"
                          min="1"
                          value={child.displayOrder}
                          onChange={(e) =>
                            updateChildCategory(
                              childIndex,
                              "displayOrder",
                              Number(e.target.value)
                            )
                          }
                          placeholder="Thứ tự"
                          label="Thứ tự"
                          fullWidth={true}
                        />

                        <div className="md:col-span-2">
                          <Textarea
                            value={child.description}
                            onChange={(e) =>
                              updateChildCategory(
                                childIndex,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Mô tả danh mục con..."
                            label="Mô tả"
                            fullWidth={true}
                          />
                        </div>

                        <div className="flex items-center space-x-3">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={child.isVisible}
                              onChange={(e) =>
                                updateChildCategory(
                                  childIndex,
                                  "isVisible",
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 rounded text-primary border-border-secondary focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-text-primary">
                              Hiển thị
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Danh mục cháu (cấp 2) */}
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between items-center pb-1 border-b border-border-secondary">
                          <h5 className="text-sm font-medium text-text-secondary">
                            Danh mục con (cấp 2)
                          </h5>
                          <Button
                            variant="secondary"
                            size="small"
                            onClick={() => addGrandChildCategory(childIndex)}
                            iconLeft={<Plus size={14} />}
                          >
                            Thêm danh mục con (cấp 2)
                          </Button>
                        </div>

                        {child.children.length === 0 ? (
                          <div className="py-4 text-center text-text-muted">
                            <p className="text-sm">Chưa có danh mục nào</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {child.children.map(
                              (grandChild, grandChildIndex) => (
                                <div
                                  key={grandChild.id}
                                  className="p-3 ml-4 bg-gradient-to-r rounded-lg border from-background-muted to-background-elevated border-border-secondary"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <h6 className="text-sm font-medium text-text-secondary">
                                      Danh mục con (cấp 2) #
                                      {grandChildIndex + 1}
                                    </h6>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() =>
                                        removeGrandChildCategory(
                                          childIndex,
                                          grandChildIndex
                                        )
                                      }
                                      iconLeft={<Minus size={14} />}
                                    >
                                      Xóa
                                    </Button>
                                  </div>

                                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                    <Input
                                      value={grandChild.name}
                                      onChange={(e) =>
                                        updateGrandChildCategory(
                                          childIndex,
                                          grandChildIndex,
                                          "name",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Nhập tên danh mục con (cấp 2)..."
                                      label="Tên danh mục con (cấp 2) *"
                                      fullWidth={true}
                                      size="small"
                                    />

                                    <Input
                                      type="number"
                                      min="1"
                                      value={grandChild.displayOrder}
                                      onChange={(e) =>
                                        updateGrandChildCategory(
                                          childIndex,
                                          grandChildIndex,
                                          "displayOrder",
                                          Number(e.target.value)
                                        )
                                      }
                                      placeholder="Thứ tự"
                                      label="Thứ tự"
                                      fullWidth={true}
                                      size="small"
                                    />

                                    <div className="md:col-span-2">
                                      <Textarea
                                        value={grandChild.description}
                                        onChange={(e) =>
                                          updateGrandChildCategory(
                                            childIndex,
                                            grandChildIndex,
                                            "description",
                                            e.target.value
                                          )
                                        }
                                        placeholder="Mô tả danh mục con (cấp 2)..."
                                        label="Mô tả"
                                        fullWidth={true}
                                        size="small"
                                      />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                      <label className="flex items-center cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={grandChild.isVisible}
                                          onChange={(e) =>
                                            updateGrandChildCategory(
                                              childIndex,
                                              grandChildIndex,
                                              "isVisible",
                                              e.target.checked
                                            )
                                          }
                                          className="w-4 h-4 rounded text-primary border-border-secondary focus:ring-primary"
                                        />
                                        <span className="ml-2 text-sm text-text-primary">
                                          Hiển thị
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="relative h-6">
            <div className="flex fixed right-0 bottom-0 left-0 justify-end p-2 space-x-3 rounded-b-lg text-text-primary bg-background-elevated">
              <Button variant="outlined" onClick={handleClose}>
                Hủy
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
                iconLeft={loading ? undefined : <Plus size={16} />}
              >
                {loading ? "Đang xử lý..." : "Thêm danh mục"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddMenu;

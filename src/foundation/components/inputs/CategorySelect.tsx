import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { selectMenuSelector } from "@/features/menu/slice/menu.selector";
import { dataMenu } from "@/features/menu/slice/menu.types";

interface CategorySelectProps {
  value?: number | null | string;
  onChange?: (value: number | null) => void;
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
  className?: string;
}

const CategorySelect = ({
  value,
  onChange,
  placeholder = "Chọn danh mục...",
  label,
  fullWidth = false,
  className = "",
}: CategorySelectProps) => {
  const categories = useSelector(selectMenuSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set<number>());

  // Hàm tìm danh mục theo ID
  const findCategoryById = (
    categories: dataMenu[],
    id: number
  ): dataMenu | null => {
    for (let category of categories) {
      if (category.id === id) return category;
      if (category.children) {
        const found = findCategoryById(category.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Xử lý khi chọn danh mục
  const handleSelect = (categoryId: number | null) => {
    onChange?.(categoryId || 0);
    setIsOpen(false);
  };

  // Xử lý mở/đóng danh mục con
  const toggleExpanded = (categoryId: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedItems(newExpanded);
  };

  // Render danh mục với cây phân cấp
  const renderCategory = (category: dataMenu, level = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedItems.has(category.id);
    const isSelected = value === category.id;

    return (
      <div key={category.id} className="w-full">
        <div
          className={`flex items-center px-3 py-2 cursor-pointer transition-all duration-200 hover:bg-background-muted ${
            isSelected
              ? "border-l-2 text-secondary bg-secondary/10 border-secondary"
              : "text-text-primary"
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => handleSelect(category.id)}
        >
          <div className="flex flex-1 items-center">
            {hasChildren && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded(category.id);
                }}
                className="p-1 mr-2 rounded transition-all duration-200 hover:bg-background-elevated text-text-muted hover:text-text-secondary"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
            {!hasChildren && <div className="mr-2 w-6" />}
            <span className="text-sm font-medium">{category.name}</span>
          </div>
          <span className="ml-2 text-xs text-text-muted">
            ID: {category.id}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-6 border-l border-border-secondary">
            {category.children.map((child: dataMenu) =>
              renderCategory(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const selectedCategory =
    value && value !== 0 ? findCategoryById(categories, Number(value)) : null;

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      {/* Select Input */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center px-4 py-3 w-full text-left rounded-lg border transition-all duration-200 bg-background-elevated border-border-secondary hover:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
        >
          <span
            className={
              selectedCategory || value === 0
                ? "text-text-primary"
                : "text-text-muted"
            }
          >
            {selectedCategory
              ? selectedCategory.name
              : value === 0
                ? "Danh mục gốc"
                : placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform text-text-muted ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="overflow-y-auto absolute z-10 mt-1 w-full max-h-80 rounded-lg border shadow-lg bg-background-elevated border-border-secondary">
            {/* Root category option */}
            <div
              className={`flex items-center px-3 py-2 cursor-pointer transition-all duration-200 hover:bg-background-muted ${
                value === 0
                  ? "border-l-2 text-secondary bg-secondary/10 border-secondary"
                  : "text-text-primary"
              }`}
              onClick={() => handleSelect(null)}
            >
              <div className="flex flex-1 items-center">
                <span className="text-sm font-medium">Danh mục gốc</span>
              </div>
              <span className="ml-2 text-xs text-text-muted">
                (Không có danh mục cha)
              </span>
            </div>

            {/* Divider */}
            <div className="my-1 border-t border-border-secondary" />

            {/* Existing categories */}
            {categories.map((category: dataMenu) => renderCategory(category))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelect;

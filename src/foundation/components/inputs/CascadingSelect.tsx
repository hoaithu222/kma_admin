import { ChevronDown, Plus, X } from "lucide-react";
import React, { useState, useEffect } from "react";

export interface CascadingOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  children?: CascadingOption[];
}

export type InputVariant = "default" | "outlined" | "filled" | "underlined";
export type InputSize = "small" | "medium" | "large";
export type InputStatus = "default" | "success" | "error" | "warning";

export interface CascadingSelectProps {
  variant?: InputVariant;
  size?: InputSize;
  status?: InputStatus;
  label?: string;
  helperText?: string;
  options: CascadingOption[];
  placeholder?: string;
  subPlaceholder?: string;
  fullWidth?: boolean;
  defaultValue?: {
    parent?: string;
    child?: string;
  };
  className?: string;
  disabled?: boolean;
  onChange?: (value: { parent: string; child?: string }) => void;
  // Add new feature props
  allowAddNew?: boolean;
  addNewText?: string;
  addNewPlaceholder?: string;
  onAddNew?: (newValue: string, parentValue?: string) => void;
  // Layout props
  direction?: "horizontal" | "vertical";
  spacing?: "small" | "medium" | "large";
}

const CascadingSelect = React.forwardRef<HTMLDivElement, CascadingSelectProps>(
  (
    {
      variant = "outlined",
      size = "medium",
      status = "default",
      label,
      helperText,
      options,
      placeholder = "Chọn danh mục",
      subPlaceholder = "Chọn danh mục con",
      fullWidth = false,
      defaultValue,
      className = "",
      disabled = false,
      onChange,
      allowAddNew = false,
      addNewText = "Thêm mới...",
      addNewPlaceholder = "Nhập giá trị mới",
      onAddNew,
      direction = "horizontal",
      spacing = "medium",
      ...props
    },
    ref
  ) => {
    const [selectedParent, setSelectedParent] = useState<string>(
      defaultValue?.parent || ""
    );
    const [selectedChild, setSelectedChild] = useState<string>(
      defaultValue?.child || ""
    );
    const [isFocused, setIsFocused] = useState<{
      parent: boolean;
      child: boolean;
    }>({
      parent: false,
      child: false,
    });
    const [isAddingNew, setIsAddingNew] = useState<{
      parent: boolean;
      child: boolean;
    }>({
      parent: false,
      child: false,
    });
    const [newValue, setNewValue] = useState("");
    const [localOptions, setLocalOptions] = useState(options);

    // Get subcategories for selected parent
    const subOptions = selectedParent
      ? localOptions.find((opt) => opt.value === selectedParent)?.children || []
      : [];

    // Base classes
    const baseClasses =
      "transition-all duration-200 focus:outline-none appearance-none cursor-pointer text-text-primary";

    // Variant classes
    const variantClasses = {
      default:
        "border border-border-secondary bg-background-elevated text-text-primary rounded-lg focus:border-border-focus focus:ring-2 focus:ring-secondary/20",
      outlined:
        "border border-border-secondary bg-background-elevated text-text-primary rounded-lg focus:border-border-focus focus:ring-2 focus:ring-secondary/20",
      filled:
        "border-0 bg-background-elevated rounded-lg focus:bg-background-base focus:ring-2 focus:ring-secondary/20",
      underlined:
        "border-0 border-b-2 border-border-secondary bg-transparent rounded-none focus:border-border-focus",
    };

    // Size classes
    const sizeClasses = {
      small: "h-8 px-3 text-sm",
      medium: "h-10 px-4 text-base",
      large: "h-12 px-4 text-lg",
    };

    // Status classes
    const statusClasses = {
      default: "",
      success: "border-success focus:border-success focus:ring-success/20",
      error: "border-error focus:border-error focus:ring-error/20",
      warning: "border-warning focus:border-warning focus:ring-warning/20",
    };

    // Spacing classes
    const spacingClasses = {
      small: direction === "horizontal" ? "space-x-2" : "space-y-2",
      medium: direction === "horizontal" ? "space-x-4" : "space-y-4",
      large: direction === "horizontal" ? "space-x-6" : "space-y-6",
    };

    const getSelectClasses = (field: "parent" | "child") =>
      [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        status !== "default" ? statusClasses[status] : "",
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed bg-background-muted" : "",
        isFocused[field]
          ? "border-secondary focus:border-secondary focus:ring-secondary/20"
          : "",
        "pr-10",
      ]
        .filter(Boolean)
        .join(" ");

    const inputClasses = [
      baseClasses.replace("cursor-pointer", ""),
      variantClasses[variant],
      sizeClasses[size],
      "pr-20",
      fullWidth ? "w-full" : "",
      "placeholder:text-text-muted",
    ]
      .filter(Boolean)
      .join(" ");

    const helperTextColor = {
      default: "text-text-muted",
      success: "text-success",
      error: "text-error",
      warning: "text-warning",
    };

    // Handle parent selection
    const handleParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value === "__ADD_NEW__") {
        setIsAddingNew({ parent: true, child: false });
      } else {
        setSelectedParent(value);
        setSelectedChild(""); // Reset child selection
        onChange?.({ parent: value, child: undefined });
      }
    };

    // Handle child selection
    const handleChildChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value === "__ADD_NEW__") {
        setIsAddingNew({ parent: false, child: true });
      } else {
        setSelectedChild(value);
        onChange?.({ parent: selectedParent, child: value });
      }
    };

    // Handle add new
    const handleAddNew = (isParent: boolean) => {
      if (newValue.trim()) {
        if (isParent) {
          const newOption: CascadingOption = {
            value: newValue.trim(),
            label: newValue.trim(),
            children: [],
          };
          setLocalOptions([...localOptions, newOption]);
          setSelectedParent(newValue.trim());
          setSelectedChild("");
          onChange?.({ parent: newValue.trim(), child: undefined });
        } else {
          // Add to selected parent's children
          const updatedOptions = localOptions.map((opt) => {
            if (opt.value === selectedParent) {
              const newChild: CascadingOption = {
                value: newValue.trim(),
                label: newValue.trim(),
              };
              return {
                ...opt,
                children: [...(opt.children || []), newChild],
              };
            }
            return opt;
          });
          setLocalOptions(updatedOptions);
          setSelectedChild(newValue.trim());
          onChange?.({ parent: selectedParent, child: newValue.trim() });
        }

        onAddNew?.(newValue.trim(), isParent ? undefined : selectedParent);
        setNewValue("");
        setIsAddingNew({ parent: false, child: false });
      }
    };

    const handleCancelAdd = () => {
      setIsAddingNew({ parent: false, child: false });
      setNewValue("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleAddNew(isAddingNew.parent);
      } else if (e.key === "Escape") {
        handleCancelAdd();
      }
    };

    // Reset child when parent changes
    useEffect(() => {
      if (
        selectedParent &&
        !subOptions.some((opt) => opt.value === selectedChild)
      ) {
        setSelectedChild("");
      }
    }, [selectedParent, subOptions, selectedChild]);

    const renderSelect = (
      type: "parent" | "child",
      selectOptions: CascadingOption[],
      value: string,
      placeholderText: string,
      handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    ) => {
      const isAddingNewField =
        type === "parent" ? isAddingNew.parent : isAddingNew.child;

      if (isAddingNewField) {
        return (
          <div className="relative flex-1">
            <input
              type="text"
              className={inputClasses}
              placeholder={addNewPlaceholder}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
            <div className="flex absolute right-3 top-1/2 items-center space-x-1 transform -translate-y-1/2">
              <button
                type="button"
                onClick={() => handleAddNew(type === "parent")}
                className="p-1 text-success hover:text-success-dark focus:outline-none"
                disabled={!newValue.trim()}
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleCancelAdd}
                className="p-1 text-text-muted hover:text-text-primary focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="relative flex-1">
          <select
            className={getSelectClasses(type)}
            disabled={disabled || (type === "child" && !selectedParent)}
            onFocus={() => setIsFocused((prev) => ({ ...prev, [type]: true }))}
            onBlur={() => setIsFocused((prev) => ({ ...prev, [type]: false }))}
            onChange={handleChange}
            value={value}
          >
            <option value="" disabled>
              {placeholderText}
            </option>
            {selectOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
            {allowAddNew && selectOptions.length > 0 && (
              <option
                value="__ADD_NEW__"
                className="font-medium text-secondary"
              >
                + {addNewText}
              </option>
            )}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={`${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {label && (
          <label className="block mb-1 text-sm font-medium text-text-primary">
            {label}
          </label>
        )}

        <div
          className={`flex ${direction === "horizontal" ? "flex-row" : "flex-col"} ${spacingClasses[spacing]}`}
        >
          {/* Parent Select */}
          {renderSelect(
            "parent",
            localOptions,
            selectedParent,
            placeholder,
            handleParentChange
          )}

          {/* Child Select - only show if parent is selected */}
          {selectedParent &&
            subOptions.length > 0 &&
            renderSelect(
              "child",
              subOptions,
              selectedChild,
              subPlaceholder,
              handleChildChange
            )}
        </div>

        {helperText && (
          <p className={`mt-1 text-xs ${helperTextColor[status]}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

CascadingSelect.displayName = "CascadingSelect";
export default CascadingSelect;

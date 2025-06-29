import { ChevronDown, Plus, X } from "lucide-react";
import React, { useState } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type InputVariant = "default" | "outlined" | "filled" | "underlined";
export type InputSize = "small" | "medium" | "large";
export type InputStatus = "default" | "success" | "error" | "warning";

export interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "size" | "onChange"
  > {
  variant?: InputVariant;
  size?: InputSize;
  status?: InputStatus;
  label?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
  defaultValue?: string;
  iconLeft?: React.ReactNode;
  className?: string;
  onChange?: (value: string) => void;
  // New props for add option feature
  allowAddNew?: boolean;
  addNewText?: string;
  addNewPlaceholder?: string;
  onAddNew?: (newValue: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      variant = "outlined",
      size = "medium",
      status = "default",
      label,
      helperText,
      options,
      placeholder,
      fullWidth = false,
      defaultValue,
      iconLeft,
      className = "",
      disabled = false,
      onChange,
      allowAddNew = false,
      addNewText = "Thêm mới...",
      addNewPlaceholder = "Nhập giá trị mới",
      onAddNew,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newValue, setNewValue] = useState("");
    const [localOptions, setLocalOptions] = useState(options);

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

    const selectClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      status !== "default" ? statusClasses[status] : "",
      fullWidth ? "w-full" : "",
      disabled ? "opacity-50 cursor-not-allowed bg-background-muted" : "",
      iconLeft ? "pl-10" : "",
      isFocused ? "border-secondary" : "",
      "pr-10",
      className,
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

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (value === "__ADD_NEW__") {
        setIsAddingNew(true);
      } else {
        onChange?.(value);
      }
    };

    const handleAddNew = () => {
      if (newValue.trim()) {
        const newOption: SelectOption = {
          value: newValue.trim(),
          label: newValue.trim(),
        };

        setLocalOptions([...localOptions, newOption]);
        onAddNew?.(newValue.trim());
        onChange?.(newValue.trim());
        setNewValue("");
        setIsAddingNew(false);
      }
    };

    const handleCancelAdd = () => {
      setIsAddingNew(false);
      setNewValue("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleAddNew();
      } else if (e.key === "Escape") {
        handleCancelAdd();
      }
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-text-primary">
            {label}
          </label>
        )}

        {isAddingNew ? (
          // Add new input mode
          <div className="relative">
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
                onClick={handleAddNew}
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
        ) : (
          // Normal select mode
          <div className="relative">
            {iconLeft && (
              <div className="absolute left-3 top-1/2 text-text-muted transform -translate-y-1/2">
                {iconLeft}
              </div>
            )}
            <select
              ref={ref}
              className={selectClasses}
              disabled={disabled}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleSelectChange}
              defaultValue={defaultValue}
              {...props}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {localOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
              {allowAddNew && (
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
        )}

        {helperText && (
          <p className={`mt-1 text-xs ${helperTextColor[status]}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;

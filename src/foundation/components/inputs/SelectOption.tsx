import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
// ============= INPUT COMPONENT =============
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
  iconLeft?: React.ReactNode;
  className?: string;
  onChange?: (value: string) => void;
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
      iconLeft,
      className = "",
      disabled = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Base classes
    const baseClasses =
      "transition-all duration-200 focus:outline-none appearance-none cursor-pointer";

    // Variant classes (same as Input)
    const variantClasses = {
      default:
        "border border-gray-300 bg-background-elevated rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
      outlined:
        "border border-gray-300 bg-background-elevated rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
      filled:
        "border-0 bg-background-muted rounded-lg focus:bg-background-elevated focus:ring-2 focus:ring-blue-100",
      underlined:
        "border-0 border-b-2 border-gray-300 bg-transparent rounded-none focus:border-blue-500",
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
      success: "border-green-500 focus:border-green-500 focus:ring-green-100",
      error: "border-red-500 focus:border-red-500 focus:ring-red-100",
      warning:
        "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-100",
    };

    const selectClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      status !== "default" ? statusClasses[status] : "",
      fullWidth ? "w-full" : "",
      disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "",
      iconLeft ? "pl-10" : "",
      isFocused ? "border-primary" : "",
      "pr-10", // Space for chevron icon
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const helperTextColor = {
      default: "text-gray-500",
      success: "text-green-600",
      error: "text-red-600",
      warning: "text-yellow-600",
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <div className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2">
              {iconLeft}
            </div>
          )}
          <select
            ref={ref}
            className={selectClasses}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onChange?.(e.target.value)}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute transform -translate-y-1/2 pointer-events-none right-3 top-1/2">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
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

Select.displayName = "Select";
export default Select;

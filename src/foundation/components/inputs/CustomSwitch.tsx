import React from "react";

export interface CustomSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
  size: "sm" | "md" | "lg";
  variant: "default" | "success" | "danger" | "warning";
  disabled: boolean;
  icon: React.ReactNode;
  className: string;
}
// Custom Switch Component
const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked = false,
  onChange,
  label,
  description,
  size = "md",
  variant = "default",
  disabled = false,
  icon = null,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-4",
    md: "w-12 h-6",
    lg: "w-16 h-8",
  };

  const thumbSizes = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  const translateX = {
    sm: checked ? "translate-x-4" : "translate-x-0.5",
    md: checked ? "translate-x-6" : "translate-x-0.5",
    lg: checked ? "translate-x-8" : "translate-x-0.5",
  };

  const variantClasses = {
    default: checked
      ? "bg-blue-600 border-blue-600"
      : "bg-gray-200 border-gray-300",
    success: checked
      ? "bg-green-600 border-green-600"
      : "bg-gray-200 border-gray-300",
    danger: checked
      ? "bg-red-600 border-red-600"
      : "bg-gray-200 border-gray-300",
    warning: checked
      ? "bg-yellow-600 border-yellow-600"
      : "bg-gray-200 border-gray-300",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <button
          type="button"
          className={`
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            relative inline-flex items-center rounded-full border-2
            transition-colors duration-200 ease-in-out focus:outline-none
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          onClick={() => !disabled && onChange && onChange(!checked)}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
        >
          <span
            className={`
              ${thumbSizes[size]}
              ${translateX[size]}
              inline-block transform rounded-full bg-white shadow-lg ring-0
              transition-transform duration-200 ease-in-out
              flex items-center justify-center
            `}
          >
            {icon && <span className="text-gray-600 text-xs">{icon}</span>}
          </span>
        </button>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label className="text-sm font-medium text-gray-900 cursor-pointer">
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSwitch;

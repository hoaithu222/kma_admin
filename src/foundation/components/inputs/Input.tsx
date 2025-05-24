import React, { useState } from "react";
import { Eye, EyeOff, Check, X, AlertTriangle } from "lucide-react";

export type InputVariant = "default" | "outlined" | "filled" | "underlined";
export type InputSize = "small" | "medium" | "large";
export type InputStatus = "default" | "success" | "error" | "warning";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  status?: InputStatus;
  label?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "outlined",
      size = "medium",
      status = "default",
      label,
      helperText,
      iconLeft,
      iconRight,
      fullWidth = false,
      showPasswordToggle = false,
      className = "",
      type = "text",
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    const baseClasses = "transition-all duration-200 focus:outline-none";

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

    const sizeClasses = {
      small: "h-8 px-3 text-sm",
      medium: "h-10 px-4 text-base",
      large: "h-12 px-4 text-lg",
    };

    const statusClasses = {
      default: "",
      success: "border-green-500 focus:border-green-500 focus:ring-green-100",
      error: "border-red-500 focus:border-red-500 focus:ring-red-100",
      warning:
        "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-100",
    };

    // Get status icon
    const getStatusIcon = () => {
      switch (status) {
        case "success":
          return <Check className="w-4 h-4 text-green-500" />;
        case "error":
          return <X className="w-4 h-4 text-red-500" />;
        case "warning":
          return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
        default:
          return null;
      }
    };

    const statusIcon = getStatusIcon();

    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      status !== "default" ? statusClasses[status] : "",
      fullWidth ? "w-full" : "",
      disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "",
      iconLeft || iconRight || showPasswordToggle || statusIcon ? "pr-10" : "",
      iconLeft ? "pl-10" : "",
      isFocused ? "border-primary" : "",
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
          <input
            ref={ref}
            type={inputType}
            className={inputClasses}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          <div className="absolute flex items-center space-x-1 transform -translate-y-1/2 right-3 top-1/2">
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}
            {statusIcon}
            {iconRight && !statusIcon && (
              <div className="text-gray-400">{iconRight}</div>
            )}
          </div>
        </div>
        {helperText && (
          <p className={`mt-1 text-xs ${helperTextColor[status]} `}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

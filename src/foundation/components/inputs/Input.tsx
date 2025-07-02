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

    const baseClasses =
      "transition-all duration-200 focus:outline-none text-text-primary placeholder:text-text-muted";

    const variantClasses = {
      default:
        "border border-border-secondary bg-background-elevated rounded-lg focus:border-border-focus focus:ring-2 focus:ring-secondary/20",
      outlined:
        "border border-border-secondary bg-background-elevated rounded-lg focus:border-border-focus focus:ring-2 focus:ring-secondary/20",
      filled:
        "border-0 bg-background-muted rounded-lg focus:bg-background-elevated focus:ring-2 focus:ring-secondary/20",
      underlined:
        "border-0 border-b-2 border-border-secondary bg-transparent rounded-none focus:border-border-focus",
    };

    const sizeClasses = {
      small: "h-8 px-3 text-sm",
      medium: "h-10 px-4 text-base",
      large: "h-12 px-4 text-lg",
    };

    const statusClasses = {
      default: "",
      success: "border-success focus:border-success focus:ring-success/20",
      error: "border-error focus:border-error focus:ring-error/20",
      warning: "border-warning focus:border-warning focus:ring-warning/20",
    };

    // Get status icon
    const getStatusIcon = () => {
      switch (status) {
        case "success":
          return <Check className="w-4 h-4 text-success" />;
        case "error":
          return <X className="w-4 h-4 text-error" />;
        case "warning":
          return <AlertTriangle className="w-4 h-4 text-warning" />;
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
      disabled ? "opacity-50 cursor-not-allowed bg-background-muted" : "",
      iconLeft || iconRight || showPasswordToggle || statusIcon ? "pr-10" : "",
      iconLeft ? "pl-10" : "",
      isFocused
        ? "border-secondary focus:border-secondary focus:ring-secondary/20"
        : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const helperTextColor = {
      default: "text-text-muted",
      success: "text-success",
      error: "text-error",
      warning: "text-warning",
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block mb-1 text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted">
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
          <div className="flex absolute right-3 top-1/2 items-center space-x-1 transform -translate-y-1/2">
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-text-muted hover:text-text-secondary"
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
              <div className="text-text-muted">{iconRight}</div>
            )}
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

Input.displayName = "Input";
export default Input;

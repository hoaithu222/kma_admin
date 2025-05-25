import React, { useState } from "react";
import { Eye, EyeOff, Check, X, AlertTriangle } from "lucide-react";

export type FloatingInputVariant =
  | "default"
  | "outlined"
  | "filled"
  | "underlined";
export type FloatingInputSize = "small" | "medium" | "large";
export type FloatingInputStatus = "default" | "success" | "error" | "warning";

export interface FloatingInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: FloatingInputVariant;
  size?: FloatingInputSize;
  status?: FloatingInputStatus;
  label?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
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
      value,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    // Check if label should be floating (focused or has value)
    const isFloating =
      isFocused || hasValue || (value && value.toString().length > 0);

    const baseClasses = "transition-all duration-200 focus:outline-none";

    const variantClasses = {
      default:
        "border border-gray-300 bg-background-elevated rounded-lg focus:border-primary focus:ring-2 focus:ring-primary-light",
      outlined:
        "border border-gray-300 bg-background-elevated rounded-xl focus:border-secondary focus:ring-2 focus:ring-primary-light",
      filled:
        "border-0 bg-background-muted rounded-lg focus:bg-background-elevated focus:ring-2 focus:ring-primary-light",
      underlined:
        "border-0 border-b-2 border-gray-300 bg-transparent rounded-none focus:border-primary",
    };

    const sizeClasses = {
      small: "h-10 px-3 text-sm",
      medium: "h-12 px-4 text-base",
      large: "h-14 px-4 text-lg",
    };

    const statusClasses = {
      default: "border-secondary",
      success: "border-success focus:border-success focus:ring-success",
      error: "border-error focus:border-error focus:ring-error",
      warning: "border-warning focus:border-warning focus:ring-warning",
    };

    // Label positioning based on size and floating state
    const labelClasses = {
      small: {
        floating: "-top-3 text-xs",
        default: "top-3 text-sm",
      },
      medium: {
        floating: "-top-3.5 text-xs",
        default: "top-3.5 text-base",
      },
      large: {
        floating: "-top-4 text-xs",
        default: "top-4 text-lg",
      },
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
      disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "",
      iconLeft || iconRight || showPasswordToggle || statusIcon ? "pr-10" : "",
      iconLeft ? "pl-10" : "",
      // Override browser autofill styles
      "autofill:bg-transparent autofill:text-current",
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

    const labelColor = {
      default: isFocused ? "text-text-muted" : "text-text-secondary",
      success: "text-success",
      error: "text-error",
      warning: "text-warning",
    };

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        <div className="relative">
          {iconLeft && (
            <div className="absolute transform -translate-y-1/2 text-text-muted left-3 top-1/2">
              {iconLeft}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={inputClasses}
            disabled={disabled}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              if (props.onChange) {
                props.onChange(e);
              }
            }}
            onAnimationStart={(e) => {
              // Detect browser autofill
              if (e.animationName === "onAutoFillStart") {
                setHasValue(true);
              }
            }}
            style={{
              // Override browser autofill styles
              WebkitBoxShadow: "0 0 0 1000px transparent inset",
              WebkitTextFillColor: "inherit",
            }}
            {...props}
          />
          {label && (
            <label
              className={`
                absolute left-4 pointer-events-none transition-all duration-200

                ${iconLeft ? `left-12 ${iconLeft ? "ml-8" : "-ml-1"}` : "left-4"}
                ${
                  isFloating
                    ? labelClasses[size].floating
                    : labelClasses[size].default
                }
                ${status !== "default" ? labelColor[status] : labelColor.default}
                ${
                  isFloating && variant === "outlined"
                    ? `bg-transparent px-1 rounded-lg  -ml-1  ${iconLeft ? "-ml-2" : "-ml-1"}`
                    : isFloating && variant === "filled"
                      ? "bg-transparent px-1 -ml-1"
                      : ""
                }
              `}
            >
              {label}
            </label>
          )}
          <div className="absolute flex items-center space-x-1 transform -translate-y-1/2 right-3 top-1/2">
            {showPasswordToggle && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-text-muted hover:text-text-primary"
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
          <p className={`mt-1 text-xs ${helperTextColor[status]} `}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";
export default FloatingInput;

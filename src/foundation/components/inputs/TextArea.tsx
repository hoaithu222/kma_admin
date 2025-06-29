import React, { useState } from "react";

// ============= INPUT COMPONENT =============
export type InputVariant = "default" | "outlined" | "filled" | "underlined";
export type InputSize = "small" | "medium" | "large";
export type InputStatus = "default" | "success" | "error" | "warning";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  size?: InputSize;
  status?: InputStatus;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = "outlined",
      size = "medium",
      status = "default",
      label,
      helperText,
      fullWidth = false,
      resize = "vertical",
      className = "",
      disabled = false,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Base classes
    const baseClasses =
      "transition-all duration-200 focus:outline-none text-text-primary placeholder:text-text-muted";

    // Variant classes (same as Input)
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

    // Size classes
    const sizeClasses = {
      small: "p-2 text-sm",
      medium: "p-3 text-base",
      large: "p-4 text-lg",
    };

    // Status classes
    const statusClasses = {
      default: "",
      success: "border-success focus:border-success focus:ring-success/20",
      error: "border-error focus:border-error focus:ring-error/20",
      warning: "border-warning focus:border-warning focus:ring-warning/20",
    };

    // Resize classes
    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    const textareaClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      status !== "default" ? statusClasses[status] : "",
      resizeClasses[resize],
      fullWidth ? "w-full" : "",
      disabled ? "opacity-50 cursor-not-allowed bg-background-muted" : "",
      isFocused ? "border-primary" : "",
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
        <textarea
          ref={ref}
          className={textareaClasses}
          disabled={disabled}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {helperText && (
          <p className={`mt-1 text-xs ${helperTextColor[status]}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;

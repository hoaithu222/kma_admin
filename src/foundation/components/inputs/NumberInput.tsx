import React, { useState, useEffect } from "react";
import { Plus, Minus, Check, X, AlertTriangle } from "lucide-react";

export type NumberInputVariant =
  | "default"
  | "outlined"
  | "filled"
  | "underlined";
export type NumberInputSize = "small" | "medium" | "large";
export type NumberInputStatus = "default" | "success" | "error" | "warning";

export interface NumberInputProps {
  variant?: NumberInputVariant;
  size?: NumberInputSize;
  status?: NumberInputStatus;
  label?: string;
  helperText?: string;
  placeholder?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number; // Số chữ số thập phân
  fullWidth?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  showControls?: boolean; // Hiển thị nút +/-
  allowNegative?: boolean;
  thousandSeparator?: boolean; // Hiển thị dấu phẩy ngăn cách hàng nghìn
  prefix?: string; // VD: "$", "₫"
  suffix?: string; // VD: "%", "kg"
  className?: string;
  onChange?: (value: number | undefined) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  variant = "outlined",
  size = "medium",
  status = "default",
  label,
  helperText,
  placeholder,
  value,
  defaultValue,
  min,
  max,
  step = 1,
  precision = 0,
  fullWidth = false,
  disabled = false,
  readOnly = false,
  showControls = true,
  allowNegative = true,
  thousandSeparator = false,
  prefix = "",
  suffix = "",
  className = "",
  onChange,
  onBlur,
  onFocus,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [numericValue, setNumericValue] = useState<number | undefined>(
    value ?? defaultValue
  );

  // Format số với dấu phẩy ngăn cách
  const formatNumber = (num: number): string => {
    if (thousandSeparator) {
      return new Intl.NumberFormat("vi-VN").format(num);
    }
    return num.toString();
  };

  // Parse string thành number
  const parseNumber = (str: string): number | undefined => {
    if (!str.trim()) return undefined;

    // Loại bỏ dấu phẩy ngăn cách và ký tự không phải số
    const cleanStr = str.replace(/,/g, "").replace(/[^\d.-]/g, "");
    const parsed = parseFloat(cleanStr);

    if (isNaN(parsed)) return undefined;

    // Làm tròn theo precision
    return precision > 0
      ? Math.round(parsed * Math.pow(10, precision)) / Math.pow(10, precision)
      : Math.round(parsed);
  };

  // Validate giá trị
  const validateValue = (val: number | undefined): boolean => {
    if (val === undefined) return true;

    if (!allowNegative && val < 0) return false;
    if (min !== undefined && val < min) return false;
    if (max !== undefined && val > max) return false;

    return true;
  };

  // Cập nhật giá trị hiển thị
  const updateDisplayValue = (val: number | undefined) => {
    if (val === undefined) {
      setInputValue("");
      return;
    }

    const formatted = formatNumber(val);
    setInputValue(`${prefix}${formatted}${suffix}`);
  };

  // Effect để sync với prop value
  useEffect(() => {
    if (value !== undefined) {
      setNumericValue(value);
      if (!isFocused) {
        updateDisplayValue(value);
      }
    }
  }, [value, isFocused]);

  // Effect để cập nhật display value khi không focus
  useEffect(() => {
    if (!isFocused && numericValue !== undefined) {
      updateDisplayValue(numericValue);
    }
  }, [numericValue, isFocused, thousandSeparator, prefix, suffix]);

  // Xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    // Loại bỏ prefix và suffix để parse
    let cleanValue = rawValue;
    if (prefix) cleanValue = cleanValue.replace(prefix, "");
    if (suffix) cleanValue = cleanValue.replace(suffix, "");

    const parsed = parseNumber(cleanValue);

    if (validateValue(parsed)) {
      setNumericValue(parsed);
      onChange?.(parsed);
    }
  };

  // Xử lý focus
  const handleFocus = () => {
    setIsFocused(true);
    // Khi focus, hiển thị giá trị thô không format
    if (numericValue !== undefined) {
      setInputValue(numericValue.toString());
    }
    onFocus?.();
  };

  // Xử lý blur
  const handleBlur = () => {
    setIsFocused(false);
    // Khi blur, format lại giá trị
    updateDisplayValue(numericValue);
    onBlur?.();
  };

  // Tăng giá trị
  const increment = () => {
    if (disabled || readOnly) return;

    const current = numericValue ?? 0;
    const newValue = current + step;

    if (validateValue(newValue)) {
      setNumericValue(newValue);
      onChange?.(newValue);
    }
  };

  // Giảm giá trị
  const decrement = () => {
    if (disabled || readOnly) return;

    const current = numericValue ?? 0;
    const newValue = current - step;

    if (validateValue(newValue)) {
      setNumericValue(newValue);
      onChange?.(newValue);
    }
  };

  // Classes CSS
  const baseClasses =
    "transition-all duration-200 focus:outline-none text-text-primary placeholder:text-text-muted";

  const variantClasses = {
    default:
      "border border-border-primary bg-background-surface rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20",
    outlined:
      "border border-border-primary bg-background-surface rounded-lg focus:border-secondary focus:ring-2 focus:ring-secondary/20",
    filled:
      "border-0 bg-background-muted rounded-lg focus:bg-background-surface focus:ring-2 focus:ring-secondary/20",
    underlined:
      "border-0 border-b-2 border-border-primary bg-transparent rounded-none focus:border-secondary",
  };

  const sizeClasses = {
    small: "h-8 text-sm",
    medium: "h-10 text-base",
    large: "h-12 text-lg",
  };

  const statusClasses = {
    default: "",
    success: "border-success focus:border-success focus:ring-success/20",
    error: "border-error focus:border-error focus:ring-error/20",
    warning: "border-accent focus:border-accent focus:ring-accent/20",
  };

  // Get status icon
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <Check className="w-4 h-4 text-success" />;
      case "error":
        return <X className="w-4 h-4 text-error" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-accent" />;
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
    showControls ? "pr-16" : "pr-3",
    "pl-3",
    "text-right", // Căn phải cho số
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const helperTextColor = {
    default: "text-text-muted",
    success: "text-success",
    error: "text-error",
    warning: "text-accent",
  };

  const buttonSize =
    size === "small" ? "w-6 h-6" : size === "large" ? "w-8 h-8" : "w-7 h-7";
  const iconSize =
    size === "small" ? "w-3 h-3" : size === "large" ? "w-4 h-4" : "w-3.5 h-3.5";

  return (
    <div className={`${fullWidth ? "w-full" : ""}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Controls */}
        {showControls && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-0.5">
            <button
              type="button"
              onClick={increment}
              disabled={
                disabled ||
                readOnly ||
                (max !== undefined &&
                  numericValue !== undefined &&
                  numericValue >= max)
              }
              className={`flex justify-center items-center text-text-muted rounded transition-colors ${buttonSize} ${iconSize} hover:text-text-primary hover:bg-background-muted disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Plus className={iconSize} />
            </button>
            <button
              type="button"
              onClick={decrement}
              disabled={
                disabled ||
                readOnly ||
                (min !== undefined &&
                  numericValue !== undefined &&
                  numericValue <= min)
              }
              className={`flex justify-center items-center text-text-muted rounded transition-colors ${buttonSize} ${iconSize} hover:text-text-primary hover:bg-background-muted disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Minus className={iconSize} />
            </button>
          </div>
        )}

        {/* Status Icon */}
        {statusIcon && (
          <div
            className={`absolute ${showControls ? "right-12" : "right-3"} top-1/2 transform -translate-y-1/2`}
          >
            {statusIcon}
          </div>
        )}
      </div>

      {helperText && (
        <p className={`mt-1 text-xs ${helperTextColor[status]}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

// Demo Component
// const NumberInputDemo: React.FC = () => {
//   const [value1, setValue1] = useState<number | undefined>(100);
//   const [value2, setValue2] = useState<number | undefined>(25.5);
//   const [value3, setValue3] = useState<number | undefined>(1000000);

//   return (
//     <div className="p-6 mx-auto space-y-6 max-w-2xl">
//       <div className="mb-8 text-center">
//         <h1 className="mb-2 text-2xl font-bold text-gray-900">
//           NumberInput Component Demo
//         </h1>
//         <p className="text-gray-600">
//           Component nhập số với nhiều tính năng chuyên biệt
//         </p>
//       </div>

//       <div className="space-y-6">
//         {/* Basic Number Input */}
//         <div>
//           <h3 className="mb-3 text-lg font-semibold">Basic Number Input</h3>
//           <NumberInput
//             label="Số lượng"
//             value={value1}
//             onChange={setValue1}
//             min={0}
//             max={999}
//             helperText="Nhập số từ 0 đến 999"
//             fullWidth
//           />
//           <p className="mt-1 text-sm text-gray-500">Giá trị: {value1}</p>
//         </div>

//         {/* Price Input with formatting */}
//         <div>
//           <h3 className="mb-3 text-lg font-semibold">
//             Price Input (Formatted)
//           </h3>
//           <NumberInput
//             label="Giá tiền"
//             value={value3}
//             onChange={setValue3}
//             prefix="₫"
//             thousandSeparator
//             min={0}
//             helperText="Giá tiền với định dạng ngăn cách hàng nghìn"
//             fullWidth
//             size="large"
//           />
//           <p className="mt-1 text-sm text-gray-500">Giá trị: {value3}</p>
//         </div>

//         {/* Decimal Input */}
//         <div>
//           <h3 className="mb-3 text-lg font-semibold">Decimal Input</h3>
//           <NumberInput
//             label="Tỷ lệ phần trăm"
//             value={value2}
//             onChange={setValue2}
//             suffix="%"
//             precision={2}
//             step={0.1}
//             min={0}
//             max={100}
//             helperText="Nhập số thập phân với 2 chữ số sau dấu phẩy"
//             fullWidth
//           />
//           <p className="mt-1 text-sm text-gray-500">Giá trị: {value2}</p>
//         </div>

//         {/* Different Variants */}
//         <div>
//           <h3 className="mb-3 text-lg font-semibold">Different Variants</h3>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <NumberInput
//               label="Outlined (Default)"
//               variant="outlined"
//               defaultValue={10}
//               showControls={true}
//             />
//             <NumberInput
//               label="Filled"
//               variant="filled"
//               defaultValue={20}
//               showControls={true}
//             />
//             <NumberInput
//               label="Underlined"
//               variant="underlined"
//               defaultValue={30}
//               showControls={true}
//             />
//             <NumberInput
//               label="No Controls"
//               variant="outlined"
//               defaultValue={40}
//               showControls={false}
//             />
//           </div>
//         </div>

//         {/* Different Status */}
//         <div>
//           <h3 className="mb-3 text-lg font-semibold">Different Status</h3>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <NumberInput
//               label="Success"
//               status="success"
//               defaultValue={100}
//               helperText="Giá trị hợp lệ"
//             />
//             <NumberInput
//               label="Error"
//               status="error"
//               defaultValue={-5}
//               helperText="Giá trị không hợp lệ"
//             />
//             <NumberInput
//               label="Warning"
//               status="warning"
//               defaultValue={95}
//               helperText="Gần đạt giới hạn"
//             />
//           </div>
//         </div>

//         {/* Different Sizes */}
//         <div>
//           <h3 className="mb-3 text-lg font-semibold">Different Sizes</h3>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <NumberInput label="Small" size="small" defaultValue={10} />
//             <NumberInput label="Medium" size="medium" defaultValue={20} />
//             <NumberInput label="Large" size="large" defaultValue={30} />
//           </div>
//         </div>

//         {/* Disabled and ReadOnly */}
//         <div>
//           <h3 className="mb-3 text-lg font-semibold">Disabled & ReadOnly</h3>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <NumberInput
//               label="Disabled"
//               defaultValue={50}
//               disabled
//               helperText="Input bị vô hiệu hóa"
//             />
//             <NumberInput
//               label="ReadOnly"
//               defaultValue={75}
//               readOnly
//               helperText="Input chỉ đọc"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default NumberInput;

import React, { useState, useEffect, useMemo } from "react";
import { Check, X, AlertTriangle, ArrowUp, List } from "lucide-react";

export type OrderInputVariant =
  | "default"
  | "outlined"
  | "filled"
  | "underlined";
export type OrderInputSize = "small" | "medium" | "large";
export type OrderInputStatus = "default" | "success" | "error" | "warning";

export interface OrderItem {
  id: string | number;
  order: number;
  label?: string;
  [key: string]: any;
}

export interface OrderInputProps {
  variant?: OrderInputVariant;
  size?: OrderInputSize;
  status?: OrderInputStatus;
  label?: string;
  helperText?: string;
  placeholder?: string;
  value?: number;
  defaultValue?: number;
  existingOrders?: OrderItem[]; // Danh sách các item đã có thứ tự
  currentItemId?: string | number; // ID của item hiện tại (để loại trừ khi check trùng)
  min?: number;
  max?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoSuggest?: boolean; // Tự động gợi ý thứ tự tiếp theo
  showOrderList?: boolean; // Hiển thị danh sách thứ tự hiện có
  allowDuplicate?: boolean; // Cho phép trùng thứ tự
  className?: string;
  onChange?: (
    value: number | undefined,
    isValid: boolean,
    suggestion?: number
  ) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const OrderInput: React.FC<OrderInputProps> = ({
  variant = "outlined",
  size = "medium",
  status: propStatus = "default",
  label,
  helperText,
  placeholder,
  value,
  defaultValue,
  existingOrders = [],
  currentItemId,
  min = 1,
  max = 999,
  fullWidth = false,
  disabled = false,
  readOnly = false,
  autoSuggest = true,
  showOrderList = false,
  allowDuplicate = false,
  className = "",
  onChange,
  onBlur,
  onFocus,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [_isFocused, setIsFocused] = useState(false);
  const [numericValue, setNumericValue] = useState<number | undefined>(
    value ?? defaultValue
  );

  // Lọc bỏ item hiện tại khỏi danh sách existing orders
  const filteredExistingOrders = useMemo(() => {
    return existingOrders.filter((item) => item.id !== currentItemId);
  }, [existingOrders, currentItemId]);

  // Danh sách các thứ tự đã được sử dụng
  const usedOrders = useMemo(() => {
    return filteredExistingOrders.map((item) => item.order);
  }, [filteredExistingOrders]);

  // Gợi ý thứ tự tiếp theo
  const suggestedOrder = useMemo(() => {
    if (usedOrders.length === 0) return min;

    // Tìm số nhỏ nhất chưa được sử dụng
    for (let i = min; i <= max; i++) {
      if (!usedOrders.includes(i)) return i;
    }

    // Nếu tất cả đều được sử dụng, trả về max + 1
    return Math.max(...usedOrders) + 1;
  }, [usedOrders, min, max]);

  // Kiểm tra validation
  const validateOrder = (
    order: number | undefined
  ): { isValid: boolean; status: OrderInputStatus; message?: string } => {
    if (order === undefined) return { isValid: true, status: "default" };

    // Kiểm tra nằm trong khoảng min-max
    if (order < min || order > max) {
      return {
        isValid: false,
        status: "error",
        message: `Thứ tự phải từ ${min} đến ${max}`,
      };
    }

    // Kiểm tra trùng lặp
    if (!allowDuplicate && usedOrders.includes(order)) {
      const duplicateItem = filteredExistingOrders.find(
        (item) => item.order === order
      );
      return {
        isValid: false,
        status: "error",
        message: `Thứ tự ${order} đã được sử dụng${duplicateItem?.label ? ` bởi "${duplicateItem.label}"` : ""}`,
      };
    }

    return { isValid: true, status: "success" };
  };

  const validation = validateOrder(numericValue);
  const computedStatus =
    propStatus === "default" ? validation.status : propStatus;
  const computedHelperText = validation.message || helperText;

  // Parse input thành number
  const parseNumber = (str: string): number | undefined => {
    if (!str.trim()) return undefined;
    const parsed = parseInt(str.replace(/[^\d]/g, ""), 10);
    return isNaN(parsed) ? undefined : parsed;
  };

  // Effect để sync với prop value
  useEffect(() => {
    if (value !== undefined) {
      setNumericValue(value);
      setInputValue(value.toString());
    }
  }, [value]);

  // Xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);

    const parsed = parseNumber(rawValue);
    setNumericValue(parsed);

    const { isValid } = validateOrder(parsed);
    onChange?.(parsed, isValid, autoSuggest ? suggestedOrder : undefined);
  };

  // Xử lý focus
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  // Xử lý blur
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  // Áp dụng gợi ý
  const applySuggestion = () => {
    setNumericValue(suggestedOrder);
    setInputValue(suggestedOrder.toString());
    const { isValid } = validateOrder(suggestedOrder);
    onChange?.(suggestedOrder, isValid);
  };

  // Classes CSS
  const baseClasses = "transition-all duration-200 focus:outline-none";

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
    small: "h-8 px-3 text-sm",
    medium: "h-10 px-4 text-base",
    large: "h-12 px-4 text-lg",
  };

  const statusClasses = {
    default: "",
    success: "border-success focus:border-success focus:ring-success/20",
    error: "border-error focus:border-error focus:ring-error/20",
    warning: "border-accent focus:border-accent focus:ring-accent/20",
  };

  const getStatusIcon = () => {
    switch (computedStatus) {
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
    computedStatus !== "default" ? statusClasses[computedStatus] : "",
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed bg-background-elevated" : "",
    "pr-10",
    "text-center text-text-primary", // Căn giữa cho số thứ tự
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
          placeholder={placeholder || `Nhập thứ tự (${min}-${max})`}
          className={inputClasses}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {/* Status Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {statusIcon}
        </div>
      </div>

      {/* Suggestion */}
      {autoSuggest &&
        !disabled &&
        !readOnly &&
        numericValue !== suggestedOrder && (
          <div className="mt-2">
            <button
              type="button"
              onClick={applySuggestion}
              className="inline-flex items-center px-2 py-1 text-xs text-secondary bg-secondary/10 rounded transition-colors hover:bg-secondary/20"
            >
              <ArrowUp className="mr-1 w-3 h-3" />
              Gợi ý: {suggestedOrder}
            </button>
          </div>
        )}

      {/* Helper Text */}
      {computedHelperText && (
        <p className={`mt-1 text-xs ${helperTextColor[computedStatus]}`}>
          {computedHelperText}
        </p>
      )}

      {/* Order List */}
      {showOrderList && filteredExistingOrders.length > 0 && (
        <div className="p-3 mt-3 bg-background-muted rounded-lg">
          <div className="flex gap-1 items-center mb-2">
            <List className="w-4 h-4 text-text-muted" />
            <span className="text-sm font-medium text-text-primary">
              Thứ tự đã sử dụng:
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {filteredExistingOrders
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center px-2 py-1 text-xs bg-background-surface rounded border border-border-primary"
                  title={item.label || `ID: ${item.id}`}
                >
                  #{item.order}
                  {item.label && (
                    <span className="ml-1 text-text-muted">({item.label})</span>
                  )}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderInput;

// // Demo Component
// const _OrderInputDemo: React.FC = () => {
//   const [orders, setOrders] = useState<OrderItem[]>([
//     { id: 1, order: 1, label: "Header" },
//     { id: 2, order: 3, label: "Content" },
//     { id: 3, order: 5, label: "Footer" },
//     { id: 4, order: 2, label: "Navigation" },
//   ]);

//   const [newItemOrder, setNewItemOrder] = useState<number | undefined>();
//   const [editingItemId, setEditingItemId] = useState<number | null>(null);
//   const [editingOrder, setEditingOrder] = useState<number | undefined>();

//   const handleAddItem = () => {
//     if (newItemOrder !== undefined) {
//       const newItem: OrderItem = {
//         id: Date.now(),
//         order: newItemOrder,
//         label: `New Item ${newItemOrder}`,
//       };
//       setOrders([...orders, newItem]);
//       setNewItemOrder(undefined);
//     }
//   };

//   const handleEditOrder = (itemId: number, newOrder: number | undefined) => {
//     if (newOrder !== undefined) {
//       setOrders(
//         orders.map((item) =>
//           item.id === itemId ? { ...item, order: newOrder } : item
//         )
//       );
//       setEditingItemId(null);
//       setEditingOrder(undefined);
//     }
//   };

//   const handleDeleteItem = (itemId: number) => {
//     setOrders(orders.filter((item) => item.id !== itemId));
//   };

//   return (
//     <div className="p-6 mx-auto space-y-6 max-w-4xl">
//       <div className="mb-8 text-center">
//         <h1 className="mb-2 text-2xl font-bold text-gray-900">
//           OrderInput Component Demo
//         </h1>
//         <p className="text-gray-600">
//           Component nhập thứ tự với validation và kiểm tra trùng lặp
//         </p>
//       </div>

//       <div className="space-y-8">
//         {/* Add New Item */}
//         <div className="p-4 bg-white rounded-lg border">
//           <h3 className="mb-4 text-lg font-semibold">Thêm item mới</h3>
//           <div className="flex gap-4 items-end">
//             <div className="flex-1">
//               <OrderInput
//                 label="Thứ tự sắp xếp"
//                 value={newItemOrder}
//                 existingOrders={orders}
//                 onChange={(value, _isValid) => setNewItemOrder(value)}
//                 showOrderList={true}
//                 autoSuggest={true}
//                 fullWidth
//               />
//             </div>
//             <button
//               onClick={handleAddItem}
//               disabled={newItemOrder === undefined}
//               className="px-4 py-2 h-10 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Thêm
//             </button>
//           </div>
//         </div>

//         {/* Current Items List */}
//         <div className="p-4 bg-white rounded-lg border">
//           <h3 className="mb-4 text-lg font-semibold">Danh sách hiện tại</h3>
//           <div className="space-y-3">
//             {orders
//               .sort((a, b) => a.order - b.order)
//               .map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex gap-4 items-center p-3 bg-gray-50 rounded-lg border"
//                 >
//                   <div className="flex gap-2 items-center">
//                     <span className="text-sm font-medium text-gray-500">
//                       #{item.order}
//                     </span>
//                     <ArrowDown className="w-4 h-4 text-gray-400" />
//                   </div>

//                   <div className="flex-1">
//                     <span className="font-medium">{item.label}</span>
//                   </div>

//                   <div className="flex gap-2 items-center">
//                     {editingItemId === item.id ? (
//                       <>
//                         <OrderInput
//                           value={editingOrder}
//                           existingOrders={orders}
//                           currentItemId={item.id}
//                           onChange={(value) => setEditingOrder(value)}
//                           size="small"
//                           className="w-20"
//                         />
//                         <button
//                           onClick={() =>
//                             handleEditOrder(item.id as number, editingOrder)
//                           }
//                           className="px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
//                         >
//                           Lưu
//                         </button>
//                         <button
//                           onClick={() => {
//                             setEditingItemId(null);
//                             setEditingOrder(undefined);
//                           }}
//                           className="px-2 py-1 text-xs text-white bg-gray-500 rounded hover:bg-gray-600"
//                         >
//                           Hủy
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => {
//                             setEditingItemId(item.id as number);
//                             setEditingOrder(item.order);
//                           }}
//                           className="px-2 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
//                         >
//                           Sửa
//                         </button>
//                         <button
//                           onClick={() => handleDeleteItem(item.id as number)}
//                           className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
//                         >
//                           Xóa
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//         {/* Different Examples */}
//         <div className="space-y-6">
//           <h3 className="text-lg font-semibold">Các ví dụ khác</h3>

//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//             {/* Allow Duplicate */}
//             <div className="p-4 rounded-lg border">
//               <h4 className="mb-3 font-medium">Cho phép trùng lặp</h4>
//               <OrderInput
//                 label="Thứ tự"
//                 existingOrders={orders}
//                 allowDuplicate={true}
//                 helperText="Cho phép nhập thứ tự đã tồn tại"
//                 fullWidth
//               />
//             </div>

//             {/* No Auto Suggest */}
//             <div className="p-4 rounded-lg border">
//               <h4 className="mb-3 font-medium">Không gợi ý tự động</h4>
//               <OrderInput
//                 label="Thứ tự"
//                 existingOrders={orders}
//                 autoSuggest={false}
//                 helperText="Không hiển thị gợi ý thứ tự"
//                 fullWidth
//               />
//             </div>

//             {/* Custom Range */}
//             <div className="p-4 rounded-lg border">
//               <h4 className="mb-3 font-medium">Phạm vi tùy chỉnh</h4>
//               <OrderInput
//                 label="Thứ tự (10-50)"
//                 min={10}
//                 max={50}
//                 existingOrders={[]}
//                 helperText="Chỉ cho phép từ 10 đến 50"
//                 fullWidth
//               />
//             </div>

//             {/* Different Variants */}
//             <div className="p-4 rounded-lg border">
//               <h4 className="mb-3 font-medium">Variant khác</h4>
//               <div className="space-y-3">
//                 <OrderInput
//                   variant="filled"
//                   placeholder="Filled variant"
//                   size="small"
//                 />
//                 <OrderInput
//                   variant="underlined"
//                   placeholder="Underlined variant"
//                   size="large"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

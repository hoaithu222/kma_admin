import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
// import {
//   User,
//   Book,
//   Award,
//   Settings,
//   BarChart3,
//   Calendar,
//   Shield,
//   Code2,
//   Database,
//   FileText,
//   Users,
//   Clock,
//   Star,
//   TrendingUp,
//   Activity,
//   Bell,
//   Lock,
//   Zap,
// } from "lucide-react";

export type TabsVariant =
  | "default"
  | "pills"
  | "underline"
  | "cards"
  | "vertical"
  | "minimal";
export type TabsSize = "sm" | "md" | "lg";

interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  content: React.ReactNode;
}

interface CustomTabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  animated?: boolean;
  className?: string;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  items,
  defaultValue,
  value,
  onValueChange,
  variant = "default",
  size = "md",
  fullWidth = false,
  animated = true,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || items[0]?.value);

  const handleValueChange = (newValue: string) => {
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "pills":
        return {
          list: "flex space-x-1 bg-gray-100 p-1 rounded-lg",
          trigger: `
            ${sizeClasses[size]} rounded-md font-medium transition-all duration-200
            data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm
            data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900
            disabled:opacity-50 disabled:cursor-not-allowed
          `,
        };

      case "underline":
        return {
          list: "flex border-b border-gray-200",
          trigger: `
            ${sizeClasses[size]} font-medium transition-all duration-200 border-b-2 border-transparent
            data-[state=active]:border-blue-500 data-[state=active]:text-blue-600
            data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 data-[state=inactive]:hover:border-gray-300
            disabled:opacity-50 disabled:cursor-not-allowed
          `,
        };

      case "cards":
        return {
          list: "flex space-x-2",
          trigger: `
            ${sizeClasses[size]} rounded-lg border font-medium transition-all duration-200
            data-[state=active]:bg-blue-50 data-[state=active]:border-blue-200 data-[state=active]:text-blue-700
            data-[state=inactive]:bg-white data-[state=inactive]:border-gray-200 data-[state=inactive]:text-gray-600
            data-[state=inactive]:hover:bg-gray-50 data-[state=inactive]:hover:text-gray-900
            disabled:opacity-50 disabled:cursor-not-allowed
          `,
        };

      case "vertical":
        return {
          list: "flex flex-col space-y-1 w-48",
          trigger: `
            ${sizeClasses[size]} text-left rounded-lg font-medium transition-all duration-200
            data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-l-4 data-[state=active]:border-blue-500
            data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50 data-[state=inactive]:hover:text-gray-900
            disabled:opacity-50 disabled:cursor-not-allowed
          `,
        };

      case "minimal":
        return {
          list: "flex space-x-8",
          trigger: `
            ${sizeClasses[size]} font-medium transition-all duration-200
            data-[state=active]:text-blue-600
            data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900
            disabled:opacity-50 disabled:cursor-not-allowed
          `,
        };

      default:
        return {
          list: "flex space-x-1 bg-gray-50 p-1 rounded-lg",
          trigger: `
            ${sizeClasses[size]} rounded-md font-medium transition-all duration-200
            data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm
            data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900
            disabled:opacity-50 disabled:cursor-not-allowed
          `,
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <Tabs.Root
      value={value || activeTab}
      onValueChange={handleValueChange}
      className={className}
    >
      <Tabs.List
        className={`
          ${variantClasses.list}
          ${fullWidth ? "w-full" : ""}
          ${variant === "vertical" ? "flex-col" : ""}
        `}
      >
        {items.map((item) => (
          <Tabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={`
              ${variantClasses.trigger}
              ${fullWidth && variant !== "vertical" ? "flex-1" : ""}
              ${animated ? "transform hover:scale-105" : ""}
              flex items-center justify-center space-x-2 relative
            `}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                {item.badge}
              </span>
            )}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <div className={variant === "vertical" ? "flex" : ""}>
        {variant === "vertical" && <div className="flex-shrink-0 w-48" />}
        <div className={`${variant === "vertical" ? "flex-1 ml-6" : "mt-4"}`}>
          {items.map((item) => (
            <Tabs.Content
              key={item.value}
              value={item.value}
              className={`
                focus:outline-none
                ${animated ? "data-[state=active]:animate-fadeIn" : ""}
              `}
            >
              {item.content}
            </Tabs.Content>
          ))}
        </div>
      </div>
    </Tabs.Root>
  );
};

export default CustomTabs;

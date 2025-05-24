import React, { useState } from "react";
// import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Popover from "@radix-ui/react-popover";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

interface SelectManyProps {
  options: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  description?: string;
  required?: boolean;
  maxSelections?: number;
  searchable?: boolean;
  clearable?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "default" | "outlined" | "filled";
  position?: "bottom" | "top" | "auto";
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  optionClassName?: string;
  emptyText?: string;
  showSelectAll?: boolean;
  groupBy?: (option: Option) => string;
  renderOption?: (option: Option, selected: boolean) => React.ReactNode;
  renderSelected?: (options: Option[]) => React.ReactNode;
  onSearch?: (query: string) => void;
  loading?: boolean;
}

const SelectMany = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Chọn các tùy chọn...",
  disabled = false,
  error,
  label,
  description,
  required = false,
  maxSelections,
  searchable = false,
  clearable = true,
  size = "medium",
  variant = "default",
  position = "bottom",
  className = "",
  triggerClassName = "",
  contentClassName = "",
  optionClassName = "",
  emptyText = "Không có tùy chọn nào",
  showSelectAll = false,
  groupBy,
  renderOption,
  renderSelected,
  onSearch,
  loading = false,
}: SelectManyProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter options based on search
  const filteredOptions =
    searchable && searchQuery
      ? options.filter(
          (option) =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            option.value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

  // Group options if groupBy is provided
  const groupedOptions = groupBy
    ? filteredOptions.reduce(
        (groups, option) => {
          const group = groupBy(option);
          if (!groups[group]) groups[group] = [];
          groups[group].push(option);
          return groups;
        },
        {} as Record<string, Option[]>
      )
    : null;

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  const handleToggle = (optionValue: string) => {
    if (disabled) return;

    let newValue: string[];

    if (value.includes(optionValue)) {
      newValue = value.filter((v) => v !== optionValue);
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return; // Don't add if max selections reached
      }
      newValue = [...value, optionValue];
    }

    onChange?.(newValue);
  };

  const handleSelectAll = () => {
    if (value.length === filteredOptions.length) {
      onChange?.([]);
    } else {
      const allValues = filteredOptions
        .filter((opt) => !opt.disabled)
        .map((opt) => opt.value);
      onChange?.(maxSelections ? allValues.slice(0, maxSelections) : allValues);
    }
  };

  const handleClear = () => {
    onChange?.([]);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return {
          trigger: "h-8 px-3 text-sm",
          content: "text-sm",
          option: "px-3 py-1.5 text-sm",
        };
      case "large":
        return {
          trigger: "h-12 px-4 text-base",
          content: "text-base",
          option: "px-4 py-3 text-base",
        };
      default:
        return {
          trigger: "h-10 px-3 text-sm",
          content: "text-sm",
          option: "px-3 py-2 text-sm",
        };
    }
  };

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "outlined":
        return "border-2 border-gray-300 bg-background-elevated focus:border-blue-500";
      case "filled":
        return "border border-gray-300 bg-background-muted focus:bg-background-elevated focus:border-blue-500";
      default:
        return "border border-gray-300 bg-background-elevated focus:border-blue-500";
    }
  };

  const sizeClasses = getSizeClasses();

  const renderOptionContent = (option: Option, isSelected: boolean) => {
    if (renderOption) {
      return renderOption(option, isSelected);
    }

    return (
      <div className="flex items-center flex-1 space-x-2">
        {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{option.label}</div>
          {option.description && (
            <div className="text-xs text-gray-500 truncate">
              {option.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSelectedDisplay = () => {
    if (renderSelected) {
      return renderSelected(selectedOptions);
    }

    if (selectedOptions.length === 0) {
      return <span className="text-gray-500">{placeholder}</span>;
    }

    if (selectedOptions.length === 1) {
      return <span>{selectedOptions[0].label}</span>;
    }

    return <span>{selectedOptions.length} mục đã chọn</span>;
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-primary">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {description && (
        <p className="mb-2 text-sm text-secondary">{description}</p>
      )}

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            className={`
              w-full flex items-center justify-between rounded-md transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${sizeClasses.trigger}
              ${getVariantClasses()}
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
              ${triggerClassName}
            `}
            disabled={disabled}
          >
            <div className="flex-1 text-left truncate">
              {renderSelectedDisplay()}
            </div>

            <div className="flex items-center ml-2 space-x-1">
              {clearable && selectedOptions.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="p-0.5 hover:bg-background-muted rounded text-muted hover:text-secondary"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              <svg
                className={`w-4 h-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
        </Popover.Trigger>

        <Popover.Content
          className={`
            z-50 w-[var(--radix-popover-trigger-width)] max-h-60 overflow-hidden rounded-md border border-gray-200 bg-background-elevated shadow-lg
            data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            ${sizeClasses.content}
            ${contentClassName}
          `}
          side={position === "auto" ? undefined : position}
          sideOffset={4}
        >
          {/* Search */}
          {searchable && (
            <div className="p-2 border-b border-gray-200 bg-background-muted">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-background-elevated"
              />
            </div>
          )}

          {/* Select All */}
          {showSelectAll && filteredOptions.length > 0 && (
            <div className="p-2 border-b border-gray-200 bg-background-muted">
              <button
                onClick={handleSelectAll}
                className="w-full px-2 py-1 text-sm text-left rounded text-link hover:bg-background-subtle"
              >
                {value.length === filteredOptions.length
                  ? "Bỏ chọn tất cả"
                  : "Chọn tất cả"}
              </button>
            </div>
          )}

          {/* Options */}
          <div className="overflow-y-auto max-h-48">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="w-4 h-4 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                <span className="ml-2 text-sm text-muted">Đang tải...</span>
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="py-4 text-sm text-center text-muted">
                {emptyText}
              </div>
            ) : groupedOptions ? (
              Object.entries(groupedOptions).map(([group, groupOptions]) => (
                <div key={group}>
                  <div className="sticky top-0 px-3 py-2 text-xs font-semibold text-muted bg-background-muted">
                    {group}
                  </div>
                  {groupOptions.map((option) => {
                    const isSelected = value.includes(option.value);
                    const isDisabled =
                      option.disabled ||
                      (maxSelections &&
                        !isSelected &&
                        value.length >= maxSelections);

                    return (
                      <button
                        key={option.value}
                        onClick={() => handleToggle(option.value)}
                        disabled={isDisabled as boolean}
                        className={`
                          w-full flex items-center space-x-2 transition-colors text-left
                          hover:bg-background-muted focus:bg-background-muted focus:outline-none
                          disabled:opacity-50 disabled:cursor-not-allowed
                          ${sizeClasses.option}
                          ${isSelected ? "bg-background-subtle text-link" : ""}
                          ${optionClassName}
                        `}
                      >
                        <Checkbox.Root
                          checked={isSelected}
                          className="w-4 h-4 border border-gray-300 rounded data-[state=checked]:bg-button-primary-bg data-[state=checked]:border-button-primary-bg"
                        >
                          <Checkbox.Indicator>
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        {renderOptionContent(option, isSelected)}
                      </button>
                    );
                  })}
                </div>
              ))
            ) : (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                const isDisabled =
                  option.disabled ||
                  (maxSelections &&
                    !isSelected &&
                    value.length >= maxSelections);

                return (
                  <button
                    key={option.value}
                    onClick={() => handleToggle(option.value)}
                    disabled={isDisabled as boolean}
                    className={`
                      w-full flex items-center space-x-2 transition-colors text-left
                      hover:bg-background-muted focus:bg-background-muted focus:outline-none
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${sizeClasses.option}
                      ${isSelected ? "bg-background-subtle text-link" : ""}
                      ${optionClassName}
                    `}
                  >
                    <Checkbox.Root
                      checked={isSelected}
                      className="w-4 h-4 border border-gray-300 rounded data-[state=checked]:bg-button-primary-bg data-[state=checked]:border-button-primary-bg"
                    >
                      <Checkbox.Indicator>
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    {renderOptionContent(option, isSelected)}
                  </button>
                );
              })
            )}
          </div>
        </Popover.Content>
      </Popover.Root>

      {error && <p className="mt-1 text-sm text-error">{error}</p>}

      {maxSelections && (
        <p className="mt-1 text-xs text-muted">
          {value.length}/{maxSelections} mục đã chọn
        </p>
      )}
    </div>
  );
};

export default SelectMany;

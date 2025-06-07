import React, { useState, useMemo, useCallback, useEffect } from "react";

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
  className?: string;
  emptyText?: string;
  showSelectAll?: boolean;
  renderOption?: (option: Option, selected: boolean) => React.ReactNode;
  renderSelected?: (options: Option[]) => React.ReactNode;
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
  className = "",
  emptyText = "Không có tùy chọn nào",
  showSelectAll = false,
  renderOption,
  renderSelected,
}: SelectManyProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [internalValue, setInternalValue] = useState<string[]>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return options;
    }
    const query = searchQuery.toLowerCase().trim();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query) ||
        (option.description && option.description.toLowerCase().includes(query))
    );
  }, [options, searchable, searchQuery]);

  const selectedOptions = useMemo(() => {
    return options.filter((option) => internalValue.includes(option.value));
  }, [options, internalValue]);

  const handleToggle = useCallback(
    (optionValue: string) => {
      if (disabled || !onChange) return;

      const newValue = internalValue.includes(optionValue)
        ? internalValue.filter((v) => v !== optionValue)
        : maxSelections && internalValue.length >= maxSelections
          ? internalValue
          : [...internalValue, optionValue];

      setInternalValue(newValue);
      onChange(newValue);
    },
    [disabled, onChange, maxSelections, internalValue]
  );

  const handleSelectAll = useCallback(() => {
    if (!onChange) return;
    const allValues = filteredOptions
      .filter((opt) => !opt.disabled)
      .map((opt) => opt.value);
    const newValue = internalValue.length === allValues.length ? [] : allValues;
    setInternalValue(newValue);
    onChange(newValue);
  }, [onChange, filteredOptions, internalValue]);

  const handleClear = useCallback(() => {
    if (!onChange) return;
    const newValue: string[] = [];
    setInternalValue(newValue);
    onChange(newValue);
  }, [onChange]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const sizeClasses = useMemo(() => {
    switch (size) {
      case "small":
        return {
          trigger: "h-9 px-3 text-sm",
          content: "text-sm",
          option: "px-3 py-2.5 text-sm",
          checkbox: "w-4 h-4",
        };
      case "large":
        return {
          trigger: "h-12 px-4 text-base",
          content: "text-base",
          option: "px-4 py-3.5 text-base",
          checkbox: "w-5 h-5",
        };
      default:
        return {
          trigger: "h-10 px-3 text-sm",
          content: "text-sm",
          option: "px-3 py-3 text-sm",
          checkbox: "w-4 h-4",
        };
    }
  }, [size]);

  const variantClasses = useMemo(() => {
    const baseClasses =
      "border transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1";
    switch (variant) {
      case "outlined":
        return `${baseClasses} border-2 border-border-primary bg-background-surface hover:border-border-secondary focus:border-secondary focus:ring-secondary/20`;
      case "filled":
        return `${baseClasses} border-border-primary bg-background-muted hover:bg-background-subtle focus:bg-background-surface focus:border-secondary focus:ring-secondary/20`;
      default:
        return `${baseClasses} border-border-primary bg-background-surface hover:border-border-secondary focus:border-secondary focus:ring-secondary/20`;
    }
  }, [variant]);

  const renderOptionContent = useCallback(
    (option: Option, isSelected: boolean) => {
      if (renderOption) {
        return renderOption(option, isSelected);
      }
      return (
        <div className="flex items-center flex-1 space-x-3">
          <div className="flex-1 min-w-0">
            <div
              className={`font-medium truncate ${isSelected ? "text-blue-700" : "text-gray-900"}`}
            >
              {option.label}
            </div>
            {option.description && (
              <div className="text-xs text-gray-500 truncate mt-0.5">
                {option.description}
              </div>
            )}
          </div>
          {option.icon && (
            <span className="flex-shrink-0 text-gray-500">{option.icon}</span>
          )}
        </div>
      );
    },
    [renderOption]
  );

  const renderSelectedDisplay = useCallback(() => {
    if (renderSelected) {
      return renderSelected(selectedOptions);
    }
    if (selectedOptions.length === 0) {
      return <span className="text-gray-500">{placeholder}</span>;
    }
    if (selectedOptions.length === 1) {
      return <span className="text-gray-900">{selectedOptions[0].label}</span>;
    }
    return (
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
          {selectedOptions.length}
        </span>
        <span className="text-gray-900">mục đã chọn</span>
      </div>
    );
  }, [renderSelected, selectedOptions, placeholder]);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-text-primary">
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}

      {description && (
        <p className="mb-3 text-sm text-text-secondary">{description}</p>
      )}

      <div className="relative">
        <button
          type="button"
          className={`
            w-full flex items-center justify-between rounded-lg shadow-sm
            disabled:opacity-50 disabled:cursor-not-allowed
            ${sizeClasses.trigger}
            ${variantClasses}
            ${error ? "border-error focus:border-error focus:ring-error/20" : ""}
          `}
          disabled={disabled}
          onClick={() => setOpen(!open)}
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
                className="p-1 transition-colors rounded-md text-text-muted hover:bg-background-muted hover:text-text-primary"
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
              className={`w-5 h-5 text-text-muted transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
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

        {open && (
          <div className="absolute z-50 w-full mt-2 overflow-hidden border shadow-lg bg-background-surface border-border-primary rounded-xl max-h-64">
            {searchable && (
              <div className="p-3 border-b border-border-primary bg-background-muted">
                <div className="relative">
                  <svg
                    className="absolute w-4 h-4 transform -translate-y-1/2 text-text-muted left-3 top-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full py-2 pl-10 pr-3 text-sm border rounded-lg bg-background-surface border-border-primary focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
                  />
                </div>
              </div>
            )}

            {showSelectAll && filteredOptions.length > 0 && (
              <div className="p-2 border-b border-border-primary bg-background-muted">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="w-full px-3 py-2 text-sm font-medium text-left transition-colors rounded-lg text-secondary hover:bg-secondary-light"
                >
                  {internalValue.length ===
                  filteredOptions.filter((opt) => !opt.disabled).length
                    ? "Bỏ chọn tất cả"
                    : "Chọn tất cả"}
                </button>
              </div>
            )}

            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-sm text-center text-text-muted">
                  <svg
                    className="w-8 h-8 mx-auto mb-2 text-text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.266-5.366-3.146m0 .362A3.992 3.992 0 018 14m8-2a3.992 3.992 0 01-2.366 3.146"
                    />
                  </svg>
                  {emptyText}
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = internalValue.includes(option.value);
                  const isDisabled =
                    option.disabled ||
                    (maxSelections &&
                      !isSelected &&
                      internalValue.length >= maxSelections);

                  return (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => handleToggle(option.value)}
                      disabled={isDisabled || false}
                      className={`
                        w-full flex items-center space-x-3 transition-all duration-150 text-left
                        hover:bg-secondary-light focus:bg-secondary-light focus:outline-none
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${sizeClasses.option}
                        ${isSelected ? "bg-secondary-light border-r-2 border-secondary" : "hover:bg-background-muted"}
                      `}
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className={`
                            ${sizeClasses.checkbox} rounded border-2 border-border-primary text-secondary
                            focus:ring-secondary focus:ring-offset-0 transition-colors
                            ${isSelected ? "bg-secondary border-secondary" : "bg-background-surface"}
                          `}
                        />
                        {isSelected && (
                          <svg
                            className="absolute top-0.5 left-0.5 w-3 h-3 text-text-on-primary pointer-events-none"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      {renderOptionContent(option, isSelected)}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="flex items-center mt-2 text-sm text-error">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}

      {maxSelections && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-text-secondary">
            {internalValue.length}/{maxSelections} mục đã chọn
          </p>
          <div className="w-full max-w-32 bg-background-muted rounded-full h-1.5 ml-3">
            <div
              className="bg-secondary h-1.5 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min((internalValue.length / maxSelections) * 100, 100)}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectMany;

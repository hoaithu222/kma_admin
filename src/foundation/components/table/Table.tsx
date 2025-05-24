import clsx from "clsx";
import React, { useState } from "react";

interface Column {
  key: string;
  title: string;
  width?: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}

interface TableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  pagination?: boolean;
  pageSize?: number;
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  size?: "small" | "medium" | "large";
  onRowClick?: (record: any, index: number) => void;
  emptyText?: string | React.ReactNode;
  className?: string;
  hoverColor?: "primary" | "secondary" | "accent" | "muted" | "subtle";
  hoverEffect?: "background" | "border" | "both";
  hoverIntensity?: "light" | "medium" | "strong";
}

const Table = ({
  columns,
  data,
  loading = false,
  pagination = false,
  pageSize = 10,
  striped = false,
  bordered = true,
  hover = false,
  size = "medium",
  onRowClick,
  emptyText = "Không có dữ liệu",
  className = "",
  hoverColor = "subtle",
  hoverEffect = "background",
  hoverIntensity = "medium",
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination logic
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(data.length / pageSize);

  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;

    setSortConfig((current) => {
      if (current?.key === columnKey) {
        return current.direction === "asc"
          ? { key: columnKey, direction: "desc" }
          : null;
      }
      return { key: columnKey, direction: "asc" };
    });
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  const getCellPadding = () => {
    switch (size) {
      case "small":
        return "px-3 py-2";
      case "large":
        return "px-6 py-4";
      default:
        return "px-4 py-3";
    }
  };

  const getHoverClasses = () => {
    if (!hover) return "";

    const hoverColorMap = {
      primary: "hover:bg-primary/10 hover:border-primary/20",
      secondary: "hover:bg-secondary/10 hover:border-secondary/20",
      accent: "hover:bg-accent/10 hover:border-accent/20",
      muted: "hover:bg-background-muted",
      subtle: "hover:bg-background-subtle",
    };

    const hoverIntensityMap = {
      light: "hover:opacity-70",
      medium: "hover:opacity-85",
      strong: "hover:opacity-100",
    };

    const effectClasses = {
      background: hoverColorMap[hoverColor].split(" ")[0],
      border: hoverColorMap[hoverColor].split(" ")[1],
      both: hoverColorMap[hoverColor],
    };

    return `${effectClasses[hoverEffect]} ${hoverIntensityMap[hoverIntensity]} transition-all duration-200`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  // Hiển thị empty state bên ngoài table
  if (data.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div
          className={clsx(
            "flex items-center justify-center p-8 text-center ",
            "border rounded-lg shadow-lg shadow-navbar-active-bg text-text-muted bg-background-elevated border-border-primary"
          )}
        >
          {emptyText}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="overflow-x-auto">
        <table
          className={`w-full ${getSizeClasses()} ${bordered ? "border border-border-primary" : ""}`}
        >
          <thead className="bg-background-muted">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    ${getCellPadding()}
                    text-left font-semibold text-text-primary
                    ${bordered ? "border-b border-border-primary" : ""}
                    ${column.sortable ? "cursor-pointer hover:bg-background-subtle" : ""}
                    ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"}
                  `}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.title}
                    {column.sortable && (
                      <span className="ml-2">
                        {sortConfig?.key === column.key
                          ? sortConfig.direction === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((record, index) => (
              <tr
                key={index}
                className={`
                  ${striped && index % 2 === 1 ? "bg-background-muted" : "bg-background-elevated"}
                  ${onRowClick ? "cursor-pointer" : ""}
                  ${getHoverClasses()}
                `}
                onClick={() => onRowClick?.(record, index)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`
                      ${getCellPadding()}
                      ${bordered ? "border-b border-border-primary" : ""}
                      ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"}
                    `}
                  >
                    {column.render
                      ? column.render(record[column.key], record, index)
                      : record[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-text-secondary">
            Hiển thị {(currentPage - 1) * pageSize + 1} đến{" "}
            {Math.min(currentPage * pageSize, data.length)} của {data.length}{" "}
            kết quả
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded border-border-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-subtle"
            >
              Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 2
                );
              })
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 py-1 text-text-muted">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`
                      px-3 py-1 rounded border text-sm
                      ${
                        currentPage === page
                          ? "bg-primary text-text-on-primary border-primary"
                          : "border-border-primary hover:bg-background-subtle"
                      }
                    `}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded border-border-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-subtle"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;

import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  FileText,
  Users,
  Calendar,
  BookOpen,
  GraduationCap,
  Newspaper,
} from "lucide-react";

import { useMenu } from "../hooks/useMenu";
import { dataMenu } from "../slice/menu.types";
import AddMenu from "./AddMenu";
import EditMenu from "./EditMenu";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";

const getIcon = (name: string) => {
  const iconName = name.toLowerCase();
  if (iconName.includes("tin tức") || iconName.includes("thông báo"))
    return Newspaper;
  if (iconName.includes("sinh viên") || iconName.includes("học tập"))
    return Users;
  if (iconName.includes("sự kiện")) return Calendar;
  if (iconName.includes("nghiên cứu")) return BookOpen;
  if (iconName.includes("tuyển sinh")) return GraduationCap;
  return FileText;
};

interface CategoryWithMeta {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
  displayOrder: number;
  level: number;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
  children: dataMenu[];
  // Additional metadata for display
  metaLevel: number;
  metaParentId: number | null;
  metaParentName: string;
  hasChildren: boolean;
  childrenCount: number;
}

const CategoriesTable = () => {
  const {
    menu,
    handleAddMenu,
    handleEditMenu,
    handleSetIdMenuEdit,
    handleDeleteMenu,
    handleSetIdMenuDelete,
    handleCloseModalDeleteMenu,
    handleDeleteMenuAction,
    isDeleteMenu,
    statusDeleteMenu,
  } = useMenu();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterVisible, setFilterVisible] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "displayOrder",
    direction: "asc" as "asc" | "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCategories, setExpandedCategories] = useState(
    new Set<number>()
  );
  const itemsPerPage = 20;

  // Auto close delete modal after successful delete
  useEffect(() => {
    if (statusDeleteMenu === "success") {
      handleCloseModalDeleteMenu();
    }
  }, [statusDeleteMenu]);

  // Hàm tạo danh sách phẳng với logic expand/collapse cải tiến
  const getFlattenedCategories = (): CategoryWithMeta[] => {
    let result: CategoryWithMeta[] = [];

    const processCategory = (
      category: dataMenu,
      level = 0,
      parentId: number | null = null,
      parentName = ""
    ) => {
      const categoryWithMeta: CategoryWithMeta = {
        ...category,
        metaLevel: level,
        metaParentId: parentId,
        metaParentName: parentName,
        hasChildren: category.children && category.children.length > 0,
        childrenCount: category.children?.length || 0,
      };

      result.push(categoryWithMeta);

      // Nếu danh mục được expand, thêm children ngay sau cha
      if (
        expandedCategories.has(category.id) &&
        category.children &&
        category.children.length > 0
      ) {
        category.children.forEach((child) => {
          processCategory(child, level + 1, category.id, category.name);
        });
      }
    };

    menu.forEach((category) => processCategory(category));
    return result;
  };

  const flattenedCategories = getFlattenedCategories();

  // Filter categories
  const filteredCategories = flattenedCategories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVisibility =
      filterVisible === "all" ||
      (filterVisible === "visible" && category.isVisible) ||
      (filterVisible === "hidden" && !category.isVisible);

    return matchesSearch && matchesVisibility;
  });

  // Sort categories -
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    // Nếu a là con của b, a phải đứng sau b
    if (a.metaParentId === b.id) {
      return 1;
    }
    // Nếu b là con của a, b phải đứng sau a
    if (b.metaParentId === a.id) {
      return -1;
    }

    // Nếu cùng cấp độ và cùng parent, sắp xếp theo displayOrder
    if (a.metaLevel === b.metaLevel && a.metaParentId === b.metaParentId) {
      const aValue = a[sortConfig.key as keyof CategoryWithMeta];
      const bValue = b[sortConfig.key as keyof CategoryWithMeta];

      if (aValue && bValue && aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue && bValue && aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }

    return 0;
  });

  // Đảm bảo các danh mục con luôn được hiển thị ngay sau cha
  const finalSortedCategories = sortedCategories.sort((a, b) => {
    // Nếu a là con của b, a phải đứng sau b
    if (a.metaParentId === b.id) {
      return 1;
    }
    // Nếu b là con của a, b phải đứng sau a
    if (b.metaParentId === a.id) {
      return -1;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(finalSortedCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = finalSortedCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleExpand = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleEditClick = (category: CategoryWithMeta) => {
    handleSetIdMenuEdit(category.id);
    handleEditMenu();
  };

  const handleDeleteClick = (category: CategoryWithMeta) => {
    handleSetIdMenuDelete(category.id);
    handleDeleteMenu();
  };

  const handleConfirmDelete = () => {
    handleDeleteMenuAction();
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig.key !== column) return null;
    return sortConfig.direction === "asc" ? (
      <ChevronUp size={16} className="inline ml-1" />
    ) : (
      <ChevronDown size={16} className="inline ml-1" />
    );
  };

  return (
    <>
      <div className="overflow-hidden mx-auto max-w-7xl rounded-xl border shadow-xl bg-background-elevated border-border-secondary">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r border-b from-primary/10 to-secondary/10 border-border-secondary">
          <div className="flex flex-col gap-4 justify-between items-center sm:flex-row">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
                size={20}
              />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc mô tả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-3 pr-4 pl-10 w-full rounded-xl border shadow-sm transition-all duration-200 border-border-secondary bg-background-elevated text-text-primary focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-text-muted"
              />
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center px-3 py-2 rounded-xl border shadow-sm bg-background-elevated border-border-secondary">
                <Filter size={18} className="mr-2 text-text-muted" />
                <select
                  value={filterVisible}
                  onChange={(e) => setFilterVisible(e.target.value)}
                  className="text-sm font-medium bg-transparent border-none outline-none text-text-primary"
                >
                  <option value="all">Tất cả</option>
                  <option value="visible">Hiển thị</option>
                  <option value="hidden">Ẩn</option>
                </select>
              </div>
              <button
                onClick={handleAddMenu}
                className="flex gap-2 items-center px-4 py-2 text-white bg-gradient-to-r rounded-xl shadow-sm transition-all duration-200 from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
              >
                <Plus size={18} />
                Thêm danh mục
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r border-b from-background-muted to-background-elevated border-border-secondary">
              <tr>
                <th
                  className="px-6 py-4 text-sm font-semibold text-left transition-colors cursor-pointer text-text-primary hover:bg-background-elevated"
                  onClick={() => handleSort("id")}
                >
                  ID <SortIcon column="id" />
                </th>
                <th
                  className="px-6 py-4 text-sm font-semibold text-left transition-colors cursor-pointer text-text-primary hover:bg-background-elevated"
                  onClick={() => handleSort("name")}
                >
                  Tên danh mục <SortIcon column="name" />
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-left text-text-primary">
                  Cấp độ
                </th>
                <th
                  className="px-6 py-4 text-sm font-semibold text-left transition-colors cursor-pointer text-text-primary hover:bg-background-elevated"
                  onClick={() => handleSort("displayOrder")}
                >
                  Thứ tự <SortIcon column="displayOrder" />
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-left text-text-primary">
                  Danh mục con
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-left text-text-primary">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-left text-text-primary">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-secondary">
              {paginatedCategories.map((category, _index) => {
                const IconComponent = getIcon(category.name);
                const isExpanded = expandedCategories.has(category.id);
                const paddingLeft = category.metaLevel * 32;

                return (
                  <tr
                    key={`${category.id}-${category.metaLevel}`}
                    className={`transition-all duration-200 ${
                      category.metaLevel === 0
                        ? "hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5 bg-background-elevated"
                        : "hover:bg-gradient-to-r hover:from-accent/5 hover:to-warning/5 bg-background-base"
                    } ${category.metaLevel > 0 ? "border-l-4 border-accent" : ""}`}
                  >
                    <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-text-secondary">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          category.metaLevel === 0
                            ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                            : category.metaLevel === 1
                              ? "bg-gradient-to-r from-secondary to-secondary-dark text-white"
                              : "bg-gradient-to-r from-accent to-accent-dark text-white"
                        }`}
                      >
                        #{category.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="flex items-center"
                        style={{ paddingLeft: `${paddingLeft}px` }}
                      >
                        {category.hasChildren && (
                          <button
                            onClick={() => toggleExpand(category.id)}
                            className={`p-1.5 mr-3 rounded-lg transition-all duration-200 ${
                              isExpanded
                                ? "bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-dark hover:to-primary"
                                : "bg-background-muted text-text-muted hover:bg-background-elevated"
                            }`}
                          >
                            {isExpanded ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>
                        )}

                        <div
                          className={`p-2.5 rounded-xl mr-4 transition-all duration-200 ${
                            category.metaLevel === 0
                              ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-sm"
                              : category.metaLevel === 1
                                ? "bg-gradient-to-r from-secondary to-secondary-dark text-white shadow-sm"
                                : "bg-gradient-to-r from-accent to-accent-dark text-white shadow-sm"
                          }`}
                        >
                          <IconComponent size={18} />
                        </div>

                        <div>
                          <div
                            className={`text-sm font-semibold flex items-center ${
                              category.metaLevel === 0
                                ? "text-text-primary"
                                : category.metaLevel === 1
                                  ? "text-text-secondary"
                                  : "text-accent"
                            }`}
                          >
                            {category.metaLevel > 0 && (
                              <span className="mr-2 font-mono text-accent">
                                {category.metaLevel === 1 ? "└─" : "  └─"}
                              </span>
                            )}
                            {category.name}
                          </div>
                          {category.metaParentName && (
                            <div className="inline-block px-2 py-1 mt-1 text-xs rounded-md border text-accent bg-accent/10 border-accent/20">
                              Thuộc: {category.metaParentName}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm whitespace-nowrap text-text-muted">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          category.metaLevel === 0
                            ? "bg-gradient-to-r from-primary to-primary-dark text-white border border-primary"
                            : category.metaLevel === 1
                              ? "bg-gradient-to-r from-secondary to-secondary-dark text-white border border-secondary"
                              : "bg-gradient-to-r from-accent to-accent-dark text-white border border-accent"
                        }`}
                      >
                        Cấp {category.metaLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-text-secondary">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full border shadow-sm text-text-primary bg-background-muted border-border-secondary">
                        {category.displayOrder}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-text-muted">
                      {category.childrenCount > 0 ? (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full border shadow-sm text-success bg-success/10 border-success/20">
                          {category.childrenCount} mục
                        </span>
                      ) : (
                        <span className="font-mono text-text-muted">─</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm ${
                          category.isVisible
                            ? "bg-gradient-to-r from-success to-success/80 text-white border border-success hover:from-success/80 hover:to-success"
                            : "bg-gradient-to-r from-error to-error/80 text-white border border-error hover:from-error/80 hover:to-error"
                        }`}
                      >
                        {category.isVisible ? (
                          <>
                            <Eye size={12} className="mr-1" />
                            Hiển thị
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} className="mr-1" />
                            Ẩn
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditClick(category)}
                          className="p-2 rounded-xl border border-transparent transition-all duration-200 text-secondary hover:text-secondary-dark hover:bg-secondary/10 hover:border-secondary/20"
                          title="Chỉnh sửa"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(category)}
                          className="p-2 rounded-xl border border-transparent transition-all duration-200 text-error hover:text-error-dark hover:bg-error/10 hover:border-error/20"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r border-t from-background-muted to-background-elevated border-border-secondary">
            <div className="text-sm font-medium text-text-secondary">
              Hiển thị{" "}
              <span className="font-semibold text-text-primary">
                {startIndex + 1}
              </span>{" "}
              -{" "}
              <span className="font-semibold text-text-primary">
                {Math.min(
                  startIndex + itemsPerPage,
                  finalSortedCategories.length
                )}
              </span>{" "}
              trong tổng số{" "}
              <span className="font-semibold text-text-primary">
                {finalSortedCategories.length}
              </span>{" "}
              danh mục
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 text-text-secondary border-border-secondary hover:bg-background-elevated disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-md"
                      : "border border-border-secondary text-text-secondary hover:bg-background-elevated"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 text-text-secondary border-border-secondary hover:bg-background-elevated disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddMenu />
      <EditMenu />
      <ModalConfirm
        isOpen={isDeleteMenu}
        onClose={handleCloseModalDeleteMenu}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default CategoriesTable;

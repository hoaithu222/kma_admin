import { useState } from "react";
import { Search, RotateCcw, ChevronDown } from "lucide-react";
import { IRequestSearchArticle } from "@/core/api/posts/types";

const FilterPanel = ({
  filter,
  setFilter,
  onSearch,
  onReset,
}: {
  filter: IRequestSearchArticle;
  setFilter: (filter: IRequestSearchArticle) => void;
  onSearch: () => void;
  onReset: () => void;
}) => {
  const [localFilter, setLocalFilter] = useState(filter);

  const handleInputChange = (key: keyof IRequestSearchArticle, value: any) => {
    setLocalFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setFilter(localFilter);
    onSearch();
  };

  const handleReset = () => {
    const resetFilter: IRequestSearchArticle = {
      page: 0,
      size: 9,
      categoryId: null,
      subCategoryId: null,
      status: null,
      isPrivate: null,
      tag: null,
      sort: null,
      order: null,
      keyword: null,
    };
    setLocalFilter(resetFilter);
    setFilter(resetFilter);
    onReset();
  };

  return (
    <div className="relative mb-8">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-light via-accent-light to-primary-light rounded-2xl"></div>

      {/* Main container with glassmorphism effect */}
      <div className="relative border shadow-xl backdrop-blur-xl bg-background-surface/80 border-border-primary rounded-2xl shadow-secondary/10">
        {/* Filter Content */}
        <div className={`p-6 transition-all duration-300`}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Keyword Search */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium transition-colors text-text-primary group-focus-within:text-secondary">
                Từ khóa
              </label>
              <div className="relative">
                <Search className="absolute w-4 h-4 transition-colors transform -translate-y-1/2 text-text-muted left-3 top-1/2 group-focus-within:text-secondary" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full py-3 pl-10 pr-4 text-sm transition-all duration-200 border border-border-primary bg-background-surface/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary hover:bg-background-surface/90"
                  value={localFilter.keyword || ""}
                  onChange={(e) =>
                    handleInputChange("keyword", e.target.value || null)
                  }
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium transition-colors text-text-primary group-focus-within:text-secondary">
                Trạng thái
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border appearance-none cursor-pointer border-border-primary bg-background-surface/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary hover:bg-background-surface/90"
                  value={localFilter.status || ""}
                  onChange={(e) =>
                    handleInputChange("status", e.target.value || null)
                  }
                >
                  <option value="">Tất cả</option>
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Bản nháp</option>
                  <option value="pending">Chờ duyệt</option>
                </select>
                <ChevronDown className="absolute w-4 h-4 transform -translate-y-1/2 pointer-events-none text-text-muted right-3 top-1/2" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium transition-colors text-text-primary group-focus-within:text-secondary">
                Danh mục
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border appearance-none cursor-pointer border-border-primary bg-background-surface/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary hover:bg-background-surface/90"
                  value={localFilter.categoryId || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "categoryId",
                      parseInt(e.target.value) || null
                    )
                  }
                >
                  <option value="">Tất cả danh mục</option>
                  <option value="1">Công nghệ</option>
                  <option value="2">Kinh doanh</option>
                  <option value="3">Giải trí</option>
                </select>
                <ChevronDown className="absolute w-4 h-4 transform -translate-y-1/2 pointer-events-none text-text-muted right-3 top-1/2" />
              </div>
            </div>

            {/* Sort Options */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium transition-colors text-text-primary group-focus-within:text-secondary">
                Sắp xếp theo
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border appearance-none cursor-pointer border-border-primary bg-background-surface/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary hover:bg-background-surface/90"
                  value={localFilter.sort || ""}
                  onChange={(e) =>
                    handleInputChange("sort", e.target.value || null)
                  }
                >
                  <option value="">Mặc định</option>
                  <option value="createdAt">Ngày tạo</option>
                  <option value="updatedAt">Ngày cập nhật</option>
                  <option value="title">Tiêu đề</option>
                  <option value="views">Lượt xem</option>
                </select>
                <ChevronDown className="absolute w-4 h-4 transform -translate-y-1/2 pointer-events-none text-text-muted right-3 top-1/2" />
              </div>
            </div>

            {/* Order */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium transition-colors text-text-primary group-focus-within:text-secondary">
                Thứ tự
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border appearance-none cursor-pointer border-border-primary bg-background-surface/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary hover:bg-background-surface/90"
                  value={localFilter.order || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "order",
                      (e.target.value as "asc" | "desc" | null) || null
                    )
                  }
                >
                  <option value="">Mặc định</option>
                  <option value="asc">Tăng dần</option>
                  <option value="desc">Giảm dần</option>
                </select>
                <ChevronDown className="absolute w-4 h-4 transform -translate-y-1/2 pointer-events-none text-text-muted right-3 top-1/2" />
              </div>
            </div>

            {/* Page Size */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium transition-colors text-text-primary group-focus-within:text-secondary">
                Số lượng/trang
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border appearance-none cursor-pointer border-border-primary bg-background-surface/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary hover:bg-background-surface/90"
                  value={localFilter.size}
                  onChange={(e) =>
                    handleInputChange("size", parseInt(e.target.value))
                  }
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                  <option value={15}>15</option>
                  <option value={18}>18</option>
                </select>
                <ChevronDown className="absolute w-4 h-4 transform -translate-y-1/2 pointer-events-none text-text-muted right-3 top-1/2" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-6 mt-8 border-t sm:flex-row border-border-primary/50">
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 transform text-text-on-primary bg-gradient-to-r from-secondary to-accent rounded-xl hover:from-secondary-dark hover:to-accent-dark focus:outline-none focus:ring-2 focus:ring-secondary/30 hover:scale-105 hover:shadow-lg"
            >
              <Search className="w-4 h-4" />
              Tìm kiếm
            </button>

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 transform border text-text-primary border-border-primary bg-background-surface/70 rounded-xl hover:bg-background-surface hover:shadow-md focus:outline-none focus:ring-2 focus:ring-border-primary/30 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              Đặt lại
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute w-20 h-20 rounded-full -top-4 -right-4 bg-gradient-to-br from-secondary to-accent opacity-20 blur-xl"></div>
      <div className="absolute w-16 h-16 rounded-full -bottom-4 -left-4 bg-gradient-to-br from-accent to-primary opacity-20 blur-xl"></div>
    </div>
  );
};

export default FilterPanel;

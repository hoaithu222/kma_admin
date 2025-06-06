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
      page: 1,
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl"></div>

      {/* Main container with glassmorphism effect */}
      <div className="relative border shadow-xl backdrop-blur-xl bg-white/80 border-white/20 rounded-2xl shadow-blue-500/10">
        {/* Filter Content */}
        <div className={`p-6 transition-all duration-300`}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Keyword Search */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                Từ khóa
              </label>
              <div className="relative">
                <Search className="absolute w-4 h-4 text-gray-400 transition-colors transform -translate-y-1/2 left-3 top-1/2 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="w-full py-3 pl-10 pr-4 text-sm transition-all duration-200 border border-gray-200 bg-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 hover:bg-white/90"
                  value={localFilter.keyword || ""}
                  onChange={(e) =>
                    handleInputChange("keyword", e.target.value || null)
                  }
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                Trạng thái
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border border-gray-200 appearance-none cursor-pointer bg-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 hover:bg-white/90"
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
                <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                Danh mục
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border border-gray-200 appearance-none cursor-pointer bg-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 hover:bg-white/90"
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
                <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
              </div>
            </div>

            {/* Sort Options */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                Sắp xếp theo
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border border-gray-200 appearance-none cursor-pointer bg-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 hover:bg-white/90"
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
                <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
              </div>
            </div>

            {/* Order */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                Thứ tự
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border border-gray-200 appearance-none cursor-pointer bg-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 hover:bg-white/90"
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
                <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
              </div>
            </div>

            {/* Page Size */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                Số lượng/trang
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 text-sm transition-all duration-200 border border-gray-200 appearance-none cursor-pointer bg-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 hover:bg-white/90"
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
                <ChevronDown className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 pointer-events-none right-3 top-1/2" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-6 mt-8 border-t sm:flex-row border-gray-200/50">
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all duration-200 transform bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 hover:scale-105 hover:shadow-lg"
            >
              <Search className="w-4 h-4" />
              Tìm kiếm
            </button>

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 transform border border-gray-200 bg-white/70 rounded-xl hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500/30 hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              Đặt lại
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute w-20 h-20 rounded-full -top-4 -right-4 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-xl"></div>
      <div className="absolute w-16 h-16 rounded-full -bottom-4 -left-4 bg-gradient-to-br from-purple-400 to-pink-500 opacity-20 blur-xl"></div>
    </div>
  );
};

export default FilterPanel;

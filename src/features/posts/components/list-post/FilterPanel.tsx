import { useState } from "react";
import { Search, RotateCcw, ChevronDown } from "lucide-react";
import { IRequestSearchArticle } from "@/core/api/posts/types";
import { useSelector } from "react-redux";
import { selectCategories } from "@/features/category/slice/category.selector";
import Button from "@/foundation/components/buttons/Button";

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
  const categories = useSelector(selectCategories);

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
      <div className="absolute inset-0 rounded-2xl bg-background-overlay"></div>

      {/* Main container with glassmorphism effect */}
      <div className="relative rounded-2xl border border-gray-300 shadow-xl backdrop-blur-xl bg-gray-50/80 shadow-blue-500/10">
        {/* Filter Content */}
        <div className={`p-6 transition-all duration-300`}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Keyword Search */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-gray-900 transition-colors group-focus-within:text-blue-600">
                Từ khóa
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-500 transition-colors transform -translate-y-1/2 group-focus-within:text-blue-600" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  className="py-3 pr-4 pl-10 w-full text-sm rounded-xl border border-gray-300 transition-all duration-200 bg-gray-50/70 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 hover:bg-gray-50/90"
                  value={localFilter.keyword || ""}
                  onChange={(e) =>
                    handleInputChange("keyword", e.target.value || null)
                  }
                />
              </div>
            </div>
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-gray-900 transition-colors group-focus-within:text-blue-600">
                Danh mục
              </label>
              <div className="relative">
                <select
                  className="px-4 py-3 w-full text-sm rounded-xl border border-gray-300 transition-all duration-200 appearance-none cursor-pointer bg-gray-50/70 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 hover:bg-gray-50/90"
                  value={localFilter.categoryId || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "categoryId",
                      parseInt(e.target.value) || null
                    )
                  }
                >
                  <option value="">Tất cả danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Page Size */}
            <div className="group">
              <label className="block mb-2 text-sm font-medium text-gray-900 transition-colors group-focus-within:text-blue-600">
                Số lượng/trang
              </label>
              <div className="relative">
                <select
                  className="px-4 py-3 w-full text-sm rounded-xl border border-gray-300 transition-all duration-200 appearance-none cursor-pointer bg-gray-50/70 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 hover:bg-gray-50/90"
                  value={localFilter.size}
                  onChange={(e) =>
                    handleInputChange("size", parseInt(e.target.value))
                  }
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                  <option value={12}>12</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-6 mt-8 border-t sm:flex-row border-gray-300/50">
            <Button
              onClick={handleSearch}
              variant="modernCyan"
              iconLeft={<Search className="w-4 h-4" />}
            >
              Tìm kiếm
            </Button>

            <Button
              onClick={handleReset}
              variant="modernOrange"
              iconLeft={<RotateCcw className="w-4 h-4" />}
            >
              Đặt lại
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-600 to-yellow-500 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-500 to-red-500 rounded-full opacity-20 blur-xl"></div>
    </div>
  );
};

export default FilterPanel;

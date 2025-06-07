import React from "react";
import {
  Eye,
  Edit2,
  Trash2,
  Globe,
  Clock,
  Tag,
  Download,
  Share2,
  BookOpen,
  Heart,
  ExternalLink,
} from "lucide-react";

interface SimpleGridDisplayProps {
  data?: any[];

  emptyMessage?: string | React.ReactNode;

  cardConfig?: {
    showImage?: boolean;
    showBadge?: boolean;
    showMetadata?: boolean;
    showActions?: boolean;
    imageKey?: string;
    titleKey?: string;
    descriptionKey?: string;
    badgeKey?: string;
  };
  enableEdit?: boolean;
  enableDelete?: boolean;
  enableView?: boolean;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  customCardRender?: (item: any, index: number) => React.ReactNode;
  customBadgeRender?: (item: any) => React.ReactNode;
  customMetadataRender?: (item: any) => React.ReactNode;
  className?: string;
}

const SimpleGridDisplay: React.FC<SimpleGridDisplayProps> = ({
  data = [],

  emptyMessage = "Không có dữ liệu",

  cardConfig = {
    showImage: true,
    showBadge: true,
    showMetadata: true,
    showActions: true,
    imageKey: "thumbnailUrl",
    titleKey: "title",
    descriptionKey: "summary",
    badgeKey: "status",
  },
  enableEdit = true,
  enableDelete = true,
  enableView = true,
  onEdit,
  onDelete,
  onView,
  customCardRender,
  customBadgeRender,
  customMetadataRender,
  className = "",
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number = 150) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Render badge
  const renderBadge = (item: any) => {
    if (customBadgeRender) return customBadgeRender(item);

    const status = item[cardConfig.badgeKey || "status"];
    if (!status) return null;

    const badgeConfig: Record<
      string,
      { color: string; text: string; icon?: React.ReactNode }
    > = {
      published: {
        color: "bg-gradient-to-r from-emerald-500 to-green-500 text-white",
        text: "Đã xuất bản",
        icon: <Globe size={12} />,
      },
      draft: {
        color: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white",
        text: "Bản nháp",
        icon: <Edit2 size={12} />,
      },
    };

    const config = badgeConfig[status] || badgeConfig.draft;

    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${config.color}`}
      >
        {config.icon}
        {config.text}
      </div>
    );
  };

  // Render metadata
  const renderMetadata = (item: any) => {
    if (customMetadataRender) return customMetadataRender(item);

    return (
      <div className="space-y-3 text-sm">
        {/* Categories */}
        {(item.categoryName || item.subCategoryName) && (
          <div className="flex flex-wrap items-center gap-2">
            {item.categoryName && (
              <div className="flex items-center gap-1.5  text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
                <Tag size={12} />
                <span className="font-medium">{item.categoryName}</span>
              </div>
            )}
            {item.subCategoryName && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-3 py-1.5 rounded-lg border border-purple-100">
                <span className="text-xs font-medium">
                  {item.subCategoryName}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Stats and info */}
        <div className="flex items-center justify-between">
          {item.viewCount !== undefined && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Eye size={14} className="text-blue-500" />
              <span className="font-medium">
                {item.viewCount.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">lượt xem</span>
            </div>
          )}
          {item.updatedAt && (
            <div className="flex items-center gap-1.5 text-gray-600">
              <Clock size={14} className="text-green-500" />
              <span className="font-medium">{formatDate(item.updatedAt)}</span>
            </div>
          )}
        </div>

        {/* Additional info */}
        {item.files && item.files.length > 0 && (
          <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
            <Download size={14} />
            <span className="font-medium">
              {item.files.length} tệp đính kèm
            </span>
          </div>
        )}
      </div>
    );
  };

  // Handle delete with confirmation
  const handleDelete = (item: any) => {
    onDelete?.(item);
  };

  // Render card
  const renderCard = (item: any, index: number) => {
    if (customCardRender) return customCardRender(item, index);

    const imageUrl = item[cardConfig?.imageKey || "thumbnailUrl"]
      ? `${import.meta.env.VITE_API_URL_FILE || ""}${item[cardConfig?.imageKey || "thumbnailUrl"]}`
      : `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&auto=format`;

    return (
      <div
        key={item.id || index}
        className="relative overflow-hidden transition-all duration-500 border border-gray-100 shadow-sm bg-background-surface group rounded-2xl hover:shadow-xl hover:border-blue-200 hover:-translate-y-2"
      >
        {/* Image */}
        {cardConfig.showImage && (
          <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <img
              src={imageUrl}
              alt={item[cardConfig.titleKey || "title"]}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&auto=format";
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:opacity-100"></div>

            {/* Badge */}
            {cardConfig.showBadge && (
              <div className="absolute transition-all duration-300 transform translate-y-2 opacity-0 top-4 right-4 group-hover:translate-y-0 group-hover:opacity-100">
                {renderBadge(item)}
              </div>
            )}

            {/* Quick actions */}
            <div className="absolute flex gap-2 transition-all duration-300 delay-100 transform translate-y-4 opacity-0 bottom-4 right-4 group-hover:translate-y-0 group-hover:opacity-100">
              {enableView && (
                <button
                  onClick={() => onView?.(item)}
                  className="p-2.5 rounded-full bg-background-surface/90 backdrop-blur-sm shadow-lg hover:bg-background-surface hover:scale-110 transition-all duration-200"
                  title="Xem chi tiết"
                >
                  <Eye size={16} className="text-blue-600" />
                </button>
              )}
              <button
                className="p-2.5 rounded-full bg-background-surface/90 backdrop-blur-sm shadow-lg hover:bg-background-surface hover:scale-110 transition-all duration-200"
                title="Yêu thích"
              >
                <Heart size={16} className="text-red-500" />
              </button>
              <button
                className="p-2.5 rounded-full bg-background-surface/90 backdrop-blur-sm shadow-lg hover:bg-background-surface hover:scale-110 transition-all duration-200"
                title="Chia sẻ"
              >
                <Share2 size={16} className="text-green-600" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-200 line-clamp-2 group-hover:text-blue-600">
            {truncateText(
              item[cardConfig.titleKey || "title"] || "Không có tiêu đề",
              60
            )}
          </h3>

          {/* Description */}
          {item[cardConfig.descriptionKey || "summary"] && (
            <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
              {truncateText(item[cardConfig.descriptionKey || "summary"], 120)}
            </p>
          )}

          {/* Metadata */}
          {cardConfig.showMetadata && (
            <div className="mb-5">{renderMetadata(item)}</div>
          )}

          {/* Actions */}
          {cardConfig.showActions &&
            (enableView || enableEdit || enableDelete) && (
              <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  {enableView && (
                    <button
                      onClick={() => onView?.(item)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-50 rounded-xl hover:scale-105"
                    >
                      <BookOpen size={14} />
                      Xem
                    </button>
                  )}
                  {enableEdit && (
                    <button
                      onClick={() => onEdit?.(item)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 text-emerald-600 hover:bg-emerald-50 rounded-xl hover:scale-105"
                    >
                      <Edit2 size={14} />
                      Sửa
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:text-blue-600 hover:bg-blue-50"
                    title="Liên kết ngoài"
                  >
                    <ExternalLink size={16} />
                  </button>

                  {enableDelete && (
                    <button
                      onClick={() => handleDelete(item)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 rounded-xl hover:scale-105"
                    >
                      <Trash2 size={14} />
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen  ${className} `}>
      <div className="p-6 mx-auto max-w-7xl">
        {/* Grid Content */}
        {data.length === 0 ? (
          <div className="py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                <BookOpen size={48} className="text-gray-400" />
              </div>
              {typeof emptyMessage === "string" ? (
                <div>
                  <h3 className="mb-3 text-2xl font-semibold text-gray-900">
                    Chưa có dữ liệu
                  </h3>
                  <p className="text-lg text-gray-600">{emptyMessage}</p>
                </div>
              ) : (
                emptyMessage
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.map((item, index) => renderCard(item, index))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default SimpleGridDisplay;

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
        color: "bg-gradient-to-r from-success to-success text-white",
        text: "Đã xuất bản",
        icon: <Globe size={12} />,
      },
      draft: {
        color: "bg-gradient-to-r from-accent to-accent-dark text-white",
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
          <div className="flex flex-wrap gap-2 items-center">
            {item.categoryName && (
              <div className="flex items-center gap-1.5 text-secondary px-3 py-1.5 rounded-lg border border-secondary/20 bg-secondary/10">
                <Tag size={12} />
                <span className="font-medium">{item.categoryName}</span>
              </div>
            )}
            {item.subCategoryName && (
              <div className="bg-gradient-to-r from-accent/10 to-accent-dark/10 text-accent px-3 py-1.5 rounded-lg border border-accent/20">
                <span className="text-xs font-medium">
                  {item.subCategoryName}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Stats and info */}
        <div className="flex justify-between items-center">
          {item.viewCount !== undefined && (
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Eye size={14} className="text-secondary" />
              <span className="font-medium">
                {item.viewCount.toLocaleString()}
              </span>
              <span className="text-xs text-text-muted">lượt xem</span>
            </div>
          )}
          {item.updatedAt && (
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Clock size={14} className="text-success" />
              <span className="font-medium">{formatDate(item.updatedAt)}</span>
            </div>
          )}
        </div>

        {/* Additional info */}
        {item.files && item.files.length > 0 && (
          <div className="flex items-center gap-1.5 text-secondary bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary/20">
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
        className="overflow-hidden relative rounded-2xl border shadow-sm transition-all duration-500 border-border-primary bg-background-surface group hover:shadow-xl hover:border-secondary hover:-translate-y-2"
      >
        {/* Image */}
        {cardConfig.showImage && (
          <div className="overflow-hidden relative h-56 bg-gradient-to-br from-background-subtle via-background-muted to-background-elevated">
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
            <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 from-black/30 group-hover:opacity-100"></div>

            {/* Badge */}
            {cardConfig.showBadge && (
              <div className="absolute top-4 right-4 opacity-0 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                {renderBadge(item)}
              </div>
            )}

            {/* Quick actions */}
            <div className="flex absolute right-4 bottom-4 gap-2 opacity-0 transition-all duration-300 delay-100 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100">
              {enableView && (
                <button
                  onClick={() => onView?.(item)}
                  className="p-2.5 rounded-full bg-background-surface/90 backdrop-blur-sm shadow-lg hover:bg-background-surface hover:scale-110 transition-all duration-200"
                  title="Xem chi tiết"
                >
                  <Eye size={16} className="text-secondary" />
                </button>
              )}
              <button
                className="p-2.5 rounded-full bg-background-surface/90 backdrop-blur-sm shadow-lg hover:bg-background-surface hover:scale-110 transition-all duration-200"
                title="Yêu thích"
              >
                <Heart size={16} className="text-error" />
              </button>
              <button
                className="p-2.5 rounded-full bg-background-surface/90 backdrop-blur-sm shadow-lg hover:bg-background-surface hover:scale-110 transition-all duration-200"
                title="Chia sẻ"
              >
                <Share2 size={16} className="text-success" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="mb-3 text-xl font-bold transition-colors duration-200 text-text-primary line-clamp-2 group-hover:text-secondary">
            {truncateText(
              item[cardConfig.titleKey || "title"] || "Không có tiêu đề",
              60
            )}
          </h3>

          {/* Description */}

          {item[cardConfig.descriptionKey || "summary"] && (
            <p className="mb-4 text-sm leading-relaxed text-text-secondary line-clamp-3">
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
              <div className="flex justify-between items-center pt-5 border-t border-border-primary">
                <div className="flex gap-2 items-center">
                  {enableView && (
                    <button
                      onClick={() => onView?.(item)}
                      className="flex gap-2 items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 text-secondary hover:bg-secondary/10 hover:scale-105"
                    >
                      <BookOpen size={14} />
                      Xem
                    </button>
                  )}
                  {enableEdit && (
                    <button
                      onClick={() => onEdit?.(item)}
                      className="flex gap-2 items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 text-success hover:bg-success/10 hover:scale-105"
                    >
                      <Edit2 size={14} />
                      Sửa
                    </button>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    className="p-2 rounded-lg transition-all duration-200 text-text-muted hover:text-secondary hover:bg-secondary/10"
                    title="Liên kết ngoài"
                  >
                    <ExternalLink size={16} />
                  </button>

                  {enableDelete && (
                    <button
                      onClick={() => handleDelete(item)}
                      className="flex gap-2 items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 text-error hover:bg-error/10 hover:scale-105"
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
    <div className={`min-h-screen ${className}`}>
      <div className="p-6 mx-auto max-w-7xl">
        {/* Grid Content */}
        {data.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto max-w-md">
              <div className="flex justify-center items-center mx-auto mb-8 w-32 h-32 bg-gradient-to-br rounded-full from-background-muted to-background-elevated">
                <BookOpen size={48} className="text-text-muted" />
              </div>
              {typeof emptyMessage === "string" ? (
                <div>
                  <h3 className="mb-3 text-2xl font-semibold text-text-primary">
                    Chưa có dữ liệu
                  </h3>
                  <p className="text-lg text-text-secondary">{emptyMessage}</p>
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

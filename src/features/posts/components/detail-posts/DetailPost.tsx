import { useEffect } from "react";
import { Calendar, Eye, FileText, Tag, Clock, Download } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { selectDetailPost } from "../../slice/posts.selector";
import { useSelector } from "react-redux";
import { Post } from "../../slice/posts.type";
import { IFile, ITag } from "@/core/api/posts/types";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import LoadingSpinner from "@/foundation/components/loading/LoadingSpinner";

const DetailPost = () => {
  const { id } = useParams();
  const { handleGetPostById } = usePost();
  const detailPostById = useSelector(selectDetailPost);
  const post = detailPostById.detailPost;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      handleGetPostById(Number(id));
    }
  }, [id]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileIcon = (fileType: string): string => {
    if (fileType.includes("word")) return "📄";
    if (fileType.includes("pdf")) return "📕";
    if (fileType.includes("excel")) return "📊";
    if (fileType.includes("powerpoint")) return "📊";
    return "📎";
  };

  const getStatusBadge = (status: Post["status"]) => {
    const statusConfig = {
      draft: { color: "bg-yellow-100 text-yellow-800", text: "Bản nháp" },
      published: { color: "bg-green-100 text-green-800", text: "Đã xuất bản" },
      archived: { color: "bg-gray-100 text-gray-800", text: "Lưu trữ" },
    } as const;

    const config = statusConfig[status] || statusConfig.draft;
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const handleDown = (file: IFile) => {
    const url = `${import.meta.env.VITE_API_URL_FILE}/${file.filePath}`;
    window.open(url, "_blank");
  };
  const thumbnail = `${import.meta.env.VITE_API_URL_FILE}/${post.thumbnailUrl}`;

  return (
    <div className="overflow-hidden min-h-screen bg-gradient-to-br rounded-lg from-background-muted to-background-muted">
      {/* Header với background gradient */}
      <div className="text-white bg-gradient-to-r from-primary to-secondary">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => navigate("/posts")}
            >
              <FaArrowAltCircleLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </div>
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-text-on-primary">
              <span>Trang chủ</span>
              <span>/</span>
              <span>{post.categoryName}</span>
              <span>/</span>
              <span>{post.subCategoryName}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <div className="overflow-hidden mb-8 rounded-2xl shadow-lg bg-background-surface">
              {/* Thumbnail */}
              <div className="flex relative justify-center items-center h-64 bg-gradient-to-r from-primary to-accent">
                <div className="text-6xl text-text-on-primary">📚</div>
                <div className="absolute top-4 right-4 px-3 py-1 text-sm font-medium rounded-full backdrop-blur-sm text-text-on-primary bg-background-surface/20">
                  {post.categoryName}
                </div>
                <img
                  src={thumbnail}
                  alt="thumbnail"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Title & Meta */}
              <div className="p-8">
                <h2 className="mb-4 text-3xl font-bold leading-tight text-text-primary">
                  {post.title}
                </h2>

                <div className="flex flex-wrap gap-6 items-center mb-6 text-sm text-text-secondary">
                  <div className="flex gap-2 items-center">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Eye className="w-4 h-4" />
                    <span>{post.viewCount.toLocaleString()} lượt xem</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Clock className="w-4 h-4" />
                    <span>Cập nhật: {formatDate(post.updatedAt)}</span>
                  </div>
                </div>

                {/* Summary */}
                {/* Phải có mới hiển thị */}
                {post.summary && (
                  <div className="p-4 mb-6 rounded-r-lg border-l-4 border-primary bg-primary-light">
                    <p className="leading-relaxed text-text-primary">
                      {post.summary}
                    </p>
                  </div>
                )}
                {/* Tags */}
                {post.tag && post.tag.length > 0 && (
                  <div className="flex gap-2 items-center mb-6">
                    <Tag className="w-4 h-4 text-text-secondary" />
                    <div className="flex flex-wrap gap-2">
                      {post.tag.map((tag: ITag, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full transition-colors cursor-pointer text-text-primary bg-background-muted hover:bg-background-surface"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 mb-8 rounded-2xl shadow-lg bg-background-surface">
              <div
                className="max-w-none prose prose-lg prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-primary prose-ul:text-text-secondary prose-ol:text-text-secondary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info */}
            <div className="sticky top-8 p-4 mb-6 rounded-2xl shadow-lg bg-background-surface">
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText className="w-5 h-5 text-primary" />
                Thông tin bài viết
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border-primary">
                  <span className="text-text-secondary">Danh mục:</span>
                  <span className="font-medium text-text-primary">
                    {post.categoryName}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border-primary">
                  <span className="text-text-secondary">Danh mục con:</span>
                  <span className="font-medium text-text-primary">
                    {post.subCategoryName}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border-primary">
                  <span className="text-text-secondary">Trạng thái:</span>
                  {getStatusBadge(post.status)}
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-text-secondary">Lượt xem:</span>
                  <span className="font-medium text-text-primary">
                    {post.viewCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Files Section */}
            {post.files && post.files.length > 0 && (
              <div className="p-4 rounded-2xl shadow-lg bg-background-surface">
                <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                  <Download className="w-5 h-5 text-success" />
                  Tài liệu đính kèm
                </h3>

                <div className="space-y-3">
                  {post.files.map((file: IFile) => (
                    <div
                      key={file.id}
                      className="flex justify-between items-center p-2 rounded-xl transition-colors bg-background-muted hover:bg-background-surface"
                    >
                      <div className="flex items-center">
                        <span className="text-xl">
                          {getFileIcon(file.fileType)}
                        </span>
                        <div>
                          <p
                            className="text-sm font-medium text-text-primary max-w-[160px] truncate"
                            title={file.originalName}
                          >
                            {file.originalName}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {file.fileSize}
                          </p>
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 bg-primary text-text-on-primary text-sm rounded-lg hover:bg-primary-dark transition-colors"
                        onClick={() => handleDown(file)}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;

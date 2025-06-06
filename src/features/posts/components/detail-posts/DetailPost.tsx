import { useEffect } from "react";
import { Calendar, Eye, FileText, Tag, Clock, Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import { selectDetailPost } from "../../slice/posts.selector";
import { useSelector } from "react-redux";
import { Post } from "../../slice/posts.type";
import { IFile, ITag } from "@/core/api/posts/types";

const DetailPost = () => {
  const { id } = useParams();
  const { handleGetPostById } = usePost();
  const detailPostById = useSelector(selectDetailPost);
  const post = detailPostById.detailPost;

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
    return <div>Loading...</div>;
  }

  const handleDown = (file: IFile) => {
    const url = `${import.meta.env.VITE_API_URL_FILE}/${file.filePath}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header với background gradient */}
      <div className="text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-blue-100">
              <span>Trang chủ</span>
              <span>/</span>
              <span>{post.categoryName}</span>
              <span>/</span>
              <span>{post.subCategoryName}</span>
            </nav>

            {/* Status và Privacy */}
            <div className="flex items-center gap-3">
              {getStatusBadge(post.status)}
              {post.isPrivate && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Riêng tư
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <div className="mb-8 overflow-hidden bg-white shadow-lg rounded-2xl">
              {/* Thumbnail */}
              <div className="relative flex items-center justify-center h-64 bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="text-6xl text-white">📚</div>
                <div className="absolute px-3 py-1 text-sm font-medium text-white rounded-full top-4 right-4 bg-white/20 backdrop-blur-sm">
                  {post.categoryName}
                </div>
              </div>

              {/* Title & Meta */}
              <div className="p-8">
                <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.viewCount.toLocaleString()} lượt xem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Cập nhật: {formatDate(post.updatedAt)}</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 mb-6 border-l-4 border-blue-400 rounded-r-lg bg-blue-50">
                  <p className="leading-relaxed text-gray-700">
                    {post.summary}
                  </p>
                </div>

                {/* Tags */}
                {post.tag && post.tag.length > 0 && (
                  <div className="flex items-center gap-2 mb-6">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <div className="flex flex-wrap gap-2">
                      {post.tag.map((tag: ITag, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
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
            <div className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Info */}
            <div className="sticky p-6 mb-6 bg-white shadow-lg rounded-2xl top-8">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                <FileText className="w-5 h-5 text-blue-600" />
                Thông tin bài viết
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Danh mục:</span>
                  <span className="font-medium text-gray-900">
                    {post.categoryName}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Danh mục con:</span>
                  <span className="font-medium text-gray-900">
                    {post.subCategoryName}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Trạng thái:</span>
                  {getStatusBadge(post.status)}
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Lượt xem:</span>
                  <span className="font-medium text-gray-900">
                    {post.viewCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Files Section */}
            {post.files && post.files.length > 0 && (
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                  <Download className="w-5 h-5 text-green-600" />
                  Tài liệu đính kèm
                </h3>

                <div className="space-y-3">
                  {post.files.map((file: IFile) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 transition-colors bg-gray-50 rounded-xl hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {getFileIcon(file.fileType)}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {file.originalName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {file.fileSize}
                          </p>
                        </div>
                      </div>
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={() => handleDown(file)}
                      >
                        <Download className="w-4 h-4" />
                        Tải về
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

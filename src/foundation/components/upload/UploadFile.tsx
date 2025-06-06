import { UPLOAD_PATH } from "@/core/api/upload/path";
import Axios from "@/core/base/Axios";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

// Interfaces for upload
export interface IRequestUpload {
  file: File | FormData;
}

export interface ResponseUpload {
  id: number;
  fileName: string;
  originalName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  mimeType: string;
  dimensions: string;
  createdAt: string;
}
export interface ResponseUploads {
  data: ResponseUpload[];
}

interface UploadedDocument {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  type: string;
  progress?: number;
  error?: string;
  uploadResponse?: ResponseUpload;
}

interface UploadDocumentProps {
  value?: UploadedDocument[];
  onChange?: (uploadedDocumentId: number) => void;
  onUploadComplete?: (response: ResponseUpload) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  description?: string;
  required?: boolean;
  multiple?: boolean;
  showPreview?: boolean;
  showProgress?: boolean;
  className?: string;
  dropzoneClassName?: string;
  previewClassName?: string;
  placeholder?: string;
  emptyText?: string;
  uploadText?: string;
  dragText?: string;
  onError?: (error: string) => void;
  onRemove?: (document: UploadedDocument) => void;
}

const UploadFile = ({
  value = [],
  onChange,
  onUploadComplete,
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024,
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar",
  disabled = false,
  error,
  label,
  description,
  required = false,
  multiple = true,
  showPreview = true,
  className = "",
  dropzoneClassName = "",
  previewClassName = "",
  showProgress = true,
  placeholder = "Chọn hoặc kéo thả tài liệu vào đây",
  emptyText = "Chưa có tài liệu nào",
  uploadText = "Chọn tài liệu",
  dragText = "Kéo thả tài liệu vào đây",
  onError,
  onRemove,
}: UploadDocumentProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [documents, setDocuments] = useState<UploadedDocument[]>(value);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const getFileIcon = (type: string, name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (type.includes("pdf") || ext === "pdf") return "📄";
    if (type.includes("word") || ["doc", "docx"].includes(ext || ""))
      return "📝";
    if (type.includes("excel") || ["xls", "xlsx"].includes(ext || ""))
      return "📊";
    if (type.includes("powerpoint") || ["ppt", "pptx"].includes(ext || ""))
      return "📈";
    if (type.includes("zip") || ["zip", "rar"].includes(ext || "")) return "🗜️";
    if (type.includes("text") || ext === "txt") return "📄";
    return "📎";
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `Kích thước file không được vượt quá ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    return null;
  };

  const uploadFileToServer = async (
    files: File,
    tempId: string
  ): Promise<void> => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("files", files);

      const response = await Axios.post<ResponseUploads>(
        UPLOAD_PATH.upload,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.data) {
        const uploadResult: ResponseUpload[] = response.data.data;

        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === tempId
              ? {
                  ...doc,
                  progress: 100,
                  uploadResponse: uploadResult[0],
                  url:
                    `${import.meta.env.VITE_API_URL_FILE}${uploadResult[0].filePath}` ||
                    doc.url,
                }
              : doc
          )
        );

        onChange?.(uploadResult[0].id);
        onUploadComplete?.(uploadResult[0]);
        toast.success("Upload file thành công");
      } else {
        toast.error("Upload file thất bại. Vui lòng thử lại.");
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload thất bại:", err);

      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === tempId
            ? { ...doc, error: "Upload thất bại", progress: undefined }
            : doc
        )
      );

      onError?.("Upload file thất bại. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxFiles - documents.length;
    const filesToProcess = multiple
      ? fileArray.slice(0, remainingSlots)
      : [fileArray[0]];

    if (!multiple) {
      setDocuments([]);
    }

    for (const file of filesToProcess) {
      const validationError = validateFile(file);
      if (validationError) {
        onError?.(validationError);
        continue;
      }

      try {
        const url = URL.createObjectURL(file);
        const tempId = generateId();

        const uploadedDocument: UploadedDocument = {
          id: tempId,
          file,
          url,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: 0,
        };

        setDocuments((prev) =>
          multiple ? [...prev, uploadedDocument] : [uploadedDocument]
        );

        await uploadFileToServer(file, tempId);
      } catch (err) {
        onError?.(`${file.name}: Lỗi xử lý file`);
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    if (disabled || isUploading) return;

    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || isUploading) return;
    processFiles(e.target.files);
    e.target.value = "";
  };

  const handleRemove = (documentToRemove: UploadedDocument) => {
    URL.revokeObjectURL(documentToRemove.url);
    const updatedDocuments = documents.filter(
      (doc) => doc.id !== documentToRemove.id
    );
    setDocuments(updatedDocuments);
    onRemove?.(documentToRemove);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const canAddMore = documents.length < maxFiles;
  const isDisabled = disabled || isUploading;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-primary">
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}

      {description && (
        <p className="mb-4 text-sm text-secondary">{description}</p>
      )}

      {(canAddMore || documents.length === 0) && (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 cursor-pointer transition-colors
            ${isDragging ? "border-primary bg-background-subtle" : "hover:border-gray-400"}
            ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
            ${error ? "border-error" : ""}
            ${dropzoneClassName}
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !isDisabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            disabled={isDisabled}
            className="hidden"
          />

          <div className="text-center">
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 mx-auto border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
                <p className="mt-2 text-sm text-secondary">Đang tải lên...</p>
              </div>
            ) : (
              <>
                <svg
                  className="w-8 h-8 mx-auto sm:w-12 sm:h-12 text-muted"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="mt-2 sm:mt-4">
                  <p className="text-xs sm:text-sm text-secondary">
                    {placeholder}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-xs text-muted">
                    {dragText}
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mt-2 sm:mt-4 text-xs sm:text-sm font-medium border border-transparent rounded-md text-button-primary-text bg-button-primary-bg hover:bg-button-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                  disabled={isDisabled}
                >
                  {uploadText}
                </button>

                <p className="mt-2 text-[10px] sm:text-xs text-muted">
                  Tối đa {maxFiles} file, mỗi file ≤{" "}
                  {(maxSize / 1024 / 1024).toFixed(1)}MB
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {showPreview && documents.length > 0 && (
        <div
          className={`mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 ${previewClassName}`}
        >
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center p-2 border rounded-lg sm:p-3 bg-background-muted hover:bg-background-subtle"
            >
              <div className="mr-2 text-xl sm:mr-3 sm:text-2xl">
                {getFileIcon(doc.type, doc.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate sm:text-sm text-primary">
                  {doc.name}
                </p>
                <p className="text-xs text-secondary">
                  {formatFileSize(doc.size)}
                </p>
                {showProgress && typeof doc.progress === "number" && (
                  <div className="w-full h-1.5 sm:h-2 mt-1 rounded bg-background-muted">
                    <div
                      className="h-full rounded bg-button-primary-bg"
                      style={{ width: `${doc.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(doc)}
                className="ml-2 text-xs sm:ml-4 sm:text-sm text-error hover:underline"
                disabled={isDisabled}
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-2 text-sm text-error">{error}</p>}

      {!showPreview && documents.length === 0 && (
        <p className="mt-2 text-sm text-muted">{emptyText}</p>
      )}
    </div>
  );
};

export default UploadFile;

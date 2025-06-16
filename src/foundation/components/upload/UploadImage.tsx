import { UPLOAD_PATH } from "@/core/api/upload/path";
import Axios from "@/core/base/Axios";
import React, { useState, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { deleteMediaFile } from "@/core/api/upload";

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

interface UploadedImage {
  id: string;
  file?: File;
  url: string;
  name: string;
  size?: number;
  type?: string;
  progress?: number;
  error?: string;
  uploadResponse?: ResponseUpload;
  filePath?: string;
}

interface UploadImageProps {
  value?: UploadedImage[];
  onChange?: (uploadedImageId: number) => void;
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
  previewSize?: "small" | "medium" | "large";
  variant?: "default" | "compact" | "grid";
  className?: string;
  dropzoneClassName?: string;
  previewClassName?: string;
  showProgress?: boolean;
  resizeEnabled?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  placeholder?: string;
  emptyText?: string;
  uploadText?: string;
  dragText?: string;
  onError?: (error: string) => void;
  onRemove?: (image: UploadedImage) => void;
  isEdit?: boolean;
}

// Upload Image Component
const UploadImage = ({
  value = [],
  onChange,
  onUploadComplete,
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024,
  accept = "image/*",
  disabled = false,
  error,
  label,
  description,
  required = false,
  multiple = false,
  showPreview = true,
  previewSize = "medium",
  variant = "default",
  className = "",
  dropzoneClassName = "",
  previewClassName = "",
  showProgress = true,
  resizeEnabled = false,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.8,
  placeholder = "Chọn hoặc kéo thả hình ảnh vào đây",
  emptyText = "Chưa có hình ảnh nào",
  uploadText = "Chọn hình ảnh",
  dragText = "Kéo thả hình ảnh vào đây",
  onError,
  onRemove,
  isEdit = false,
}: UploadImageProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>(() => {
    if (isEdit && value.length > 0) {
      return value.map((img) => ({
        ...img,
        url: img.filePath
          ? `${import.meta.env.VITE_API_URL_FILE}${img.filePath}`
          : img.url,
      }));
    }
    return value;
  });
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Resize image if needed
  const resizeImage = useCallback(
    (file: File): Promise<File> => {
      return new Promise((resolve) => {
        if (!resizeEnabled) {
          resolve(file);
          return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
          let { width, height } = img;

          // Calculate new dimensions
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;

          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              } else {
                resolve(file);
              }
            },
            file.type,
            quality
          );
        };

        img.src = URL.createObjectURL(file);
      });
    },
    [resizeEnabled, maxWidth, maxHeight, quality]
  );

  // Validate file
  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "File phải là hình ảnh";
    }
    if (file.size > maxSize) {
      return `Kích thước file không được vượt quá ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    return null;
  };

  // Upload file to server
  const uploadFileToServer = async (
    files: File,
    tempId: string
  ): Promise<void> => {
    try {
      setIsUploading(true);

      // Create FormData and append file
      const formData = new FormData();
      formData.append("files", files);

      // Send FormData directly to the server
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

        // Cập nhật image với response từ server
        setImages((prev) =>
          prev.map((img) =>
            img.id === tempId
              ? {
                  ...img,
                  progress: 100,
                  uploadResponse: uploadResult[0],
                  url:
                    `${import.meta.env.VITE_API_URL_FILE}${uploadResult[0].filePath}` ||
                    img.url,
                }
              : img
          )
        );

        onChange?.(uploadResult[0].id);
        onUploadComplete?.(uploadResult[0]);

        toast.success("Upload ảnh thành công");
      } else {
        toast.error("Upload ảnh thất bại. Vui lòng thử lại.");
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Upload thất bại:", err);

      // Cập nhật error cho image
      setImages((prev) =>
        prev.map((img) =>
          img.id === tempId
            ? { ...img, error: "Upload thất bại", progress: undefined }
            : img
        )
      );

      onError?.("Upload ảnh thất bại. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  // Process files
  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxFiles - images.length;
    const filesToProcess = multiple
      ? fileArray.slice(0, remainingSlots)
      : [fileArray[0]];

    // Nếu không cho phép multiple, clear existing images
    if (!multiple) {
      setImages([]);
    }

    for (const file of filesToProcess) {
      const validationError = validateFile(file);
      if (validationError) {
        onError?.(validationError);
        continue;
      }

      try {
        const processedFile = await resizeImage(file);
        const url = URL.createObjectURL(processedFile);
        const tempId = generateId();

        const uploadedImage: UploadedImage = {
          id: tempId,
          file: processedFile,
          url,
          name: file.name,
          size: processedFile.size,
          type: processedFile.type,
          progress: 0,
        };

        // Thêm image vào state
        setImages((prev) =>
          multiple ? [...prev, uploadedImage] : [uploadedImage]
        );

        // Bắt đầu upload
        await uploadFileToServer(processedFile, tempId);
      } catch (err) {
        onError?.(`${file.name}: Lỗi xử lý file`);
      }
    }
  };

  // Handle drag events
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

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || isUploading) return;
    processFiles(e.target.files);
    e.target.value = ""; // Reset input
  };

  // Remove image
  const handleRemove = async (
    imageToRemove: UploadedImage,
    e?: React.MouseEvent
  ) => {
    try {
      e?.preventDefault();
      e?.stopPropagation();

      if (imageToRemove.uploadResponse?.id) {
        const response = await deleteMediaFile({
          id: imageToRemove.uploadResponse.id,
        });
        if (!response.ok) {
          toast.error("Xóa ảnh thất bại");
          return;
        }
      }

      URL.revokeObjectURL(imageToRemove.url);
      const updatedImages = images.filter((img) => img.id !== imageToRemove.id);
      setImages(updatedImages);
      onRemove?.(imageToRemove);
      toast.success("Xóa ảnh thành công");
    } catch (error) {
      console.error("Lỗi khi xóa ảnh:", error);
      toast.error("Xóa ảnh thất bại");
    }
  };

  // Preview size classes
  const getPreviewSizeClasses = () => {
    switch (previewSize) {
      case "small":
        return "w-12 h-12 sm:w-16 sm:h-16";
      case "large":
        return "w-24 h-24 sm:w-32 sm:h-32";
      default:
        return "w-16 h-16 sm:w-24 sm:h-24";
    }
  };

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "border border-dashed border-gray-300 rounded-lg p-2 sm:p-4";
      case "grid":
        return "grid gap-2 sm:gap-4";
      default:
        return "border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 md:p-8";
    }
  };

  const canAddMore = images.length < maxFiles;
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

      {/* Only show upload zone if not in edit mode or if no images exist */}
      {(!isEdit || images.length === 0) &&
        (canAddMore || images.length === 0) && (
          <div
            className={`
            relative transition-colors cursor-pointer
            ${getVariantClasses()}
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

      {/* Preview Grid */}
      {showPreview && images.length > 0 && (
        <div
          className={`
          mt-4 grid gap-2 sm:gap-4
          ${
            variant === "grid"
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          }
          ${previewClassName}
        `}
        >
          {images.map((image) => (
            <div
              key={image.id}
              className={`
                relative group border border-gray-200 rounded-lg overflow-hidden
                ${getPreviewSizeClasses()}
                hover:shadow-md transition-shadow
                ${image.error ? "border-error" : ""}
              `}
            >
              <img
                src={image.url}
                alt={image.name}
                className="object-cover w-full h-full"
              />

              {/* Progress bar */}
              {showProgress &&
                typeof image.progress === "number" &&
                image.progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-background-muted">
                    <div
                      className="h-0.5 sm:h-1 transition-all bg-button-primary-bg"
                      style={{ width: `${image.progress}%` }}
                    />
                  </div>
                )}

              {/* Success indicator */}
              {image.uploadResponse && (
                <div className="absolute flex items-center justify-center w-4 h-4 text-white bg-green-500 rounded-full top-1 left-1">
                  <svg
                    className="w-2 h-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* Error indicator */}
              {image.error && (
                <div className="absolute flex items-center justify-center w-4 h-4 text-white bg-red-500 rounded-full top-1 left-1">
                  <svg
                    className="w-2 h-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove(image, e);
                }}
                className="absolute flex items-center justify-center w-4 h-4 text-white transition-opacity rounded-full opacity-0 sm:w-6 sm:h-6 bg-error top-1 right-1 group-hover:opacity-100 hover:bg-button-danger-hover"
                disabled={isDisabled}
              >
                <svg
                  className="w-2 h-2 sm:w-3 sm:h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* File info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-0.5 sm:p-1 text-white transition-opacity bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                <p className="text-[10px] sm:text-xs truncate">{image.name}</p>
                <p className="text-[8px] sm:text-xs">
                  {(image.size ?? 0 / 1024).toFixed(1)}KB
                  {image.uploadResponse && ` • ID: ${image.uploadResponse.id}`}
                </p>
                {image.error && (
                  <p className="text-[8px] sm:text-xs text-red-300">
                    {image.error}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error message */}
      {error && <p className="mt-2 text-sm text-error">{error}</p>}

      {/* Empty state */}
      {!showPreview && images.length === 0 && (
        <p className="mt-2 text-sm text-muted">{emptyText}</p>
      )}
    </div>
  );
};

export default UploadImage;

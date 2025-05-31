import React, { useState, useRef, useCallback } from "react";

interface UploadedImage {
  id: string;
  file: File;
  url: string;
  name: string;
  size: number;
  type: string;
  progress?: number;
  error?: string;
}

interface UploadImageProps {
  value?: UploadedImage[];
  onChange?: (
    images: UploadedImage[] | ((prev: UploadedImage[]) => UploadedImage[])
  ) => void;
  onUpload?: (files: File[]) => Promise<string[]>;
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
  cropEnabled?: boolean;
  cropAspectRatio?: number;
  resizeEnabled?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  placeholder?: string;
  emptyText?: string;
  uploadText?: string;
  dragText?: string;
  removeText?: string;
  onError?: (error: string) => void;
  onRemove?: (image: UploadedImage) => void;
}

// Upload Image Component
const UploadImage = ({
  value = [],
  onChange,
  onUpload,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = "image/*",
  disabled = false,
  error,
  label,
  description,
  required = false,
  multiple = true,
  showPreview = true,
  previewSize = "medium",
  variant = "default",
  className = "",
  dropzoneClassName = "",
  previewClassName = "",
  showProgress = false,

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
}: UploadImageProps) => {
  const [isDragging, setIsDragging] = useState(false);
  // const [cropImage, setCropImage] = useState<UploadedImage | null>(null);
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

  // Process files
  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const remainingSlots = maxFiles - value.length;
    const filesToProcess = multiple
      ? fileArray.slice(0, remainingSlots)
      : [fileArray[0]];

    const newImages: UploadedImage[] = [];
    const errors: string[] = [];

    for (const file of filesToProcess) {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
        continue;
      }

      try {
        const processedFile = await resizeImage(file);
        const url = URL.createObjectURL(processedFile);

        const uploadedImage: UploadedImage = {
          id: generateId(),
          file: processedFile,
          url,
          name: file.name,
          size: processedFile.size,
          type: processedFile.type,
          progress: showProgress ? 0 : undefined,
        };

        newImages.push(uploadedImage);
      } catch (err) {
        errors.push(`${file.name}: Lỗi xử lý file`);
      }
    }

    if (errors.length > 0) {
      onError?.(errors.join("\n"));
    }

    if (newImages.length > 0) {
      const updatedImages = multiple ? [...value, ...newImages] : newImages;
      onChange?.(updatedImages);

      // Simulate upload progress
      if (showProgress && onUpload) {
        for (const image of newImages) {
          simulateProgress(image.id);
        }

        try {
          const uploadedUrls = await onUpload(newImages.map((img) => img.file));
          // Update images with uploaded URLs
          const finalImages = updatedImages.map((img) => {
            const uploadedIndex = newImages.findIndex(
              (newImg) => newImg.id === img.id
            );
            if (uploadedIndex !== -1 && uploadedUrls[uploadedIndex]) {
              return {
                ...img,
                url: uploadedUrls[uploadedIndex],
                progress: 100,
              };
            }
            return img;
          });
          onChange?.(finalImages);
        } catch (err) {
          onError?.("Lỗi upload file");
        }
      }
    }
  };

  // Simulate upload progress
  const simulateProgress = (imageId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }

      onChange?.((prev: UploadedImage[]) =>
        prev.map((img) => (img.id === imageId ? { ...img, progress } : img))
      );
    }, 200);
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

    if (disabled) return;

    const files = e.dataTransfer.files;
    processFiles(files);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Remove image
  const handleRemove = (imageToRemove: UploadedImage) => {
    URL.revokeObjectURL(imageToRemove.url);
    const updatedImages = value.filter((img) => img.id !== imageToRemove.id);
    onChange?.(updatedImages);
    onRemove?.(imageToRemove);
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

  const canAddMore = value.length < maxFiles;

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

      {/* Upload Zone */}
      {(canAddMore || value.length === 0) && (
        <div
          className={`
            relative transition-colors cursor-pointer
            ${getVariantClasses()}
            ${isDragging ? "border-primary bg-background-subtle" : "hover:border-gray-400"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${error ? "border-error" : ""}
            ${dropzoneClassName}
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            disabled={disabled}
            className="hidden"
          />

          <div className="text-center">
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
              <p className="text-xs sm:text-sm text-secondary">{placeholder}</p>
              <p className="mt-1 text-[10px] sm:text-xs text-muted">
                {dragText}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mt-2 sm:mt-4 text-xs sm:text-sm font-medium border border-transparent rounded-md text-button-primary-text bg-button-primary-bg hover:bg-button-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={disabled}
            >
              {uploadText}
            </button>

            <p className="mt-2 text-[10px] sm:text-xs text-muted">
              Tối đa {maxFiles} file, mỗi file ≤{" "}
              {(maxSize / 1024 / 1024).toFixed(1)}MB
            </p>
          </div>
        </div>
      )}

      {/* Preview Grid */}
      {showPreview && value.length > 0 && (
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
          {value.map((image) => (
            <div
              key={image.id}
              className={`
                relative group border border-gray-200 rounded-lg overflow-hidden
                ${getPreviewSizeClasses()}
                hover:shadow-md transition-shadow
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

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(image);
                }}
                className="absolute flex items-center justify-center w-4 h-4 text-white transition-opacity rounded-full opacity-0 sm:w-6 sm:h-6 bg-error top-1 right-1 group-hover:opacity-100 hover:bg-button-danger-hover"
                disabled={disabled}
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
                  {(image.size / 1024).toFixed(1)}KB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error message */}
      {error && <p className="mt-2 text-sm text-error">{error}</p>}

      {/* Empty state */}
      {!showPreview && value.length === 0 && (
        <p className="mt-2 text-sm text-muted">{emptyText}</p>
      )}
    </div>
  );
};
export default UploadImage;

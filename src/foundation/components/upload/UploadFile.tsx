import React, { useState, useRef } from "react";

interface UploadedDocument {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress?: number;
  url?: string;
}

interface UploadDocumentProps {
  value: UploadedDocument[];
  onChange?: (
    documents:
      | UploadedDocument[]
      | ((prev: UploadedDocument[]) => UploadedDocument[])
  ) => void;
  onUpload?: (files: File[]) => Promise<string[]>;
  onError?: (errorMsg: string) => void;
  onRemove?: (doc: UploadedDocument) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  disabled?: boolean;
  error?: boolean;
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
  uploadText?: string;
  dragText?: string;
  removeText?: string;
}

const UploadFile = ({
  value = [],
  onChange,
  onUpload,
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
  showProgress = false,
  placeholder = "Chọn hoặc kéo thả tài liệu vào đây",
  uploadText = "Chọn tài liệu",
  dragText = "Kéo thả tài liệu vào đây",
  removeText = "Xóa",
  onError,
  onRemove,
}: UploadDocumentProps) => {
  const [isDragging, setIsDragging] = useState(false);
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

  const processFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    const remainingSlots = maxFiles - value.length;
    const filesToProcess = multiple
      ? fileArray.slice(0, remainingSlots)
      : [fileArray[0]];

    const newDocuments: UploadedDocument[] = [];
    const errors: string[] = [];

    for (const file of filesToProcess) {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
        continue;
      }

      const uploadedDocument: UploadedDocument = {
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: showProgress ? 0 : undefined,
      };
      newDocuments.push(uploadedDocument);
    }

    if (errors.length > 0) {
      onError?.(errors.join("\n"));
    }

    if (newDocuments.length > 0) {
      const updatedDocuments = multiple
        ? [...value, ...newDocuments]
        : newDocuments;
      onChange?.(updatedDocuments);

      if (showProgress && onUpload) {
        for (const doc of newDocuments) simulateProgress(doc.id);

        try {
          const uploadedUrls = await onUpload(
            newDocuments.map((doc) => doc.file)
          );
          const finalDocuments = updatedDocuments.map((doc) => {
            const uploadedIndex = newDocuments.findIndex(
              (newDoc) => newDoc.id === doc.id
            );
            if (uploadedIndex !== -1 && uploadedUrls[uploadedIndex]) {
              return {
                ...doc,
                url: uploadedUrls[uploadedIndex],
                progress: 100,
              };
            }
            return doc;
          });
          onChange?.(finalDocuments);
        } catch (err) {
          onError?.("Lỗi upload file");
        }
      }
    }
  };

  const simulateProgress = (docId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      onChange?.((prev: UploadedDocument[]) =>
        prev.map((doc) => (doc.id === docId ? { ...doc, progress } : doc))
      );
    }, 200);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    if (e.dataTransfer.items?.length) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    dragCounter.current = 0;
    if (disabled) return;
    processFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (documentToRemove: UploadedDocument) => {
    const updatedDocuments = value.filter(
      (doc) => doc.id !== documentToRemove.id
    );
    onChange?.(updatedDocuments);
    onRemove?.(documentToRemove);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const canAddMore = value.length < maxFiles;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-primary">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      {description && (
        <p className="mb-4 text-sm text-secondary">{description}</p>
      )}

      {canAddMore && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 cursor-pointer transition-colors
          ${isDragging ? "border-primary bg-background-subtle" : "hover:border-gray-400"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${error ? "border-error" : ""} ${dropzoneClassName}`}
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
            <p className="text-sm text-secondary">{placeholder}</p>
            <p className="text-xs text-muted">{dragText}</p>
            <button
              type="button"
              className="px-4 py-2 mt-4 rounded-md text-button-primary-text bg-button-primary-bg hover:bg-button-primary-hover"
              disabled={disabled}
            >
              {uploadText}
            </button>
            <p className="mt-2 text-xs text-muted">
              Tối đa {maxFiles} file, mỗi file ≤{" "}
              {(maxSize / 1024 / 1024).toFixed(1)}MB
            </p>
          </div>
        </div>
      )}

      {showPreview && value.length > 0 && (
        <div className={`mt-4 space-y-2 ${previewClassName}`}>
          {value.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center p-3 border rounded-lg bg-background-muted hover:bg-background-subtle"
            >
              <div className="mr-3 text-2xl">
                {getFileIcon(doc.type, doc.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-primary">
                  {doc.name}
                </p>
                <p className="text-sm text-secondary">
                  {formatFileSize(doc.size)}
                </p>
                {showProgress && typeof doc.progress === "number" && (
                  <div className="w-full h-2 mt-1 rounded bg-background-muted">
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
                className="ml-4 text-sm text-error hover:underline"
              >
                {removeText}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadFile;

import React from "react";
import {
  FaDownload,
  FaTrash,
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileArchive,
  FaFileAlt,
} from "react-icons/fa";

interface FileData {
  id: number;
  url: string;
  fileName: string | null;
  fileSize: number;
  fileType: string;
  originalName?: string;
}

interface FileListProps {
  files: FileData[];
  onRemove?: (fileId: number) => void;
  showRemove?: boolean;
}

const FileList: React.FC<FileListProps> = ({
  files,
  onRemove,
  showRemove = true,
}) => {
  const getFileIcon = (fileName: string | null | undefined) => {
    if (!fileName) {
      return <FaFile className="text-gray-400" />;
    }

    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <FaFilePdf className="text-red-500" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-500" />;
      case "xls":
      case "xlsx":
        return <FaFileExcel className="text-green-500" />;
      case "ppt":
      case "pptx":
        return <FaFilePowerpoint className="text-orange-500" />;
      case "txt":
        return <FaFileAlt className="text-gray-500" />;
      case "zip":
      case "rar":
      case "7z":
        return <FaFileArchive className="text-purple-500" />;
      default:
        return <FaFile className="text-gray-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-text-secondary">
        Files đã upload:
      </h4>
      <div className="space-y-2 overflow-y-auto max-h-40">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 transition-colors border rounded-lg bg-background-elevated border-border-primary hover:border-primary"
          >
            <div className="flex items-center flex-1 min-w-0 space-x-3">
              <div className="flex-shrink-0">{getFileIcon(file.fileName)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-text-primary">
                  {file.originalName || file.fileName}
                </p>
                <p className="text-xs text-text-secondary">
                  {formatFileSize(file.fileSize)} • {file.fileType}
                </p>
              </div>
            </div>
            <div className="flex items-center flex-shrink-0 space-x-2">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-colors rounded-md text-primary hover:bg-primary/10"
                title="Download file"
              >
                <FaDownload size={14} />
              </a>
              {showRemove && onRemove && (
                <button
                  onClick={() => onRemove(file.id)}
                  className="p-2 text-red-500 transition-colors rounded-md hover:bg-red-500/10"
                  title="Remove file"
                >
                  <FaTrash size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;

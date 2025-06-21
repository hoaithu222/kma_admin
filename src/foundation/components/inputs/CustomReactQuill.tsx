import React, { useRef, useEffect, useCallback, useState } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";
import "./CustomReactQuill.css";
import { modules, formats } from "@/shared/utils/utilsReactQuill";
import { toast } from "react-toastify";

interface CustomReactQuillProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onFileUpload?: (fileData: any) => void;
  uploadFunction?: (file: File) => Promise<any>;
}

const CustomReactQuill: React.FC<CustomReactQuillProps> = ({
  value,
  onChange,
  placeholder,
  className,
  style,
  onFileUpload,
  uploadFunction,
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  // Custom file handler
  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!uploadFunction) {
        toast.error("Upload function not provided");
        return;
      }

      setIsUploading(true);
      try {
        const result = await uploadFunction(file);
        if (onFileUpload) {
          onFileUpload(result);
        }
        toast.success("File uploaded successfully!");
        return result;
      } catch (error) {
        console.error("File upload error details:", error);
        toast.error("Upload failed: " + (error as Error).message);
        throw error;
      } finally {
        setIsUploading(false);
      }
    },
    [uploadFunction, onFileUpload]
  );

  // Enhanced file icons with colors
  const getFileIcon = (fileName: string | null | undefined) => {
    if (!fileName) return { icon: "📎", color: "#6b7280" };

    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return { icon: "📄", color: "#dc2626" };
      case "doc":
      case "docx":
        return { icon: "📝", color: "#2563eb" };
      case "xls":
      case "xlsx":
        return { icon: "📊", color: "#059669" };
      case "ppt":
      case "pptx":
        return { icon: "📈", color: "#ea580c" };
      case "txt":
        return { icon: "📃", color: "#6b7280" };
      case "zip":
      case "rar":
        return { icon: "📦", color: "#7c3aed" };
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return { icon: "🖼️", color: "#db2777" };
      case "mp4":
      case "avi":
      case "mov":
        return { icon: "🎥", color: "#dc2626" };
      case "mp3":
      case "wav":
        return { icon: "🎵", color: "#059669" };
      default:
        return { icon: "📎", color: "#6b7280" };
    }
  };

  // const formatFileSize = (bytes: number) => {
  //   if (bytes === 0) return "0 Bytes";
  //   const k = 1024;
  //   const sizes = ["Bytes", "KB", "MB", "GB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  // };

  const createFileDisplayHTML = (file: File, result: any) => {
    const fileInfo = getFileIcon(file.name);
    const fileUrl = result?.url || "#";
    const fileName = result?.fileName || file.name;

    return `
    <div class="file-attachment-container" style="
      margin: 20px 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div class="file-attachment-card" style="
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        border: 1px solid #e2e8f0;
        border-radius: 14px;
        background: linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      "
      onmouseover="
        this.style.borderColor = '${fileInfo.color}';
        this.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.12)';
        this.style.transform = 'translateY(-2px)';
      "
      onmouseout="
        this.style.borderColor = '#e2e8f0';
        this.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.06)';
        this.style.transform = 'translateY(0)';
      ">

        <!-- File Icon -->
        <div style="
          width: 52px;
          height: 52px;
          background: ${fileInfo.color}20;
          border: 2px solid ${fileInfo.color}40;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        ">
          ${fileInfo.icon}
        </div>

        <!-- File Info and Download Button -->
        <div style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          gap: 16px;
          overflow: hidden;
        ">
          <div style="
            font-size: 15px;
            font-weight: 600;
            color: #1e293b;
            line-height: 1.4;
            word-break: break-word;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          ">
            ${fileName}
          </div>

          <a href="${fileUrl}" target="_blank" rel="noopener noreferrer"
             onclick="event.stopPropagation();"
             style="
               padding: 6px 14px;
               background: ${fileInfo.color};
               color: #fff;
               border-radius: 8px;
               font-size: 13px;
               font-weight: 500;
               text-decoration: none;
               display: flex;
               align-items: center;
               gap: 6px;
               box-shadow: 0 2px 6px ${fileInfo.color}40;
               transition: transform 0.2s, box-shadow 0.2s;
               white-space: nowrap;
             "
             onmouseover="
               this.style.transform = 'scale(1.05)';
               this.style.boxShadow = '0 4px 10px ${fileInfo.color}60';
             "
             onmouseout="
               this.style.transform = 'scale(1)';
               this.style.boxShadow = '0 2px 6px ${fileInfo.color}40';
             ">
            📥 Tải xuống
          </a>
        </div>
      </div>
    </div>
  `;
  };

  // Create file table HTML for multiple files
  const createFileDisplayTableHTML = (
    files: Array<{ file: File; result: any }>
  ) => {
    return `
    <div class="files-list-container" style="
      margin: 20px 0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #e5e7eb;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div style="
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        padding: 16px;
        font-weight: 600;
        font-size: 16px;
      ">
        📎 Danh sách Files đã upload (${files.length} files)
      </div>

      <div style="background: white;">
        ${files
          .map((item) => {
            const fileInfo = getFileIcon(item.file.name);

            const fileUrl = item.result?.url || "#";

            return `
              <a href="${fileUrl}" target="_blank" rel="noopener noreferrer"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 12px 16px;
                  border-bottom: 1px solid #e5e7eb;
                  text-decoration: none;
                  color: inherit;
                  transition: background-color 0.2s ease;
                "
                onmouseover="this.style.backgroundColor = '#f9fafb';"
                onmouseout="this.style.backgroundColor = 'transparent';"
              >
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 20px; color: ${fileInfo.color};">${fileInfo.icon}</span>
                </div>
                <div style="
                  background: ${fileInfo.color};
                  color: white;
                  padding: 6px 12px;
                  border-radius: 6px;
                  font-size: 12px;
                  font-weight: 500;
                ">
                  📥 Tải xuống
                </div>
              </a>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
  };

  // Create table HTML
  const createTableHTML = (rows: number, cols: number) => {
    let tableHTML = `
      <table style="
        border-collapse: collapse !important;
        width: 100% !important;
        margin: 15px 0 !important;
        table-layout: fixed !important;
        background-color: white !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        border: 1px solid #d1d5db !important;
      ">`;

    // Create header row
    tableHTML += "<thead>";
    tableHTML += "<tr>";
    for (let j = 0; j < cols; j++) {
      tableHTML += `
        <th style="
          border: 1px solid #374151 !important;
          padding: 12px 8px !important;
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%) !important;
          font-weight: 600 !important;
          text-align: left !important;
          color: #1e293b !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
          vertical-align: middle !important;
          word-wrap: break-word !important;
          min-width: 100px !important;
        ">
          Tiêu đề ${j + 1}
        </th>`;
    }
    tableHTML += "</tr>";
    tableHTML += "</thead>";

    // Create body rows
    tableHTML += "<tbody>";
    for (let i = 1; i < rows; i++) {
      tableHTML += "<tr>";
      for (let j = 0; j < cols; j++) {
        tableHTML += `
          <td style="
            border: 1px solid #d1d5db !important;
            padding: 10px 8px !important;
            background-color: #ffffff !important;
            color: #374151 !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
            vertical-align: top !important;
            word-wrap: break-word !important;
            min-height: 20px !important;
            min-width: 100px !important;
          ">
            Nội dung ${i}.${j + 1}
          </td>`;
      }
      tableHTML += "</tr>";
    }
    tableHTML += "</tbody>";
    tableHTML += "</table>";
    tableHTML += "<p><br/></p>";

    return tableHTML;
  };

  // Insert table function
  const insertTable = () => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    try {
      const range = quill.getSelection(true);
      if (!range) return;
      const tableHtml = createTableHTML(tableRows, tableCols);

      quill.clipboard.dangerouslyPasteHTML(range.index, tableHtml);

      toast.success(`Đã chèn bảng ${tableRows}x${tableCols} thành công!`);

      setShowTableModal(false);
    } catch (error) {
      console.error("Error inserting table:", error);
      toast.error("Có lỗi khi chèn bảng!");
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();

      // Create enhanced file button
      const createFileButton = () => {
        try {
          const toolbarContainer = document.querySelector(".ql-toolbar");

          if (toolbarContainer) {
            let fileButton = toolbarContainer.querySelector(".ql-file");

            if (!fileButton) {
              fileButton = document.createElement(
                "button"
              ) as HTMLButtonElement;
              fileButton.className = "ql-file";
              (fileButton as HTMLButtonElement).type = "button";
              fileButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              `;
              (fileButton as HTMLButtonElement).title = "Upload file";
              (fileButton as HTMLButtonElement).setAttribute(
                "data-upload",
                "true"
              );

              // Style the button
              Object.assign((fileButton as HTMLButtonElement).style, {
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                background: "white",
                color: "#374151",
                cursor: "pointer",
                transition: "all 0.2s ease",
              });

              toolbarContainer.appendChild(fileButton);

              // Add hover effects
              fileButton.addEventListener("mouseenter", () => {
                (fileButton as HTMLButtonElement).style.background = "#f3f4f6";
                (fileButton as HTMLButtonElement).style.borderColor = "#9ca3af";
              });

              fileButton.addEventListener("mouseleave", () => {
                (fileButton as HTMLButtonElement).style.background = "white";
                (fileButton as HTMLButtonElement).style.borderColor = "#d1d5db";
              });

              fileButton.addEventListener("click", (e: Event) => {
                e.preventDefault();
                e.stopPropagation();

                if (isUploading) {
                  toast.info("Please wait for current upload to complete");
                  return;
                }

                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("multiple", "true");
                input.setAttribute(
                  "accept",
                  ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.mp3,.wav"
                );
                input.click();

                input.onchange = async () => {
                  const files = Array.from(input.files || []);
                  if (files.length === 0) return;

                  try {
                    (fileButton as HTMLButtonElement).classList.add(
                      "uploading"
                    );
                    (fileButton as HTMLButtonElement).style.opacity = "0.6";

                    const range = quill.getSelection();
                    if (range) {
                      if (files.length === 1) {
                        const file = files[0];
                        const result = await handleFileUpload(file);
                        const fileHtml = createFileDisplayHTML(file, result);
                        quill.clipboard.dangerouslyPasteHTML(
                          range.index,
                          fileHtml
                        );
                      } else {
                        const uploadPromises = files.map((file) =>
                          handleFileUpload(file).then((result) => ({
                            file,
                            result,
                          }))
                        );
                        const uploadedFiles = await Promise.all(uploadPromises);
                        const tableHtml =
                          createFileDisplayTableHTML(uploadedFiles);
                        quill.clipboard.dangerouslyPasteHTML(
                          range.index,
                          tableHtml
                        );
                      }
                      quill.setSelection(range.index + 1, 0);
                    }
                  } catch (error) {
                    console.error("File upload error:", error);
                  } finally {
                    (fileButton as HTMLButtonElement).classList.remove(
                      "uploading"
                    );
                    (fileButton as HTMLButtonElement).style.opacity = "1";
                  }
                };
              });
            }
          }
        } catch (error) {
          console.error("Error creating file button:", error);
        }
      };

      // Create table button
      const createTableButton = () => {
        try {
          const toolbarContainer = document.querySelector(".ql-toolbar");

          if (toolbarContainer) {
            let tableButton = toolbarContainer.querySelector(".ql-table");

            if (!tableButton) {
              tableButton = document.createElement(
                "button"
              ) as HTMLButtonElement;
              tableButton.className = "ql-table";
              (tableButton as HTMLButtonElement).type = "button";
              tableButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 3h18v18H3V3z"/>
                  <path d="M3 9h18"/>
                  <path d="M3 15h18"/>
                  <path d="M9 3v18"/>
                  <path d="M15 3v18"/>
                </svg>
              `;
              (tableButton as HTMLButtonElement).title = "Chèn bảng";

              // Style the button
              Object.assign((tableButton as HTMLButtonElement).style, {
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "28px",
                height: "28px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                background: "white",
                color: "#374151",
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginLeft: "4px",
              });

              toolbarContainer.appendChild(tableButton);

              // Add hover effects
              tableButton.addEventListener("mouseenter", () => {
                (tableButton as HTMLButtonElement).style.background = "#f3f4f6";
                (tableButton as HTMLButtonElement).style.borderColor =
                  "#9ca3af";
              });

              tableButton.addEventListener("mouseleave", () => {
                (tableButton as HTMLButtonElement).style.background = "white";
                (tableButton as HTMLButtonElement).style.borderColor =
                  "#d1d5db";
              });

              tableButton.addEventListener("click", (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                setShowTableModal(true);
              });
            }
          }
        } catch (error) {
          console.error("Error creating table button:", error);
        }
      };

      // Try to create buttons with delays
      setTimeout(createFileButton, 100);
      setTimeout(createFileButton, 500);
      setTimeout(createTableButton, 100);
      setTimeout(createTableButton, 500);
    }
  }, [handleFileUpload, isUploading]);

  return (
    <>
      <div>
        <style>
          {`
            .ql-editor table {
              border-collapse: collapse !important;
              width: 100% !important;
              margin: 15px 0 !important;
              table-layout: fixed !important;
              background-color: white !important;
              border: 1px solid #d1d5db !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }

            .ql-editor table th {
              border: 1px solid #374151 !important;
              padding: 12px 8px !important;
              background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%) !important;
              font-weight: 600 !important;
              text-align: left !important;
              color: #1e293b !important;
              font-size: 14px !important;
              line-height: 1.4 !important;
              vertical-align: middle !important;
              word-wrap: break-word !important;
              min-width: 100px !important;
            }

            .ql-editor table td {
              border: 1px solid #d1d5db !important;
              padding: 10px 8px !important;
              background-color: #ffffff !important;
              color: #374151 !important;
              font-size: 14px !important;
              line-height: 1.5 !important;
              vertical-align: top !important;
              word-wrap: break-word !important;
              min-height: 20px !important;
              min-width: 100px !important;
            }

            .ql-editor table tr:nth-child(even) td {
              background-color: #f9fafb !important;
            }

            .ql-editor table tr:hover td {
              background-color: #f0f9ff !important;
            }

            .ql-editor table th:hover {
              background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%) !important;
            }

            /* Đảm bảo bảng responsive */
            .ql-editor table {
              overflow-x: auto !important;
              display: block !important;
            }

            .ql-editor table tbody {
              display: table !important;
              width: 100% !important;
            }

            .ql-editor table thead {
              display: table !important;
              width: 100% !important;
            }

            /* Cải thiện hiển thị trên mobile */
            @media (max-width: 768px) {
              .ql-editor table {
                font-size: 12px !important;
              }

              .ql-editor table th,
              .ql-editor table td {
                padding: 8px 6px !important;
                min-width: 80px !important;
              }
            }
          `}
        </style>

        <ReactQuill
          ref={quillRef}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className={`compact-editor ${className || ""}`}
          style={{ height: "400px", ...style }}
        />
      </div>

      {/* Table Modal */}
      {showTableModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowTableModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              minWidth: "300px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                margin: "0 0 16px 0",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Chèn bảng
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Số hàng:
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={tableRows}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setTableRows(Math.min(Math.max(value, 1), 20));
                }}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Số cột:
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={tableCols}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setTableCols(Math.min(Math.max(value, 1), 10));
                }}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* Preview */}
            <div
              style={{
                marginBottom: "20px",
                padding: "12px",
                backgroundColor: "#f9fafb",
                borderRadius: "4px",
                border: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "8px",
                }}
              >
                Preview: Bảng {tableRows}x{tableCols}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${tableCols}, 1fr)`,
                  gap: "1px",
                  backgroundColor: "#d1d5db",
                }}
              >
                {Array.from({ length: tableRows * tableCols }, (_, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: i < tableCols ? "#e2e8f0" : "#ffffff",
                      padding: "4px 6px",
                      fontSize: "10px",
                      textAlign: "center",
                      minHeight: "20px",
                    }}
                  >
                    {i < tableCols ? "H" : "C"}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowTableModal(false)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  background: "white",
                  color: "#374151",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#9ca3af";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
              >
                Hủy
              </button>
              <button
                onClick={insertTable}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "4px",
                  background: "#3b82f6",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2563eb";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#3b82f6";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Chèn bảng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomReactQuill;

import { useState, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  Save,
  Download,
  Upload,
  FileText,
  Eye,
  Settings,
  Replace,
} from "lucide-react";

interface Document {
  id: number;
  title: string;
  content: string | undefined;
  createdAt: string;
  wordCount: number;
  charCount: number;
}

const MyEditor = () => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [documentTitle, setDocumentTitle] = useState("Untitled Document");
  const [fontSize, setFontSize] = useState(16);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
      Image,
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "<p>Bắt đầu viết nội dung của bạn ở đây...</p>",
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      setWordCount(
        text
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length
      );
      setCharCount(text.length);
    },
  });

  const insertFile = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "*/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const fileUrl = URL.createObjectURL(file);

      if (file.type.startsWith("image/")) {
        editor?.chain().focus().setImage({ src: fileUrl }).run();
      } else {
        const html = `
          <div style="border: 1px solid #e2e8f0; padding: 12px; margin: 12px 0; border-radius: 8px; background: #f8fafc;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">📎</span>
              <div>
                <strong style="color: #1e293b;">${file.name}</strong>
                <div style="font-size: 12px; color: #64748b;">${(file.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>
            <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: none; font-size: 14px;">📥 Tải xuống</a>
          </div>
        `;
        editor?.commands.insertContent(html);
      }
    };

    input.click();
  }, [editor]);

  const insertTable = () => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const saveDocument = () => {
    const content = editor?.getHTML();
    const doc = {
      id: Date.now(),
      title: documentTitle,
      content: content,
      createdAt: new Date().toISOString(),
      wordCount: wordCount,
      charCount: charCount,
    };

    const savedDocs = [...documents, doc];
    setDocuments(savedDocs);

    // Simulate saving (in real app, this would be API call)
    alert(`Đã lưu tài liệu "${documentTitle}" thành công!`);
  };

  const exportAsHTML = () => {
    const content = editor?.getHTML();
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${documentTitle}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>${documentTitle}</h1>
    ${content}
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentTitle}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDocument = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".html,.txt";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const text = await file.text();
      editor?.commands.setContent(text);
      setDocumentTitle(file.name.replace(/\.[^/.]+$/, ""));
    };

    input.click();
  };

  const insertLink = () => {
    const url = window.prompt("Nhập URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  const searchAndReplace = () => {
    if (!searchTerm) return;

    const content = editor?.getHTML();
    if (content && replaceTerm) {
      const newContent = content.replace(
        new RegExp(searchTerm, "gi"),
        replaceTerm
      );
      editor?.commands.setContent(newContent);
      setSearchTerm("");
      setReplaceTerm("");
    }
  };

  interface ToolbarButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
  }

  const ToolbarButton = ({
    onClick,
    active = false,
    children,
    title,
  }: ToolbarButtonProps) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? "text-blue-700 bg-blue-100 border border-blue-300"
          : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="p-4 mx-auto max-w-6xl min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 items-center">
            <FileText className="w-6 h-6 text-blue-600" />
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-xl font-semibold bg-transparent border-none outline-none"
              placeholder="Tên tài liệu"
            />
          </div>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 items-center mb-4">
          <button
            type="button"
            onClick={saveDocument}
            className="flex gap-2 items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Lưu
          </button>
          <button
            type="button"
            onClick={exportAsHTML}
            className="flex gap-2 items-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            Xuất HTML
          </button>
          <button
            type="button"
            onClick={importDocument}
            className="flex gap-2 items-center px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
          >
            <Upload className="w-4 h-4" />
            Nhập
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="p-4 mb-4 bg-gray-50 rounded-lg">
            <h3 className="mb-3 font-semibold">Cài đặt</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block mb-1 text-sm font-medium">Cỡ chữ</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="p-2 w-full rounded-md border"
                >
                  <option value={12}>12px</option>
                  <option value={14}>14px</option>
                  <option value={16}>16px</option>
                  <option value={18}>18px</option>
                  <option value={20}>20px</option>
                  <option value={24}>24px</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Tìm kiếm
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Từ khóa tìm kiếm"
                  className="p-2 w-full rounded-md border"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Thay thế
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replaceTerm}
                    onChange={(e) => setReplaceTerm(e.target.value)}
                    placeholder="Thay thế bằng"
                    className="flex-1 p-2 rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={searchAndReplace}
                    className="px-3 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700"
                  >
                    <Replace className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
          {/* Text Formatting */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBold().run()}
              active={editor?.isActive("bold")}
              title="Đậm"
            >
              <strong>B</strong>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              active={editor?.isActive("italic")}
              title="Nghiêng"
            >
              <em>I</em>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              active={editor?.isActive("underline")}
              title="Gạch chân"
            >
              <u>U</u>
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              active={editor?.isActive("strike")}
              title="Gạch ngang"
            >
              <s>S</s>
            </ToolbarButton>
          </div>

          {/* Headings */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              active={editor?.isActive("heading", { level: 1 })}
              title="Tiêu đề 1"
            >
              H1
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor?.isActive("heading", { level: 2 })}
              title="Tiêu đề 2"
            >
              H2
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={editor?.isActive("heading", { level: 3 })}
              title="Tiêu đề 3"
            >
              H3
            </ToolbarButton>
          </div>

          {/* Lists */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              active={editor?.isActive("bulletList")}
              title="Danh sách có dấu đầu dòng"
            >
              •
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              active={editor?.isActive("orderedList")}
              title="Danh sách có số"
            >
              1.
            </ToolbarButton>
          </div>

          {/* Alignment */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
              active={editor?.isActive({ textAlign: "left" })}
              title="Căn trái"
            >
              ⬅️
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
              active={editor?.isActive({ textAlign: "center" })}
              title="Căn giữa"
            >
              ↔️
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
              active={editor?.isActive({ textAlign: "right" })}
              title="Căn phải"
            >
              ➡️
            </ToolbarButton>
          </div>

          {/* Special Elements */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              active={editor?.isActive("blockquote")}
              title="Trích dẫn"
            >
              💬
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
              active={editor?.isActive("codeBlock")}
              title="Khối code"
            >
              💻
            </ToolbarButton>
            <ToolbarButton onClick={insertLink} title="Chèn liên kết">
              🔗
            </ToolbarButton>
          </div>

          {/* Insert */}
          <div className="flex gap-1 pr-2 border-r border-gray-300">
            <ToolbarButton onClick={insertFile} title="Chèn file/ảnh">
              📎
            </ToolbarButton>
            <ToolbarButton onClick={insertTable} title="Chèn bảng">
              📊
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().setHorizontalRule().run()}
              title="Đường kẻ ngang"
            >
              ➖
            </ToolbarButton>
          </div>

          {/* Actions */}
          <div className="flex gap-1">
            <ToolbarButton
              onClick={() => editor?.chain().focus().undo().run()}
              title="Hoàn tác"
            >
              ↶
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().redo().run()}
              title="Làm lại"
            >
              ↷
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.commands.clearNodes()}
              title="Xóa định dạng"
            >
              🧹
            </ToolbarButton>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="overflow-hidden bg-white rounded-lg shadow-sm">
        <div
          className="p-6 min-h-96 focus-within:ring-2 focus-within:ring-blue-500"
          style={{ fontSize: `${fontSize}px` }}
        >
          {isPreviewMode ? (
            <div
              dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
              className="max-w-none prose"
            />
          ) : (
            <EditorContent
              editor={editor}
              className="max-w-none prose focus:outline-none"
            />
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-4 mt-4 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex gap-4 items-center">
            <span>Từ: {wordCount}</span>
            <span>Ký tự: {charCount}</span>
            <span>Cỡ chữ: {fontSize}px</span>
          </div>
          <div className="flex gap-4 items-center">
            <span>Chế độ: {isPreviewMode ? "Xem trước" : "Chỉnh sửa"}</span>
            <span>Đã lưu: {documents.length} tài liệu</span>
          </div>
        </div>
      </div>

      {/* Saved Documents */}
      {documents.length > 0 && (
        <div className="p-4 mt-4 bg-white rounded-lg shadow-sm">
          <h3 className="mb-3 font-semibold">Tài liệu đã lưu</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-3 rounded-lg border hover:bg-gray-50"
              >
                <h4 className="text-sm font-medium">{doc.title}</h4>
                <p className="text-xs text-gray-600">
                  {doc.wordCount} từ •{" "}
                  {new Date(doc.createdAt).toLocaleDateString("vi-VN")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    editor?.commands.setContent(doc.content || "");
                    setDocumentTitle(doc.title);
                  }}
                  className="mt-1 text-xs text-blue-600 hover:text-blue-800"
                >
                  Mở
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEditor;

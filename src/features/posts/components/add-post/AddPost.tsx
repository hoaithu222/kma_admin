import Modal from "@/foundation/components/modal/Modal";
import { usePost } from "../../hooks/usePost";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Select from "@/foundation/components/inputs/SelectOption";
import Button from "@/foundation/components/buttons/Button";
import Input from "@/foundation/components/inputs/Input";
import SelectMany from "@/foundation/components/inputs/SelectMany";
import UploadImage from "@/foundation/components/upload/UploadImage";
import { categoryOptions, formats, modules, statusOptions } from "./utils";
import Textarea from "@/foundation/components/inputs/TextArea";

export default function AddPost() {
  const { isAddPost, handleAddPost } = usePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [excerpt, setExcerpt] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [status, setStatus] = useState("draft");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setThumbnail(file);
  //     setPreviewUrl(URL.createObjectURL(file));
  //   }
  // };

  const handleSubmit = () => {
    if (!title || !content || !category) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
      .replace(/[èéẹẻẽêềếệểễ]/g, "e")
      .replace(/[ìíịỉĩ]/g, "i")
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
      .replace(/[ùúụủũưừứựửữ]/g, "u")
      .replace(/[ỳýỵỷỹ]/g, "y")
      .replace(/đ/g, "d")
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    const article = {
      title,
      slug,
      content,
      category,
      tags,
      excerpt,
      thumbnail,
      status,
      publishDate: publishDate || new Date().toISOString(),
      seo: {
        title: seoTitle || title,
        description: seoDescription || excerpt,
      },
      createdAt: new Date().toISOString(),
    };

    console.log("Article data:", article);

    // Reset form
    setTitle("");
    setContent("");
    setCategory("");
    setTags([]);
    setExcerpt("");
    setPublishDate("");
    setStatus("draft");
    setThumbnail(null);
    setPreviewUrl(null);
    setSeoTitle("");
    setSeoDescription("");

    handleAddPost(false);
  };

  return (
    <Modal
      size="xlarge"
      isOpen={isAddPost}
      onOpenChange={() => handleAddPost(false)}
      title="Tạo bài viết mới"
      showCloseButton={true}
      closeOnBackdropClick={false}
      backdrop="dark"
      animation="fade"
      className="z-50"
      overlayClassName="z-50"
      contentClassName="z-50 max-h-[90vh]"
      scrollable={true}
    >
      <div className="max-h-[calc(90vh-120px)] overflow-y-auto pr-2">
        <form className="space-y-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <h3 className="pb-2 text-lg font-semibold border-b text-text-primary border-border-primary">
              Thông tin cơ bản
            </h3>

            {/* Tiêu đề */}
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề bài viết..."
              label="Tiêu đề bài viết *"
              fullWidth={true}
              className="text-lg"
            />

            {/* Tóm tắt */}
            <div>
              <label className="block mb-2 text-sm font-medium text-text-secondary">
                Tóm tắt bài viết
              </label>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Viết tóm tắt ngắn gọn về bài viết..."
                className="w-full p-3 border rounded-lg resize-none border-border-primary focus:ring-2 focus:ring-primary focus:border-primary bg-input-bg text-input-text"
                rows={3}
              />
            </div>

            {/* Chuyên mục và Tags */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                options={categoryOptions}
                value={category}
                onChange={setCategory}
                placeholder="Chọn chuyên mục *"
                label="Chuyên mục"
              />

              <SelectMany
                options={[]}
                placeholder="Chọn tags"
                label="Tags"
                value={tags}
                onChange={setTags}
              />
            </div>

            {/* Trạng thái và Ngày xuất bản */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                options={statusOptions}
                value={status}
                onChange={setStatus}
                placeholder="Chọn trạng thái"
                label="Trạng thái"
              />

              {status === "scheduled" && (
                <Input
                  type="datetime-local"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  label="Ngày xuất bản"
                  fullWidth={true}
                />
              )}
            </div>
          </div>

          {/* Ảnh thumbnail */}
          <div className="space-y-4">
            <h3 className="pb-2 text-lg font-semibold border-b text-text-primary border-border-primary">
              Hình ảnh
            </h3>
            <UploadImage
              onChange={(file: any) => {
                setThumbnail(file);
                setPreviewUrl(URL.createObjectURL(file));
              }}
            />
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="object-cover w-full rounded-lg max-h-64"
                />
                <button
                  type="button"
                  onClick={() => {
                    setThumbnail(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute p-1 rounded-full text-text-on-primary bg-error top-2 right-2 hover:bg-error-dark"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* SEO Settings */}
          <div className="space-y-4">
            <Input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder={title || "Tiêu đề SEO..."}
              label="Tiêu đề SEO"
              fullWidth={true}
              helperText={`${seoTitle.length}/60 ký tự`}
            />

            <div>
              <label className="block mb-2 text-sm font-medium text-text-secondary">
                Mô tả SEO
              </label>
              <Textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder={excerpt || "Mô tả ngắn gọn cho SEO..."}
                className="w-full p-3 border rounded-lg resize-none border-border-primary focus:ring-2 focus:ring-primary focus:border-primary bg-input-bg text-input-text"
                rows={3}
                maxLength={160}
              />
              <p className="mt-1 text-sm text-text-muted">
                {seoDescription.length}/160 ký tự
              </p>
            </div>
          </div>

          {/* Nội dung bài viết */}
          <div className="space-y-4">
            <h3 className="pb-2 text-lg font-semibold border-b text-text-primary border-border-primary">
              Nội dung bài viết
            </h3>
            <div className="border rounded-lg border-border-primary bg-background-elevated text-text-primary">
              <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Bắt đầu viết nội dung bài viết của bạn..."
                className="min-h-[300px]"
                style={{ height: "300px" }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 flex justify-end p-4 space-x-3 border-t rounded-b-lg border-border-primary bg-background-elevated text-text-primary">
            <Button variant="outlined" onClick={() => handleAddPost(false)}>
              Hủy
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setStatus("draft");
                handleSubmit();
              }}
            >
              Lưu nháp
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setStatus("published");
                handleSubmit();
              }}
            >
              Xuất bản ngay
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

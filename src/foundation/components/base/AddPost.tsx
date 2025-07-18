import Modal from "@/foundation/components/modal/Modal";
import { useState } from "react";

import Button from "@/foundation/components/buttons/Button";
import Input from "@/foundation/components/inputs/Input";
import UploadImage from "@/foundation/components/upload/UploadImage";
import { uploadFileFromQuill } from "@/shared/utils/fileUploadHelper";

import Textarea from "@/foundation/components/inputs/TextArea";

import { IRequestAddArticle } from "@/core/api/posts/types";
import UploadFile from "@/foundation/components/upload/UploadFile";

import { FaEye } from "react-icons/fa";
import CustomSwitch from "@/foundation/components/inputs/CustomSwitch";
import { ReduxStateType } from "@/app/store/types";
import { toast } from "react-toastify";
import CustomReactQuill from "@/foundation/components/inputs/CustomReactQuill";
import { useBase } from "./hooks/useBase";

interface FormData extends Omit<IRequestAddArticle, "tagIds"> {
  tagIds: string[];
}

interface AddPropPost {
  categoryId: number;
  subCategoryId: number;
}
export default function AddPost({ categoryId, subCategoryId }: AddPropPost) {
  const {
    isAddPost,
    handleAddPost,
    handleAddArticle,
    statusAddPost,
    filter,
    handleGetArticle,
  } = useBase();
  console.log(categoryId);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    categoryId: subCategoryId,
    // subCategoryId: subCategoryId,
    tagIds: [],
    isPrivate: false,
    status: "draft",
    description: "",
    summary: "",
    thumbnailId: 0,
    fileIds: [],
  });

  const handleSubmit = (status: "draft" | "published") => {
    if (!formData.title) {
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    if (!formData.thumbnailId) {
      toast.error("Vui lòng tải lên hình ảnh");
      return;
    }

    const submitData: IRequestAddArticle = {
      ...formData,
      tagIds: formData.tagIds.map((id) => parseInt(id)),
      status: status,
    };

    handleAddArticle(submitData);
    if (statusAddPost === ReduxStateType.SUCCESS) {
      handleAddPost(false);
      handleGetArticle(filter);
    }
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
      contentClassName="z-50 max-h-[90vh] hidden-scrollbar"
      scrollable={true}
    >
      <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-2 hidden-scrollbar">
        <form className="space-y-3">
          {/* Thông tin cơ bản */}
          <div className="space-y-3">
            <h3 className="pb-1 text-base font-semibold border-b text-text-primary border-border-primary">
              Thông tin cơ bản
            </h3>

            {/* Tiêu đề */}
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Nhập tiêu đề bài viết..."
              label="Tiêu đề bài viết *"
              fullWidth={true}
              className="text-base"
            />

            {/* Mô tả  */}
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Viết mô tả ngắn gọn về bài viết..."
              label="Mô tả"
              fullWidth={true}
            />
          </div>
          {/* Kết luận */}
          <div>
            <label className="block mb-1 text-sm font-medium text-text-secondary">
              Kết luận
            </label>
            <Textarea
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              placeholder="Viết tóm tắt ngắn gọn về bài viết..."
              fullWidth={true}
            />
          </div>
          {/* Ảnh thumbnail */}
          <div className="space-y-3">
            <h3 className="pb-1 text-base font-semibold border-b text-text-primary border-border-primary">
              Hình ảnh
            </h3>
            <UploadImage
              onChange={(file: any) => {
                setFormData({ ...formData, thumbnailId: file.id });
              }}
              onUploadComplete={(response: any) => {
                setFormData({ ...formData, thumbnailId: response.id });
              }}
              enableEditor={true}
              editorOptions={{
                allowCrop: true,
                allowRotate: true,
                allowFlip: true,
                allowZoom: true,
              }}
            />
          </div>
          {/* upload file */}
          <div className="space-y-3">
            <h3 className="pb-1 text-base font-semibold border-b text-text-primary border-border-primary">
              Tải lên file
            </h3>
            <UploadFile
              onChange={(fileId: number) => {
                setFormData((prev) => ({
                  ...prev,
                  fileIds: [...prev.fileIds, fileId],
                }));
              }}
              onUploadComplete={(response) => {
                setFormData((prev) => ({
                  ...prev,
                  fileIds: [...prev.fileIds, response.id],
                }));
              }}
              onError={(error) => {
                console.error("File upload error:", error);
              }}
              multiple={true}
              maxFiles={5}
              maxSize={50 * 1024 * 1024} // 50MB
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
              label="Tài liệu đính kèm"
              description="Tải lên các file tài liệu liên quan đến bài viết"
            />
          </div>
          {/* Ẩn hiện bài viết */}
          <div className="space-y-3">
            <h3 className="pb-1 text-base font-semibold border-b text-text-primary border-border-primary">
              Ẩn danh
            </h3>
            <CustomSwitch
              checked={formData.isPrivate}
              onChange={(checked) => {
                setFormData({
                  ...formData,
                  isPrivate: checked,
                });
              }}
              label="Ẩn danh"
              description="Đăng với chế độ ẩn danh"
              size="md"
              variant="default"
              disabled={false}
              icon={<FaEye />}
              className="w-full"
            />
          </div>
          {/* Nội dung bài viết */}
          <div className="space-y-3">
            <h3 className="pb-1 text-base font-semibold border-b text-text-primary border-border-primary">
              Nội dung bài viết
            </h3>
            <div className="rounded-lg border border-border-primary bg-background-elevated text-text-primary">
              <CustomReactQuill
                value={formData.content}
                onChange={(value) => {
                  setFormData({ ...formData, content: value });
                }}
                placeholder="Viết nội dung bài viết..."
                uploadFunction={uploadFileFromQuill}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="relative h-6">
            <div className="flex fixed right-0 bottom-0 left-0 justify-end p-2 space-x-3 rounded-b-lg text-text-primary bg-background-elevated">
              <Button variant="outlined" onClick={() => handleAddPost(false)}>
                Hủy
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setFormData({ ...formData, status: "draft" });
                  handleSubmit("draft");
                }}
              >
                Lưu nháp
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setFormData({ ...formData, status: "published" });
                  handleSubmit("published");
                }}
              >
                Xuất bản ngay
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

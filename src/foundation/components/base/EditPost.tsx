import Modal from "@/foundation/components/modal/Modal";
import { useState, useEffect } from "react";

import Button from "@/foundation/components/buttons/Button";
import Input from "@/foundation/components/inputs/Input";
import UploadImage from "@/foundation/components/upload/UploadImage";

import Textarea from "@/foundation/components/inputs/TextArea";
import { useBase } from "./hooks/useBase";
import {
  IRequestAddArticle,
  IRequestUpdateArticle,
  ResponseAddArticle,
} from "@/core/api/posts/types";
import UploadFile from "@/foundation/components/upload/UploadFile";

import { ReduxStateType } from "@/app/store/types";
import { toast } from "react-toastify";
import CustomReactQuill from "@/foundation/components/inputs/CustomReactQuill";
import { uploadFileFromQuill } from "@/shared/utils/fileUploadHelper";
import { Post } from "./slice/base-post.types";

interface FormData extends Omit<IRequestAddArticle, "tagIds"> {
  tagIds: string[];
}
export interface EditPostsProps {
  post: Post | ResponseAddArticle;
}

export default function EditPosts({ post }: EditPostsProps) {
  const {
    isEditPost,
    handleGetCategoryAndSubCategory,
    handleEditPost,
    handleGetSubCategories,
    handleSetIsEditPost,
    handleGetArticle,
    statusEditPost,
    filter,
  } = useBase();

  const [formData, setFormData] = useState<FormData>({
    title: post.title,
    content: post.content,
    categoryId: post.categoryId,
    subCategoryId: post.subCategoryId || null,
    tagIds: post.tag.map((tag: any) => tag.id.toString()),
    isPrivate: post.isPrivate,
    status: post.status as "draft" | "published",
    description: post.description,
    summary: post.summary,
    thumbnailId: +post.thumbnail,
    fileIds: post.files.map((file: any) => file.id),
  });

  useEffect(() => {
    if (formData.categoryId) {
      handleGetSubCategories(formData.categoryId as number);
    }
  }, [formData.categoryId]);

  const handleSubmit = (status: "draft" | "published") => {
    if (!formData.title) {
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return;
    }

    const submitData: IRequestUpdateArticle = {
      ...formData,
      categoryId: formData.categoryId as number,
      tagIds: formData.tagIds.map((id) => parseInt(id)),
      thumbnail: formData.thumbnailId.toString(),
      files: formData.fileIds.map((id) => id.toString()),
      subCategoryId: formData.subCategoryId || null,
      status: status,
    };
    handleEditPost(submitData);
    if (statusEditPost === ReduxStateType.SUCCESS) {
      handleSetIsEditPost(false);
      handleGetArticle(filter);
    }
  };

  useEffect(() => {
    handleGetCategoryAndSubCategory();
  }, []);

  return (
    <Modal
      size="xlarge"
      isOpen={isEditPost}
      onOpenChange={() => handleSetIsEditPost(false)}
      title="Sửa bài viết"
      showCloseButton={true}
      closeOnBackdropClick={false}
      backdrop="dark"
      animation="fade"
      className="z-50"
      overlayClassName="z-50"
      contentClassName="z-50 max-h-[90vh] hidden-scrollbar"
      scrollable={false}
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
              isEdit={true}
              value={[
                {
                  id: post.thumbnailUrl,
                  url: post.thumbnailUrl,
                  name: post.thumbnailUrl,
                  filePath: post.thumbnailUrl,
                },
              ]}
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
              isEdit={true}
              value={
                post?.files?.map((file: any) => ({
                  id: file.id,
                  url: file.filePath,
                  name: file.fileName,
                  filePath: file.filePath,
                })) || []
              }
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
              maxSize={50 * 1024 * 1024}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
              label="Tài liệu đính kèm"
              description="Tải lên các file tài liệu liên quan đến bài viết"
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
              <Button
                variant="outlined"
                onClick={() => handleSetIsEditPost(false)}
              >
                Hủy
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  handleSubmit("draft");
                }}
              >
                Lưu nháp
              </Button>
              <Button
                variant="primary"
                onClick={() => {
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

import Modal from "@/foundation/components/modal/Modal";
import { usePost } from "../../hooks/usePost";
import { useState, useEffect } from "react";

import Select from "@/foundation/components/inputs/SelectOption";
import Button from "@/foundation/components/buttons/Button";
import Input from "@/foundation/components/inputs/Input";
import SelectMany from "@/foundation/components/inputs/SelectMany";
import UploadImage from "@/foundation/components/upload/UploadImage";

import Textarea from "@/foundation/components/inputs/TextArea";

import { useSelector } from "react-redux";
import { selectCategories } from "@/features/category/slice/category.selector";
import { subCategoriesWithCategoryIdSelector } from "@/features/subcategory/slice/subcategory.selector";
import {
  IRequestAddArticle,
  IRequestUpdateArticle,
  ResponseAddArticle,
} from "@/core/api/posts/types";
import UploadFile from "@/foundation/components/upload/UploadFile";
import { selectTags } from "@/features/tags/slice/tag.selector";
import {
  FaSun,
  FaMoon,
  FaStar,
  FaHeart,
  FaTag,
  FaBookmark,
  FaFlag,
  FaFire,
  FaLeaf,
  FaRocket,
} from "react-icons/fa";
import { ReduxStateType } from "@/app/store/types";
import { toast } from "react-toastify";
import CustomReactQuill from "@/foundation/components/inputs/CustomReactQuill";
import { uploadFileFromQuill } from "@/shared/utils/fileUploadHelper";

interface FormData extends Omit<IRequestAddArticle, "tagIds"> {
  tagIds: string[];
}
export interface EditPostsProps {
  post: ResponseAddArticle;
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
  } = usePost();

  const categories = useSelector(selectCategories);
  const subCategoriesWithCategoryId = useSelector(
    subCategoriesWithCategoryIdSelector
  );

  const tags = useSelector(selectTags);
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
    if (!formData.categoryId || formData?.categoryId === "0") {
      toast.error("Vui lòng chọn chuyên mục");
      return;
    }
    if (!formData.subCategoryId || formData?.subCategoryId === "0") {
      toast.error("Vui lòng chọn chuyên mục con");
      return;
    }

    const submitData: IRequestUpdateArticle = {
      ...formData,
      categoryId: formData.categoryId,
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

  // Add this function to get random icon
  const getRandomIcon = (id: number) => {
    const icons = [
      <FaSun key="sun" className="text-yellow-500" />,
      <FaMoon key="moon" className="text-blue-500" />,
      <FaStar key="star" className="text-yellow-400" />,
      <FaHeart key="heart" className="text-red-500" />,
      <FaTag key="tag" className="text-green-500" />,
      <FaBookmark key="bookmark" className="text-purple-500" />,
      <FaFlag key="flag" className="text-red-600" />,
      <FaFire key="fire" className="text-orange-500" />,
      <FaLeaf key="leaf" className="text-emerald-500" />,
      <FaRocket key="rocket" className="text-indigo-500" />,
    ];
    return icons[id % icons.length];
  };

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

            {/* Chuyên mục và Tags */}
            <div className="grid grid-cols-1 gap-3">
              <Select
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                value={formData.categoryId?.toString()}
                defaultValue={formData.categoryId?.toString()}
                onChange={(value: any) =>
                  setFormData({
                    ...formData,
                    categoryId: +value,
                    subCategoryId: subCategoriesWithCategoryId[0]?.id,
                  })
                }
                placeholder="Chọn chuyên mục *"
                label="Chuyên mục"
                fullWidth={true}
              />

              {formData.categoryId && (
                <Select
                  options={subCategoriesWithCategoryId.map((subCategory) => ({
                    value: subCategory.id,
                    label: subCategory.name,
                  }))}
                  value={formData.subCategoryId?.toString() || ""}
                  defaultValue={formData.subCategoryId?.toString()}
                  onChange={(value: any) =>
                    setFormData({
                      ...formData,
                      subCategoryId: +value,
                    })
                  }
                  placeholder="Chọn chuyên mục con"
                  label="Chuyên mục con"
                  fullWidth={true}
                />
              )}

              <SelectMany
                options={tags.map((tag) => ({
                  value: tag.id.toString(),
                  label: tag.name,
                  icon: getRandomIcon(tag.id),
                }))}
                placeholder="Chọn tags"
                label="Tags"
                value={formData.tagIds}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    tagIds: value,
                  }));
                }}
                searchable
                showSelectAll
                clearable
                maxSelections={4}
              />
            </div>
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

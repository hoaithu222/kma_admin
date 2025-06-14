import Modal from "@/foundation/components/modal/Modal";
import { usePost } from "../../hooks/usePost";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
import { formats, modules } from "../../../../shared/utils/utilsReactQuill";
import { ReduxStateType } from "@/app/store/types";
import { toast } from "react-toastify";

interface FormData extends Omit<IRequestAddArticle, "tagIds"> {
  tagIds: string[];
}
export interface EditPostsProps {
  post: ResponseAddArticle;
}

export default function EditPosts({ post }: EditPostsProps) {
  const {
    isEditPost,
    handleAddPost,
    handleGetCategoryAndSubCategory,
    handleEditPost,
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
        <form className="space-y-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            <h3 className="pb-2 text-lg font-semibold border-b text-text-primary border-border-primary">
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
              className="text-lg"
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
            <div className="grid grid-cols-1 gap-4 ">
              <Select
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                value={formData.categoryId?.toString()}
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

              {formData.categoryId && formData?.categoryId !== "0" && (
                <Select
                  options={subCategoriesWithCategoryId.map((subCategory) => ({
                    value: subCategory.id,
                    label: subCategory.name,
                  }))}
                  value={formData.subCategoryId || ""}
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
            <label className="block mb-2 text-sm font-medium text-text-secondary">
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
          <div className="space-y-4">
            <h3 className="pb-2 text-lg font-semibold border-b text-text-primary border-border-primary">
              Hình ảnh
            </h3>
            <UploadImage
              onChange={(file: any) => {
                setFormData({ ...formData, thumbnailId: file.id });
              }}
              onUploadComplete={(response: any) => {
                setFormData({ ...formData, thumbnailId: response.id });
              }}
            />
          </div>
          {/* upload file */}
          <div className="space-y-4">
            <h3 className="pb-2 text-lg font-semibold border-b text-text-primary border-border-primary">
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
              maxSize={50 * 1024 * 1024}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
              label="Tài liệu đính kèm"
              description="Tải lên các file tài liệu liên quan đến bài viết"
            />
          </div>

          {/* Nội dung bài viết */}
          <div className="space-y-4">
            <h3 className="pb-2 text-lg font-semibold border-b text-text-primary border-border-primary">
              Nội dung bài viết
            </h3>
            <div className="border rounded-lg border-border-primary bg-background-elevated text-text-primary">
              <ReactQuill
                value={formData.content}
                onChange={(value: any) =>
                  setFormData({ ...formData, content: value })
                }
                modules={modules}
                formats={formats}
                placeholder="Bắt đầu viết nội dung bài viết của bạn..."
                className="min-h-[600px] "
                style={{ height: "600px" }}
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
        </form>
      </div>
    </Modal>
  );
}

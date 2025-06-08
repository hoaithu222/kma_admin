import Modal from "@/foundation/components/modal/Modal";
import { useLecturer } from "../../hooks/useLecturer";
import Input from "@/foundation/components/inputs/Input";

import Button from "@/foundation/components/buttons/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "@/foundation/components/inputs/SelectOption";
import { useEffect, useState } from "react";
import { IRequestCreateLecturer } from "@/core/api/lecturer/types";
import { useMajor } from "@/features/major/hooks/useMajor";
import useSubmajor from "@/features/submajor/hooks/useSubmajor";
import UploadImage from "@/foundation/components/upload/UploadImage";
import { formats, modules } from "@/shared/utils/utilsReactQuill";
import { toast } from "react-toastify";
import { dataLecturer } from "@/core/api/lecturer/types";

interface EditLecturerProps {
  lecturer: dataLecturer;
}
export default function EditLecturer({ lecturer }: EditLecturerProps) {
  const { isEditLecturer, handleChangeEditLecturer, editLecturer } =
    useLecturer();
  const { majorData, getMajors } = useMajor();
  const { subMajorWithMajor, getSubMajorWithMajor } = useSubmajor();

  const [activeTab, setActiveTab] = useState("bio");

  const [formData, setFormData] = useState<IRequestCreateLecturer>({
    name: lecturer.name,
    photoId: lecturer.photoId,
    title: lecturer.title,
    email: lecturer.email,
    bio: lecturer.bio, // giới thiệu
    position: lecturer.position, // chức vụ
    awards: lecturer.awards, // giải thưởng
    education: lecturer.education, // học vấn
    teachingAreas: lecturer.teachingAreas, // lĩnh vực giảng dạy
    scientificWorks: lecturer.scientificWorks, // công trình khoa học
    researchInterests: lecturer.researchInterests, // lĩnh vực nghiên cứu
    majorId: lecturer.majorId,
    subMajorId: lecturer.subMajorId,
  });

  const tabs = [
    {
      id: "bio",
      name: "Giới thiệu",
      field: "bio",
    },
    {
      id: "awards",
      name: "Giải thưởng",
      field: "awards",
    },
    {
      id: "position",
      name: "Chức danh",
      field: "position",
    },
    {
      id: "education",
      name: "Học vấn",
      field: "education",
    },
    {
      id: "teachingAreas",
      name: "Lĩnh vực giảng dạy",
      field: "teachingAreas",
    },
    {
      id: "scientificWorks",
      name: "Công trình khoa học",
      field: "scientificWorks",
    },
    {
      id: "researchInterests",
      name: "Lĩnh vực nghiên cứu",
      field: "researchInterests",
    },
  ];

  const handleContentChange = (value: string) => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    if (currentTab) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [currentTab.field]: value,
      }));
    }
  };

  const getCurrentContent = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    if (currentTab) {
      return formData[currentTab.field as keyof typeof formData] as string;
    }
    return "";
  };

  // Tách riêng effect cho getMajors
  useEffect(() => {
    getMajors();
  }, []);

  // Effect riêng cho việc set default majorId khi majorData thay đổi
  useEffect(() => {
    if (majorData && majorData.length > 0 && formData.majorId === 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        majorId: majorData[0].id,
      }));
    }
  }, [majorData]);

  // Effect cho việc load submajor khi majorId thay đổi
  useEffect(() => {
    if (formData.majorId && formData.majorId > 0) {
      getSubMajorWithMajor(formData.majorId);
    }
  }, [formData.majorId]);

  // Effect để set default subMajorId khi subMajorWithMajor thay đổi
  useEffect(() => {
    if (
      subMajorWithMajor &&
      subMajorWithMajor.length > 0 &&
      formData.subMajorId === 0
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        subMajorId: subMajorWithMajor[0].id,
      }));
    }
  }, [subMajorWithMajor]);

  const handleSubmit = () => {
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.majorId === 0
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    editLecturer({
      id: lecturer.id as number,
      name: formData.name,
      photoId: formData.photoId,
      title: formData.title,
      email: formData.email,
      bio: formData.bio,
      position: formData.position,
      awards: formData.awards,
      education: formData.education,
      teachingAreas: formData.teachingAreas,
      scientificWorks: formData.scientificWorks,
      researchInterests: formData.researchInterests,
      majorId: formData.majorId,
      subMajorId: formData.subMajorId as number,
    });
  };

  return (
    <Modal
      size="xlarge"
      isOpen={isEditLecturer}
      onOpenChange={() => handleChangeEditLecturer(false)}
      title="Chỉnh sửa giảng viên"
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
        <form className="space-y-4">
          {/* Thông tin cơ bản */}
          <div className="space-y-4">
            {/* Họ tên */}
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  title: e.target.value,
                }))
              }
              placeholder="Nhập tiêu đề..."
              label="Tiêu đề"
              fullWidth={true}
              className="text-lg"
            />
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  name: e.target.value,
                }))
              }
              placeholder="Nhập họ tên..."
              label="Họ tên *"
              fullWidth={true}
              className="text-lg"
            />

            <Input
              value={formData.email}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  email: e.target.value,
                }))
              }
              placeholder="Nhập email..."
              label="Email *"
              fullWidth={true}
              className="text-lg"
            />

            {/* Chuyên ngành và chuyên ngành con */}
            <div className="grid grid-cols-1 gap-4">
              <Select
                options={majorData.map((major: any) => ({
                  value: major.id,
                  label: major.name,
                }))}
                value={formData.majorId}
                onChange={(value: any) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    majorId: value,
                    subMajorId: 0, // Reset subMajorId khi đổi majorId
                  }));
                }}
                placeholder="Chọn chuyên ngành *"
                label="Chuyên ngành"
                fullWidth={true}
              />

              {formData.majorId > 0 &&
                subMajorWithMajor &&
                subMajorWithMajor.length > 0 && (
                  <Select
                    options={subMajorWithMajor.map((subMajor: any) => ({
                      value: subMajor.id,
                      label: subMajor.name,
                    }))}
                    value={formData.subMajorId || undefined}
                    onChange={(value: any) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        subMajorId: +value,
                      }))
                    }
                    placeholder="Chọn chuyên ngành con"
                    label="Chuyên ngành con"
                    fullWidth={true}
                  />
                )}
            </div>
          </div>

          {/* Ảnh tải lên */}
          <div className="space-y-4">
            <h3 className="pb-2 text-lg font-semibold border-b text-text-primary border-border-primary">
              Ảnh đại diện
            </h3>
            <UploadImage
              onChange={(file: any) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  photoId: file.id,
                }));
              }}
              onUploadComplete={(response: any) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  photoId: response.id,
                }));
              }}
            />
          </div>

          {/* Tab navigation và nội dung */}
          <div className="space-y-4">
            <h3 className="pb-2 text-lg font-semibold border-b text-text-primary border-border-primary">
              Thông tin chi tiết
            </h3>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 p-1 border rounded-lg bg-background-elevated border-border-primary">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-sm"
                      : "text-text-secondary hover:text-text-primary hover:bg-background-hover"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="border rounded-lg border-border-primary bg-background-elevated text-text-primary">
              <ReactQuill
                key={activeTab} // Thêm key để force re-render khi đổi tab
                value={getCurrentContent()}
                onChange={handleContentChange}
                modules={modules}
                formats={formats}
                placeholder={`Nhập ${tabs.find((tab) => tab.id === activeTab)?.name.toLowerCase()}...`}
                className="min-h-[400px] hidden-scrollbar mb-10"
                style={{ height: "400px" }}
              />
            </div>

            {/* Tab indicator - hiển thị tab nào đã có nội dung */}
            <div className="flex flex-wrap items-center gap-2 py-4 mt-5 text-sm">
              <span className="mr-2 text-text-secondary">
                Trạng thái hoàn thành:
              </span>
              {tabs.map((tab) => {
                const hasContent = formData[
                  tab.field as keyof typeof formData
                ] as string;
                const isCompleted =
                  hasContent &&
                  hasContent.trim() &&
                  hasContent !== "<p><br></p>";
                return (
                  <div
                    key={tab.id}
                    className={`px-2 py-1 rounded ${
                      isCompleted
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {tab.name}
                    {isCompleted && <span className="ml-1">✓</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 flex justify-end p-2 space-x-3 rounded-b-lg text-text-primary bg-background-elevated">
            <Button
              variant="outlined"
              onClick={() => handleChangeEditLecturer(false)}
            >
              Hủy
            </Button>

            <Button variant="primary" onClick={handleSubmit}>
              Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

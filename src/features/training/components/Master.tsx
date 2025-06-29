import React, { useState, useEffect } from "react";
import {
  Edit3,
  Save,
  X,
  Send,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Target,
  FileText,
  Shield,
  Code,
  Network,
  MessageSquare,
} from "lucide-react";
import masterProgram from "../data/masterProgram.json";

// TypeScript interfaces
interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

interface ProgramSection {
  title: string;
  bachelor: string;
  engineer: string;
  details_link: string;
}

interface UndergraduatePrograms {
  title: string;
  introduction: string;
  information_security: ProgramSection;
  information_technology: ProgramSection;
  electronics_telecommunications: ProgramSection;
}

interface MasterProgramData {
  admission_contact: {
    title: string;
    info: string;
  };
  undergraduate_programs: UndergraduatePrograms;
  master_program_information_security: any; // Complex nested structure
}

const Master = () => {
  const initialMasterProgramData = masterProgram as MasterProgramData;
  const [data, setData] = useState<MasterProgramData>(initialMasterProgramData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    const isChanged =
      JSON.stringify(data) !== JSON.stringify(initialMasterProgramData);
    setHasChanges(isChanged);
  }, [data]);

  // Editable Text Component
  const EditableText: React.FC<EditableTextProps> = ({
    value,
    onChange,
    multiline = false,
    placeholder = "",
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleSave = () => {
      onChange(tempValue);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setTempValue(value);
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="space-y-2">
          {multiline ? (
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full p-3 border-2 border-secondary focus:border-primary focus:outline-none resize-none min-h-[120px] bg-background-elevated text-text-primary rounded-lg"
              placeholder={placeholder}
            />
          ) : (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="p-3 w-full rounded-lg border-2 text-text-primary bg-background-elevated border-secondary focus:border-primary focus:outline-none"
              placeholder={placeholder}
            />
          )}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex gap-1 items-center px-3 py-1 text-white rounded-md transition-colors bg-success hover:bg-success-dark"
            >
              <Save size={16} />
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="flex gap-1 items-center px-3 py-1 text-white rounded-md transition-colors bg-text-muted hover:bg-text-secondary"
            >
              <X size={16} />
              Hủy
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="relative group">
        <div
          className={`${multiline ? "whitespace-pre-wrap" : ""} ${!value ? "italic text-text-muted" : "text-text-primary"}`}
        >
          {value || placeholder}
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -top-2 -right-2 p-1 text-white rounded-full opacity-0 transition-opacity bg-secondary group-hover:opacity-100 hover:bg-secondary-dark"
        >
          <Edit3 size={14} />
        </button>
      </div>
    );
  };

  // Update functions
  const updateAdmissionContact = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      admission_contact: {
        ...prev.admission_contact,
        [field]: value,
      },
    }));
  };

  const updateUndergraduatePrograms = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      undergraduate_programs: {
        ...prev.undergraduate_programs,
        [field]: value,
      },
    }));
  };

  const updateProgramSection = (
    section: keyof UndergraduatePrograms,
    field: keyof ProgramSection,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      undergraduate_programs: {
        ...prev.undergraduate_programs,
        [section]: {
          ...(prev.undergraduate_programs[section] as ProgramSection),
          [field]: value,
        },
      },
    }));
  };

  // const updateMasterProgram = (
  //   section: string,
  //   subsection: string,
  //   field: string,
  //   value: string
  // ) => {
  //   setData((prev) => ({
  //     ...prev,
  //     master_program_information_security: {
  //       ...prev.master_program_information_security,
  //       [section]: {
  //         ...prev.master_program_information_security[section],
  //         [subsection]:
  //           typeof prev.master_program_information_security[section][
  //             subsection
  //           ] === "object"
  //             ? {
  //                 ...prev.master_program_information_security[section][
  //                   subsection
  //                 ],
  //                 [field]: value,
  //               }
  //             : value,
  //       },
  //     },
  //   }));
  // };

  const updateMasterProgramDirect = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      master_program_information_security: {
        ...prev.master_program_information_security,
        [field]: value,
      },
    }));
  };

  // const updateLearningOutcomes = (
  //   section: string,
  //   field: string,
  //   value: string
  // ) => {
  //   setData((prev) => ({
  //     ...prev,
  //     master_program_information_security: {
  //       ...prev.master_program_information_security,
  //       learning_outcomes: {
  //         ...prev.master_program_information_security.learning_outcomes,
  //         [section]: {
  //           ...prev.master_program_information_security.learning_outcomes[
  //             section
  //           ],
  //           [field]: value,
  //         },
  //       },
  //     },
  //   }));
  // };

  // Submit to server
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/master-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error saving data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setData(initialMasterProgramData);
    setSubmitStatus(null);
  };

  return (
    <div className="min-h-screen bg-background-base">
      {/* Header */}
      <div className="border-b shadow-lg bg-card-bg border-border-primary">
        <div className="px-6 py-6 mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br rounded-xl shadow-lg from-primary to-primary-dark">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Quản lý chương trình đào tạo Thạc sĩ
                </h3>
                <p className="text-text-secondary">
                  Chỉnh sửa thông tin chương trình đào tạo An toàn thông tin
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              {hasChanges && (
                <span className="flex gap-1 items-center px-3 py-1 text-sm font-medium rounded-full text-warning bg-warning/10">
                  <AlertCircle size={14} />
                  Có thay đổi chưa lưu
                </span>
              )}

              <button
                onClick={handleReset}
                className="flex gap-2 items-center px-4 py-2 rounded-lg border transition-all text-text-secondary bg-card-bg border-border-primary hover:bg-background-muted hover:shadow-md"
                disabled={isSubmitting}
              >
                <RefreshCw size={16} />
                Reset
              </button>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !hasChanges}
                className="flex gap-2 items-center px-6 py-2 text-white bg-gradient-to-r rounded-lg shadow-lg transition-all from-primary to-primary-dark hover:from-primary-dark hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
              >
                {isSubmitting ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="flex gap-2 items-center p-4 mt-4 rounded-lg border shadow-sm text-success bg-success/10 border-success/20">
              <CheckCircle size={16} />
              Dữ liệu đã được lưu thành công!
            </div>
          )}

          {submitStatus === "error" && (
            <div className="flex gap-2 items-center p-4 mt-4 rounded-lg border shadow-sm text-error bg-error/10 border-error/20">
              <AlertCircle size={16} />
              Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-8 mx-auto space-y-8 max-w-7xl">
        {/* Admission Contact Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-secondary via-secondary-dark to-primary">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Thông tin tuyển sinh</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-secondary" />
                Tiêu đề
              </h3>
              <EditableText
                value={data.admission_contact.title}
                onChange={(value) => updateAdmissionContact("title", value)}
                placeholder="Nhập tiêu đề..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <MessageSquare size={20} className="text-secondary" />
                Thông tin chi tiết
              </h3>
              <EditableText
                value={data.admission_contact.info}
                onChange={(value) => updateAdmissionContact("info", value)}
                multiline={true}
                placeholder="Nhập thông tin chi tiết..."
              />
            </div>
          </div>
        </div>

        {/* Undergraduate Programs Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-success via-success-dark to-accent">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Chương trình đại học</h2>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Target size={20} className="text-success" />
                Tiêu đề chương trình
              </h3>
              <EditableText
                value={data.undergraduate_programs.title}
                onChange={(value) =>
                  updateUndergraduatePrograms("title", value)
                }
                placeholder="Nhập tiêu đề..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-success" />
                Giới thiệu
              </h3>
              <EditableText
                value={data.undergraduate_programs.introduction}
                onChange={(value) =>
                  updateUndergraduatePrograms("introduction", value)
                }
                multiline={true}
                placeholder="Nhập giới thiệu..."
              />
            </div>

            {/* Information Security Program */}
            <div className="p-6 bg-gradient-to-r rounded-xl border from-secondary/10 to-primary/10 border-secondary/20">
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Shield size={20} className="text-secondary" />
                Chương trình An toàn thông tin
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    Tiêu đề:
                  </label>
                  <EditableText
                    value={
                      data.undergraduate_programs.information_security.title
                    }
                    onChange={(value) =>
                      updateProgramSection(
                        "information_security",
                        "title",
                        value
                      )
                    }
                    placeholder="Nhập tiêu đề..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    Cử nhân:
                  </label>
                  <EditableText
                    value={
                      data.undergraduate_programs.information_security.bachelor
                    }
                    onChange={(value) =>
                      updateProgramSection(
                        "information_security",
                        "bachelor",
                        value
                      )
                    }
                    multiline={true}
                    placeholder="Nhập thông tin cử nhân..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    Kỹ sư:
                  </label>
                  <EditableText
                    value={
                      data.undergraduate_programs.information_security.engineer
                    }
                    onChange={(value) =>
                      updateProgramSection(
                        "information_security",
                        "engineer",
                        value
                      )
                    }
                    multiline={true}
                    placeholder="Nhập thông tin kỹ sư..."
                  />
                </div>
              </div>
            </div>

            {/* Information Technology Program */}
            <div className="p-6 bg-gradient-to-r rounded-xl border from-accent/10 to-warning/10 border-accent/20">
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Code size={20} className="text-accent" />
                Chương trình Công nghệ thông tin
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    Tiêu đề:
                  </label>
                  <EditableText
                    value={
                      data.undergraduate_programs.information_technology.title
                    }
                    onChange={(value) =>
                      updateProgramSection(
                        "information_technology",
                        "title",
                        value
                      )
                    }
                    placeholder="Nhập tiêu đề..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    Cử nhân:
                  </label>
                  <EditableText
                    value={
                      data.undergraduate_programs.information_technology
                        .bachelor
                    }
                    onChange={(value) =>
                      updateProgramSection(
                        "information_technology",
                        "bachelor",
                        value
                      )
                    }
                    multiline={true}
                    placeholder="Nhập thông tin cử nhân..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    Kỹ sư:
                  </label>
                  <EditableText
                    value={
                      data.undergraduate_programs.information_technology
                        .engineer
                    }
                    onChange={(value) =>
                      updateProgramSection(
                        "information_technology",
                        "engineer",
                        value
                      )
                    }
                    multiline={true}
                    placeholder="Nhập thông tin kỹ sư..."
                  />
                </div>
              </div>
            </div>

            {/* Electronics Telecommunications Program */}
            <div className="p-6 bg-gradient-to-r rounded-xl border from-warning/10 to-error/10 border-warning/20">
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Network size={20} className="text-warning" />
                Chương trình Điện tử viễn thông
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    Tiêu đề:
                  </label>
                  <EditableText
                    value={
                      data.undergraduate_programs.electronics_telecommunications
                        .title
                    }
                    onChange={(value) =>
                      updateProgramSection(
                        "electronics_telecommunications",
                        "title",
                        value
                      )
                    }
                    placeholder="Nhập tiêu đề..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    Cử nhân:
                  </label>
                  <EditableText
                    value={
                      data.undergraduate_programs.electronics_telecommunications
                        .bachelor
                    }
                    onChange={(value) =>
                      updateProgramSection(
                        "electronics_telecommunications",
                        "bachelor",
                        value
                      )
                    }
                    multiline={true}
                    placeholder="Nhập thông tin cử nhân..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    Kỹ sư:
                  </label>
                  <EditableText
                    value={
                      data.undergraduate_programs.electronics_telecommunications
                        .engineer
                    }
                    onChange={(value) =>
                      updateProgramSection(
                        "electronics_telecommunications",
                        "engineer",
                        value
                      )
                    }
                    multiline={true}
                    placeholder="Nhập thông tin kỹ sư..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Program Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-primary via-primary-dark to-error">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">
                Chương trình Thạc sĩ An toàn thông tin
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Target size={20} className="text-primary" />
                Tiêu đề chương trình
              </h3>
              <EditableText
                value={data.master_program_information_security.program_title}
                onChange={(value) =>
                  updateMasterProgramDirect("program_title", value)
                }
                placeholder="Nhập tiêu đề chương trình..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-primary" />
                Chuyên ngành
              </h3>
              <EditableText
                value={data.master_program_information_security.major}
                onChange={(value) => updateMasterProgramDirect("major", value)}
                placeholder="Nhập chuyên ngành..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-primary" />
                Mã chuyên ngành
              </h3>
              <EditableText
                value={data.master_program_information_security.major_code}
                onChange={(value) =>
                  updateMasterProgramDirect("major_code", value)
                }
                placeholder="Nhập mã chuyên ngành..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Master;

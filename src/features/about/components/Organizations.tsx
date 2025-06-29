import { useState, useEffect } from "react";
import {
  Edit3,
  Save,
  X,
  Send,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Building,
  Users,
  Target,
  FileText,
  Award,
  Lightbulb,
  Settings,
  Briefcase,
  Globe,
} from "lucide-react";
import organizationsData from "../data/organizations.json";

// TypeScript interfaces
interface OrganizationalStructure {
  introduction: string;
  introduction_text: string;
  faculties: {
    title: string;
    count: number;
    description: string;
  };
  research_centers: {
    title: string;
    count: number;
    description: string;
  };
  support_centers: {
    title: string;
    count: number;
    description: string;
  };
  administrative_department: {
    title: string;
    count: number;
    name: string;
    role: string;
  };
}

interface SchoolCouncil {
  title: string;
  description: string;
}

interface OrganizationsData {
  academy_name: string;
  organizational_chart: string;
  school_council_title: string;
  science_education_council: string;
  management_board: string;
  international_advisory_council: string;
  education_block: string;
  information_technology_faculty: string;
  general_information_security_faculty: string;
  electronic_information_faculty: string;
  research_block: string;
  cryptography_security_center: string;
  information_center: string;
  practice_departments: string;
  testing_departments: string;
  support_block: string;
  school_office: string;
  computing_center: string;
  innovation_center: string;
  organizational_structure: OrganizationalStructure;
  school_council: SchoolCouncil;
}

const Organizations = () => {
  const [data, setData] = useState<OrganizationsData>(
    organizationsData as OrganizationsData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    const isChanged =
      JSON.stringify(data) !== JSON.stringify(organizationsData);
    setHasChanges(isChanged);
  }, [data]);

  // Editable Text Component
  const EditableText = ({
    value,
    onChange,
    multiline = false,
    placeholder = "",
  }: {
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    placeholder?: string;
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
              className="w-full p-3 border-2 border-secondary focus:border-primary focus:outline-none resize-none min-h-[120px] bg-background-elevated text-text-primary"
              placeholder={placeholder}
            />
          ) : (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="p-3 w-full rounded-lg border-2 border-secondary focus:border-primary focus:outline-none bg-background-elevated text-text-primary"
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
  const updateField = (field: keyof OrganizationsData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateOrganizationalStructure = (
    field: keyof OrganizationalStructure,
    value: any
  ) => {
    setData((prev) => ({
      ...prev,
      organizational_structure: {
        ...prev.organizational_structure,
        [field]: value,
      },
    }));
  };

  const updateSchoolCouncil = (field: keyof SchoolCouncil, value: string) => {
    setData((prev) => ({
      ...prev,
      school_council: {
        ...prev.school_council,
        [field]: value,
      },
    }));
  };

  // Submit to server
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      const response = await fetch("/api/organizations", {
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

  // Reset data
  const handleReset = () => {
    setData(organizationsData as OrganizationsData);
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
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Quản lý cơ cấu tổ chức
                </h3>
                <p className="text-text-secondary">
                  Chỉnh sửa thông tin sơ đồ tổ chức và cơ cấu Học viện
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
                className="flex gap-2 items-center px-4 py-2 rounded-lg border transition-all text-text-secondary border-border-primary hover:bg-background-muted hover:shadow-md"
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
        {/* Academy Name Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-primary via-primary-dark to-error">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Building className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Tên Học viện</h2>
            </div>
          </div>

          <div className="p-8">
            <EditableText
              value={data.academy_name}
              onChange={(newName) => updateField("academy_name", newName)}
              placeholder="Nhập tên Học viện..."
            />
          </div>
        </div>

        {/* Organizational Chart Title */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-secondary via-secondary-dark to-primary">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Tiêu đề sơ đồ tổ chức</h2>
            </div>
          </div>

          <div className="p-8">
            <EditableText
              value={data.organizational_chart}
              onChange={(newTitle) =>
                updateField("organizational_chart", newTitle)
              }
              placeholder="Nhập tiêu đề sơ đồ tổ chức..."
            />
          </div>
        </div>

        {/* School Council Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-accent via-accent-dark to-warning">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Hội đồng Trường</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-accent" />
                Tiêu đề
              </h3>
              <EditableText
                value={data.school_council_title}
                onChange={(newTitle) =>
                  updateField("school_council_title", newTitle)
                }
                placeholder="Nhập tiêu đề hội đồng trường..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-accent" />
                Mô tả
              </h3>
              <EditableText
                value={data.school_council.description}
                onChange={(newDescription) =>
                  updateSchoolCouncil("description", newDescription)
                }
                multiline={true}
                placeholder="Nhập mô tả hội đồng trường..."
              />
            </div>
          </div>
        </div>

        {/* Management Structure */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-info via-secondary to-primary">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Cơ cấu quản lý</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <h3 className="flex gap-2 items-center mb-3 text-lg font-semibold text-text-primary">
                  <Lightbulb size={20} className="text-info" />
                  Hội đồng Khoa học và Đào tạo
                </h3>
                <EditableText
                  value={data.science_education_council}
                  onChange={(newValue) =>
                    updateField("science_education_council", newValue)
                  }
                  placeholder="Nhập tên hội đồng..."
                />
              </div>

              <div>
                <h3 className="flex gap-2 items-center mb-3 text-lg font-semibold text-text-primary">
                  <Settings size={20} className="text-secondary" />
                  Ban Giám hiệu
                </h3>
                <EditableText
                  value={data.management_board}
                  onChange={(newValue) =>
                    updateField("management_board", newValue)
                  }
                  placeholder="Nhập tên ban giám hiệu..."
                />
              </div>

              <div>
                <h3 className="flex gap-2 items-center mb-3 text-lg font-semibold text-text-primary">
                  <Globe size={20} className="text-primary" />
                  Hội đồng tư vấn quốc tế
                </h3>
                <EditableText
                  value={data.international_advisory_council}
                  onChange={(newValue) =>
                    updateField("international_advisory_council", newValue)
                  }
                  placeholder="Nhập tên hội đồng..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Education Block */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-accent via-accent-dark to-warning">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Khối đào tạo</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Target size={20} className="text-accent" />
                Tiêu đề khối
              </h3>
              <EditableText
                value={data.education_block}
                onChange={(newValue) =>
                  updateField("education_block", newValue)
                }
                placeholder="Nhập tiêu đề khối đào tạo..."
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Khoa Công nghệ thông tin
                </h4>
                <EditableText
                  value={data.information_technology_faculty}
                  onChange={(newValue) =>
                    updateField("information_technology_faculty", newValue)
                  }
                  placeholder="Nhập tên khoa..."
                />
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Khoa An toàn thông tin
                </h4>
                <EditableText
                  value={data.general_information_security_faculty}
                  onChange={(newValue) =>
                    updateField(
                      "general_information_security_faculty",
                      newValue
                    )
                  }
                  placeholder="Nhập tên khoa..."
                />
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Khoa Điện tử - Viễn thông
                </h4>
                <EditableText
                  value={data.electronic_information_faculty}
                  onChange={(newValue) =>
                    updateField("electronic_information_faculty", newValue)
                  }
                  placeholder="Nhập tên khoa..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Research Block */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-warning via-warning to-accent">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Khối nghiên cứu</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Target size={20} className="text-warning" />
                Tiêu đề khối
              </h3>
              <EditableText
                value={data.research_block}
                onChange={(newValue) => updateField("research_block", newValue)}
                placeholder="Nhập tiêu đề khối nghiên cứu..."
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Trung tâm Mật mã và An toàn
                </h4>
                <EditableText
                  value={data.cryptography_security_center}
                  onChange={(newValue) =>
                    updateField("cryptography_security_center", newValue)
                  }
                  placeholder="Nhập tên trung tâm..."
                />
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Trung tâm Thông tin
                </h4>
                <EditableText
                  value={data.information_center}
                  onChange={(newValue) =>
                    updateField("information_center", newValue)
                  }
                  placeholder="Nhập tên trung tâm..."
                />
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Phòng Thực hành
                </h4>
                <EditableText
                  value={data.practice_departments}
                  onChange={(newValue) =>
                    updateField("practice_departments", newValue)
                  }
                  placeholder="Nhập tên phòng..."
                />
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Phòng Kiểm thử
                </h4>
                <EditableText
                  value={data.testing_departments}
                  onChange={(newValue) =>
                    updateField("testing_departments", newValue)
                  }
                  placeholder="Nhập tên phòng..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Support Block */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-success via-success-dark to-accent">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Settings className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Khối phục vụ</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Target size={20} className="text-success" />
                Tiêu đề khối
              </h3>
              <EditableText
                value={data.support_block}
                onChange={(newValue) => updateField("support_block", newValue)}
                placeholder="Nhập tiêu đề khối phục vụ..."
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Văn phòng Trường
                </h4>
                <EditableText
                  value={data.school_office}
                  onChange={(newValue) =>
                    updateField("school_office", newValue)
                  }
                  placeholder="Nhập tên văn phòng..."
                />
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Trung tâm Máy tính
                </h4>
                <EditableText
                  value={data.computing_center}
                  onChange={(newValue) =>
                    updateField("computing_center", newValue)
                  }
                  placeholder="Nhập tên trung tâm..."
                />
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Trung tâm Đổi mới sáng tạo
                </h4>
                <EditableText
                  value={data.innovation_center}
                  onChange={(newValue) =>
                    updateField("innovation_center", newValue)
                  }
                  placeholder="Nhập tên trung tâm..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Organizational Structure Details */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-info via-secondary to-primary">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Chi tiết cơ cấu tổ chức</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-info" />
                Giới thiệu
              </h3>
              <EditableText
                value={data.organizational_structure.introduction}
                onChange={(newValue) =>
                  updateOrganizationalStructure("introduction", newValue)
                }
                placeholder="Nhập giới thiệu..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-info" />
                Mô tả chi tiết
              </h3>
              <EditableText
                value={data.organizational_structure.introduction_text}
                onChange={(newValue) =>
                  updateOrganizationalStructure("introduction_text", newValue)
                }
                multiline={true}
                placeholder="Nhập mô tả chi tiết..."
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Các khoa
                </h4>
                <EditableText
                  value={data.organizational_structure.faculties.title}
                  onChange={(newValue) =>
                    updateOrganizationalStructure("faculties", {
                      ...data.organizational_structure.faculties,
                      title: newValue,
                    })
                  }
                  placeholder="Nhập tiêu đề..."
                />
                <div className="mt-2">
                  <EditableText
                    value={data.organizational_structure.faculties.description}
                    onChange={(newValue) =>
                      updateOrganizationalStructure("faculties", {
                        ...data.organizational_structure.faculties,
                        description: newValue,
                      })
                    }
                    multiline={true}
                    placeholder="Nhập mô tả..."
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Trung tâm nghiên cứu
                </h4>
                <EditableText
                  value={data.organizational_structure.research_centers.title}
                  onChange={(newValue) =>
                    updateOrganizationalStructure("research_centers", {
                      ...data.organizational_structure.research_centers,
                      title: newValue,
                    })
                  }
                  placeholder="Nhập tiêu đề..."
                />
                <div className="mt-2">
                  <EditableText
                    value={
                      data.organizational_structure.research_centers.description
                    }
                    onChange={(newValue) =>
                      updateOrganizationalStructure("research_centers", {
                        ...data.organizational_structure.research_centers,
                        description: newValue,
                      })
                    }
                    multiline={true}
                    placeholder="Nhập mô tả..."
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Trung tâm hỗ trợ
                </h4>
                <EditableText
                  value={data.organizational_structure.support_centers.title}
                  onChange={(newValue) =>
                    updateOrganizationalStructure("support_centers", {
                      ...data.organizational_structure.support_centers,
                      title: newValue,
                    })
                  }
                  placeholder="Nhập tiêu đề..."
                />
                <div className="mt-2">
                  <EditableText
                    value={
                      data.organizational_structure.support_centers.description
                    }
                    onChange={(newValue) =>
                      updateOrganizationalStructure("support_centers", {
                        ...data.organizational_structure.support_centers,
                        description: newValue,
                      })
                    }
                    multiline={true}
                    placeholder="Nhập mô tả..."
                  />
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-semibold text-md text-text-primary">
                  Bộ phận hành chính
                </h4>
                <EditableText
                  value={
                    data.organizational_structure.administrative_department
                      .title
                  }
                  onChange={(newValue) =>
                    updateOrganizationalStructure("administrative_department", {
                      ...data.organizational_structure
                        .administrative_department,
                      title: newValue,
                    })
                  }
                  placeholder="Nhập tiêu đề..."
                />
                <div className="mt-2">
                  <EditableText
                    value={
                      data.organizational_structure.administrative_department
                        .name
                    }
                    onChange={(newValue) =>
                      updateOrganizationalStructure(
                        "administrative_department",
                        {
                          ...data.organizational_structure
                            .administrative_department,
                          name: newValue,
                        }
                      )
                    }
                    placeholder="Nhập tên bộ phận..."
                  />
                </div>
                <div className="mt-2">
                  <EditableText
                    value={
                      data.organizational_structure.administrative_department
                        .role
                    }
                    onChange={(newValue) =>
                      updateOrganizationalStructure(
                        "administrative_department",
                        {
                          ...data.organizational_structure
                            .administrative_department,
                          role: newValue,
                        }
                      )
                    }
                    multiline={true}
                    placeholder="Nhập vai trò..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* School Council Details */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-primary via-primary-dark to-error">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">
                Chi tiết Hội đồng Trường
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-primary" />
                Tiêu đề
              </h3>
              <EditableText
                value={data.school_council.title}
                onChange={(newValue) => updateSchoolCouncil("title", newValue)}
                placeholder="Nhập tiêu đề hội đồng trường..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-primary" />
                Mô tả chi tiết
              </h3>
              <EditableText
                value={data.school_council.description}
                onChange={(newValue) =>
                  updateSchoolCouncil("description", newValue)
                }
                multiline={true}
                placeholder="Nhập mô tả chi tiết hội đồng trường..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organizations;

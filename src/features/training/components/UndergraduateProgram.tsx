import React, { useState, useEffect } from "react";
import {
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Send,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  BookOpen,
  Award,
  Target,
  FileText,
  Shield,
  Code,
  Network,
  MessageSquare,
} from "lucide-react";
import trainingStructure from "../data/trainingStructure.json";

// TypeScript interfaces
interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

interface CoreMajor {
  major_name: string;
  major_code: string;
  specializations: string[];
  specialization_title?: string;
  major_title?: string;
}

interface StudentAchievements {
  introduction: string;
  list_of_awards: string[];
  student_achievements_title: string;
}

interface TrainingStructureData {
  heading: string;
  major_title: string;
  specialization_title: string;
  conclusion_title: string;
  student_achievements_title: string;
  core_majors: CoreMajor[];
  admission_information_title: string;
  admission_information: string;
  student_achievements: StudentAchievements;
  conclusion: string;
}

const UndergraduateProgram = () => {
  const [data, setData] = useState<TrainingStructureData>(
    trainingStructure as TrainingStructureData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    const isChanged =
      JSON.stringify(data) !== JSON.stringify(trainingStructure);
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
  const updateField = (field: keyof TrainingStructureData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCoreMajor = (
    index: number,
    field: keyof CoreMajor,
    value: string | string[]
  ) => {
    setData((prev) => ({
      ...prev,
      core_majors: prev.core_majors.map((major, i) =>
        i === index ? { ...major, [field]: value } : major
      ),
    }));
  };

  const updateSpecialization = (
    majorIndex: number,
    specIndex: number,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      core_majors: prev.core_majors.map((major, i) =>
        i === majorIndex
          ? {
              ...major,
              specializations: major.specializations.map((spec, j) =>
                j === specIndex ? value : spec
              ),
            }
          : major
      ),
    }));
  };

  const addSpecialization = (majorIndex: number, value: string) => {
    if (value.trim()) {
      setData((prev) => ({
        ...prev,
        core_majors: prev.core_majors.map((major, i) =>
          i === majorIndex
            ? {
                ...major,
                specializations: [...major.specializations, value.trim()],
              }
            : major
        ),
      }));
    }
  };

  const removeSpecialization = (majorIndex: number, specIndex: number) => {
    setData((prev) => ({
      ...prev,
      core_majors: prev.core_majors.map((major, i) =>
        i === majorIndex
          ? {
              ...major,
              specializations: major.specializations.filter(
                (_, j) => j !== specIndex
              ),
            }
          : major
      ),
    }));
  };

  const updateStudentAchievement = (
    field: keyof StudentAchievements,
    value: string | string[]
  ) => {
    setData((prev) => ({
      ...prev,
      student_achievements: {
        ...prev.student_achievements,
        [field]: value,
      },
    }));
  };

  const updateAchievementItem = (index: number, value: string) => {
    setData((prev) => ({
      ...prev,
      student_achievements: {
        ...prev.student_achievements,
        list_of_awards: prev.student_achievements.list_of_awards.map(
          (item, i) => (i === index ? value : item)
        ),
      },
    }));
  };

  const addAchievementItem = (value: string) => {
    if (value.trim()) {
      setData((prev) => ({
        ...prev,
        student_achievements: {
          ...prev.student_achievements,
          list_of_awards: [
            ...prev.student_achievements.list_of_awards,
            value.trim(),
          ],
        },
      }));
    }
  };

  const removeAchievementItem = (index: number) => {
    setData((prev) => ({
      ...prev,
      student_achievements: {
        ...prev.student_achievements,
        list_of_awards: prev.student_achievements.list_of_awards.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Submit to server
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/undergraduate-program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        console.log("Data saved successfully:", data);
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
    setData(trainingStructure as TrainingStructureData);
    setSubmitStatus(null);
  };

  const [newSpecialization, setNewSpecialization] = useState("");
  const [newAchievement, setNewAchievement] = useState("");

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
                  Quản lý chương trình đào tạo Đại học
                </h3>
                <p className="text-text-secondary">
                  Chỉnh sửa thông tin chương trình đào tạo và cơ cấu ngành học
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
        {/* Heading Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-secondary via-secondary-dark to-primary">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Giới thiệu chung</h2>
            </div>
          </div>

          <div className="p-8">
            <EditableText
              value={data.heading}
              onChange={(value) => updateField("heading", value)}
              multiline={true}
              placeholder="Nhập giới thiệu chung..."
            />
          </div>
        </div>

        {/* Core Majors Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-success via-success-dark to-accent">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Các ngành trụ cột</h2>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {data.core_majors.map((major, majorIndex) => (
              <div
                key={majorIndex}
                className={`p-6 rounded-xl border ${
                  majorIndex === 0
                    ? "bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/20"
                    : majorIndex === 1
                      ? "bg-gradient-to-r from-accent/10 to-warning/10 border-accent/20"
                      : "bg-gradient-to-r from-warning/10 to-error/10 border-warning/20"
                }`}
              >
                <div className="flex gap-3 items-center mb-4">
                  {majorIndex === 0 && (
                    <Shield size={24} className="text-secondary" />
                  )}
                  {majorIndex === 1 && (
                    <Code size={24} className="text-accent" />
                  )}
                  {majorIndex === 2 && (
                    <Network size={24} className="text-warning" />
                  )}
                  <h3 className="text-lg font-semibold text-text-primary">
                    {major.major_name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-text-secondary">
                      {major.major_title || data.major_title}:
                    </label>
                    <EditableText
                      value={major.major_code}
                      onChange={(value) =>
                        updateCoreMajor(majorIndex, "major_code", value)
                      }
                      placeholder="Nhập mã ngành..."
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-text-secondary">
                      {major.specialization_title || data.specialization_title}:
                    </label>
                    <div className="space-y-2">
                      {major.specializations.map((spec, specIndex) => (
                        <div
                          key={specIndex}
                          className="flex gap-2 items-center"
                        >
                          <div className="flex-1">
                            <EditableText
                              value={spec}
                              onChange={(value) =>
                                updateSpecialization(
                                  majorIndex,
                                  specIndex,
                                  value
                                )
                              }
                              placeholder="Nhập chuyên ngành..."
                            />
                          </div>
                          <button
                            onClick={() =>
                              removeSpecialization(majorIndex, specIndex)
                            }
                            className="p-1 rounded transition-all text-error hover:text-error hover:bg-error/10"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}

                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={newSpecialization}
                          onChange={(e) => setNewSpecialization(e.target.value)}
                          className="flex-1 p-2 rounded border text-text-primary bg-background-elevated border-border-secondary focus:border-primary focus:outline-none"
                          placeholder="Thêm chuyên ngành mới..."
                        />
                        <button
                          onClick={() => {
                            addSpecialization(majorIndex, newSpecialization);
                            setNewSpecialization("");
                          }}
                          className="p-2 text-white rounded transition-all bg-success hover:bg-success-dark"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Information Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-info via-secondary to-primary">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">
                {data.admission_information_title}
              </h2>
            </div>
          </div>

          <div className="p-8">
            <EditableText
              value={data.admission_information}
              onChange={(value) => updateField("admission_information", value)}
              multiline={true}
              placeholder="Nhập thông tin tuyển sinh..."
            />
          </div>
        </div>

        {/* Student Achievements Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-accent via-accent-dark to-warning">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">
                {data.student_achievements.student_achievements_title}
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-accent" />
                Giới thiệu
              </h3>
              <EditableText
                value={data.student_achievements.introduction}
                onChange={(value) =>
                  updateStudentAchievement("introduction", value)
                }
                multiline={true}
                placeholder="Nhập giới thiệu thành tích..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Award size={20} className="text-accent" />
                Danh sách thành tích
              </h3>
              <div className="space-y-3">
                {data.student_achievements.list_of_awards.map(
                  (achievement, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center p-3 rounded-lg border bg-accent/10 border-accent/20"
                    >
                      <div className="flex-1">
                        <EditableText
                          value={achievement}
                          onChange={(value) =>
                            updateAchievementItem(index, value)
                          }
                          placeholder="Nhập thành tích..."
                        />
                      </div>
                      <button
                        onClick={() => removeAchievementItem(index)}
                        className="p-1 rounded transition-all text-error hover:text-error hover:bg-error/10"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )
                )}

                <div className="flex gap-2 items-center p-3 rounded-lg border bg-success/10 border-success/20">
                  <input
                    type="text"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    className="flex-1 p-2 rounded border text-text-primary bg-background-elevated border-success/30 focus:border-success focus:outline-none"
                    placeholder="Thêm thành tích mới..."
                  />
                  <button
                    onClick={() => {
                      addAchievementItem(newAchievement);
                      setNewAchievement("");
                    }}
                    className="p-2 text-white rounded transition-all bg-success hover:bg-success-dark"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-primary via-primary-dark to-error">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">{data.conclusion_title}</h2>
            </div>
          </div>

          <div className="p-8">
            <EditableText
              value={data.conclusion}
              onChange={(value) => updateField("conclusion", value)}
              multiline={true}
              placeholder="Nhập kết luận..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UndergraduateProgram;

import { useState, useEffect } from "react";
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
  Calendar,
  FileText,
  Building,
  Clock,
  Target,
  Award,
  Users,
  Globe,
  Lightbulb,
  HandshakeIcon,
} from "lucide-react";
import aboutOverviewData from "../data/aboutOverview.json";
import { useAbout } from "../hooks/useAbout";
import { updatePage } from "@/core/api/pageApi";
import { PageRequestUpdate } from "@/core/api/pageApi/types";

// TypeScript interfaces
interface TimelineItem {
  year?: number;
  event?: string;
  milestone?: string;
  status?: string;
  reputation?: string;
}

interface Activity {
  id: number;
  activityTitle: string;
  description: string;
}

interface Cooperation {
  title: string;
  events: Array<{
    title: string;
    date: string;
    description: string;
  }>;
  id: string;
  event: string;
  date: string;
  description: string;
}

interface Achievement {
  id: number;
  category: string;
  description?: string;
  details?: string[];
}

interface AboutData {
  menu: {
    overview: string;
    history: string;
    structureAndTeam: string;
    researchAndTransfer: string;
    externalCooperation: string;
    alumni: string;
  };
  academyOverview: {
    title: string;
    content: string[];
  };
  briefHistory: {
    title: string;
    timeline: TimelineItem[];
    summary: string;
    futureGoals: string;
  };
  organizationalStructureAndTeam: {
    title: string;
    introduction: string;
    boardOfDirectors: {
      title: string;
      members: Array<{
        name: string;
        position: string;
        specialization: string;
      }>;
      description: string;
    };
    functionalDepartments: {
      title: string;
      introduction: string;
      list: string[];
      description: string;
    };
    specializedFaculties: {
      title: string;
      description: string;
    };
  };
  scientificResearchAndTechnologyTransfer: {
    title: string;
    activities: Activity[];
  };
  externalCooperation: {
    title: string;
    cooperations: Cooperation[];
  };
  alumni: {
    title: string;
    achievements: Achievement[];
  };
}

const Overview = () => {
  const { about, isLoading, error, getAbout } = useAbout();

  useEffect(() => {
    getAbout();
  }, []);

  // Initialize data with about content or fallback to aboutOverviewData
  const [data, setData] = useState<AboutData>(() => {
    if (about?.content) {
      try {
        const parsedContent =
          typeof about.content === "string"
            ? JSON.parse(about.content)
            : about.content;
        return parsedContent as AboutData;
      } catch (error) {
        console.error("Error parsing about content:", error);
        return aboutOverviewData as AboutData;
      }
    }
    return aboutOverviewData as AboutData;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Update data when about changes
  useEffect(() => {
    if (about?.content) {
      try {
        let parsedContent;
        if (typeof about.content === "string") {
          parsedContent = JSON.parse(about.content);
        } else {
          parsedContent = about.content;
        }

        setData(parsedContent as AboutData);
      } catch (error) {
        console.error("Error parsing about content:", error);
        setData(aboutOverviewData as AboutData);
      }
    }
  }, [about]);

  // Track changes
  useEffect(() => {
    if (about?.content) {
      try {
        const originalContent =
          typeof about.content === "string"
            ? JSON.parse(about.content)
            : about.content;
        const isChanged =
          JSON.stringify(data) !== JSON.stringify(originalContent);
        setHasChanges(isChanged);
      } catch (error) {
        console.error("Error parsing about content for comparison:", error);
        setHasChanges(false);
      }
    }
  }, [data, about]);

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

  // Update academy overview title
  const updateAcademyTitle = (newTitle: string) => {
    setData((prev) => ({
      ...prev,
      academyOverview: {
        ...prev.academyOverview,
        title: newTitle,
      },
    }));
  };

  // Update academy overview content
  const updateAcademyContent = (index: number, newContent: string) => {
    setData((prev) => ({
      ...prev,
      academyOverview: {
        ...prev.academyOverview,
        content: prev.academyOverview.content.map((item, i) =>
          i === index ? newContent : item
        ),
      },
    }));
  };

  // Add new academy content
  const addAcademyContent = (newContent: string) => {
    if (newContent.trim()) {
      setData((prev) => ({
        ...prev,
        academyOverview: {
          ...prev.academyOverview,
          content: [...prev.academyOverview.content, newContent.trim()],
        },
      }));
    }
  };

  // Remove academy content
  const removeAcademyContent = (index: number) => {
    setData((prev) => ({
      ...prev,
      academyOverview: {
        ...prev.academyOverview,
        content: prev.academyOverview.content.filter((_, i) => i !== index),
      },
    }));
  };

  // History functions
  const updateHistoryTitle = (newTitle: string) => {
    setData((prev) => ({
      ...prev,
      briefHistory: {
        ...prev.briefHistory,
        title: newTitle,
      },
    }));
  };

  const updateTimelineItem = (
    index: number,
    field: keyof TimelineItem,
    value: any
  ) => {
    setData((prev) => ({
      ...prev,
      briefHistory: {
        ...prev.briefHistory,
        timeline: prev.briefHistory.timeline.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addTimelineItem = () => {
    const newItem: TimelineItem = {
      year: new Date().getFullYear(),
      event: "Sự kiện mới",
    };
    setData((prev) => ({
      ...prev,
      briefHistory: {
        ...prev.briefHistory,
        timeline: [...prev.briefHistory.timeline, newItem],
      },
    }));
  };

  const removeTimelineItem = (index: number) => {
    setData((prev) => ({
      ...prev,
      briefHistory: {
        ...prev.briefHistory,
        timeline: prev.briefHistory.timeline.filter((_, i) => i !== index),
      },
    }));
  };

  // Submit to server
  const handleSubmit = async () => {
    if (!about?.id) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const updatePageData: PageRequestUpdate = {
        id: about.id,
        title: about.title,
        content: data, // Send as object, not JSON string
        path: about.path || "about",
      };

      const response = await updatePage(about.id, updatePageData);
      console.log("updatePageData", response);
      setSubmitStatus("success");

      // Refresh about data
      await getAbout();
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error saving data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset data
  const handleReset = () => {
    if (about?.content) {
      try {
        const parsedContent =
          typeof about.content === "string"
            ? JSON.parse(about.content)
            : about.content;
        setData(parsedContent as AboutData);
      } catch (error) {
        console.error("Error parsing about content for reset:", error);
        setData(aboutOverviewData as AboutData);
      }
    } else {
      setData(aboutOverviewData as AboutData);
    }
    setSubmitStatus(null);
  };

  const [newContent, setNewContent] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-base">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-4 w-8 h-8 animate-spin text-primary" />
          <p className="text-text-secondary">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-base">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 w-8 h-8 text-error" />
          <p className="text-text-secondary">Có lỗi xảy ra: {error}</p>
        </div>
      </div>
    );
  }

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
                  Quản lý nội dung Overview
                </h3>
                <p className="text-text-secondary">
                  Chỉnh sửa thông tin tổng quan và lịch sử Học viện
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
        {/* Academy Overview Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-secondary via-secondary-dark to-primary">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Tổng quan về Học viện</h2>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Target size={20} className="text-secondary" />
                Tiêu đề
              </h3>
              <EditableText
                value={data.academyOverview.title}
                onChange={updateAcademyTitle}
                placeholder="Nhập tiêu đề..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-secondary" />
                Nội dung
              </h3>
              <div className="space-y-4">
                {data.academyOverview.content.map((content, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-6 bg-gradient-to-r rounded-xl border from-background-muted to-background-subtle border-border-secondary"
                  >
                    <div className="flex-1">
                      <EditableText
                        value={content}
                        onChange={(newContent) =>
                          updateAcademyContent(index, newContent)
                        }
                        multiline={true}
                        placeholder="Nhập nội dung..."
                      />
                    </div>
                    <button
                      onClick={() => removeAcademyContent(index)}
                      className="p-2 rounded-lg transition-all text-error hover:text-error hover:bg-error/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                <div className="p-6 rounded-xl border bg-success/10 border-success/20">
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="p-4 w-full rounded-lg border resize-none border-success/30 focus:border-success focus:outline-none bg-background-elevated text-text-primary"
                    placeholder="Thêm đoạn nội dung mới..."
                    rows={3}
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => {
                        addAcademyContent(newContent);
                        setNewContent("");
                      }}
                      className="flex gap-1 items-center px-4 py-2 text-white bg-gradient-to-r rounded-lg shadow-md transition-all from-success to-success hover:from-success-dark hover:to-success-dark"
                    >
                      <Plus size={16} />
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brief History Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-accent via-accent-dark to-warning">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Lịch sử Học viện</h2>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Clock size={20} className="text-accent" />
                Tiêu đề
              </h3>
              <EditableText
                value={data.briefHistory.title}
                onChange={updateHistoryTitle}
                placeholder="Nhập tiêu đề lịch sử..."
              />
            </div>

            {/* Timeline */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="flex gap-2 items-center text-lg font-semibold text-text-primary">
                  <Calendar size={20} className="text-accent" />
                  Dòng thời gian
                </h3>
                <button
                  onClick={addTimelineItem}
                  className="flex gap-1 items-center px-4 py-2 text-white bg-gradient-to-r rounded-lg shadow-md transition-all from-accent to-accent-dark hover:from-accent-dark hover:to-accent"
                >
                  <Plus size={16} />
                  Thêm sự kiện
                </button>
              </div>

              <div className="space-y-4">
                {data.briefHistory.timeline.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-6 bg-gradient-to-r rounded-xl border from-accent/10 to-warning/10 border-accent/20"
                  >
                    {item.year && (
                      <div className="w-24">
                        <input
                          type="number"
                          value={item.year}
                          onChange={(e) =>
                            updateTimelineItem(
                              index,
                              "year",
                              parseInt(e.target.value)
                            )
                          }
                          className="p-3 w-full font-bold text-center rounded-lg border border-accent/30 focus:border-accent focus:outline-none bg-background-elevated text-text-primary"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <EditableText
                        value={
                          item.event ||
                          item.milestone ||
                          item.status ||
                          item.reputation ||
                          ""
                        }
                        onChange={(newEvent) =>
                          updateTimelineItem(index, "event", newEvent)
                        }
                        multiline={true}
                        placeholder="Nhập sự kiện..."
                      />
                    </div>
                    <button
                      onClick={() => removeTimelineItem(index)}
                      className="p-2 rounded-lg transition-all text-error hover:text-error hover:bg-error/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-accent" />
                Tóm tắt
              </h3>
              <EditableText
                value={data.briefHistory.summary}
                onChange={(newSummary) =>
                  setData((prev) => ({
                    ...prev,
                    briefHistory: {
                      ...prev.briefHistory,
                      summary: newSummary,
                    },
                  }))
                }
                multiline={true}
                placeholder="Nhập tóm tắt lịch sử..."
              />
            </div>

            {/* Future Goals */}
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Target size={20} className="text-accent" />
                Mục tiêu tương lai
              </h3>
              <EditableText
                value={data.briefHistory.futureGoals}
                onChange={(newGoals) =>
                  setData((prev) => ({
                    ...prev,
                    briefHistory: {
                      ...prev.briefHistory,
                      futureGoals: newGoals,
                    },
                  }))
                }
                multiline={true}
                placeholder="Nhập mục tiêu tương lai..."
              />
            </div>
          </div>
        </div>

        {/* Scientific Research Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-info via-secondary to-primary">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">
                Nghiên cứu khoa học và chuyển giao công nghệ
              </h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Lightbulb size={20} className="text-info" />
                Tiêu đề
              </h3>
              <EditableText
                value={data.scientificResearchAndTechnologyTransfer.title}
                onChange={(newTitle) =>
                  setData((prev) => ({
                    ...prev,
                    scientificResearchAndTechnologyTransfer: {
                      ...prev.scientificResearchAndTechnologyTransfer,
                      title: newTitle,
                    },
                  }))
                }
                placeholder="Nhập tiêu đề nghiên cứu..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Award size={20} className="text-info" />
                Hoạt động nghiên cứu
              </h3>
              <div className="space-y-4">
                {data.scientificResearchAndTechnologyTransfer.activities.map(
                  (activity, index) => (
                    <div
                      key={activity.id}
                      className="p-6 bg-gradient-to-r rounded-xl border from-info/10 to-secondary/10 border-info/20"
                    >
                      <div className="mb-3">
                        <EditableText
                          value={activity.activityTitle}
                          onChange={(newTitle) =>
                            setData((prev) => ({
                              ...prev,
                              scientificResearchAndTechnologyTransfer: {
                                ...prev.scientificResearchAndTechnologyTransfer,
                                activities:
                                  prev.scientificResearchAndTechnologyTransfer.activities.map(
                                    (a, i) =>
                                      i === index
                                        ? { ...a, activityTitle: newTitle }
                                        : a
                                  ),
                              },
                            }))
                          }
                          placeholder="Nhập tiêu đề hoạt động..."
                        />
                      </div>
                      <EditableText
                        value={activity.description}
                        onChange={(newDescription) =>
                          setData((prev) => ({
                            ...prev,
                            scientificResearchAndTechnologyTransfer: {
                              ...prev.scientificResearchAndTechnologyTransfer,
                              activities:
                                prev.scientificResearchAndTechnologyTransfer.activities.map(
                                  (a, i) =>
                                    i === index
                                      ? { ...a, description: newDescription }
                                      : a
                                ),
                            },
                          }))
                        }
                        multiline={true}
                        placeholder="Nhập mô tả hoạt động..."
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* External Cooperation Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-success via-success-dark to-accent">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Hợp tác đối ngoại</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Globe size={20} className="text-success" />
                Tiêu đề
              </h3>
              <EditableText
                value={data.externalCooperation.title}
                onChange={(newTitle) =>
                  setData((prev) => ({
                    ...prev,
                    externalCooperation: {
                      ...prev.externalCooperation,
                      title: newTitle,
                    },
                  }))
                }
                placeholder="Nhập tiêu đề hợp tác..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <HandshakeIcon size={20} className="text-success" />
                Các hợp tác
              </h3>
              <div className="space-y-4">
                {data.externalCooperation.cooperations.map(
                  (cooperation, index) => (
                    <div
                      key={cooperation.id}
                      className="p-6 bg-gradient-to-r rounded-xl border from-success/10 to-accent/10 border-success/20"
                    >
                      <div className="mb-3">
                        <EditableText
                          value={cooperation.title}
                          onChange={(newTitle) =>
                            setData((prev) => ({
                              ...prev,
                              externalCooperation: {
                                ...prev.externalCooperation,
                                cooperations:
                                  prev.externalCooperation.cooperations.map(
                                    (c, i) =>
                                      i === index
                                        ? { ...c, title: newTitle }
                                        : c
                                  ),
                              },
                            }))
                          }
                          placeholder="Nhập tiêu đề hợp tác..."
                        />
                      </div>
                      <div className="mb-3">
                        <EditableText
                          value={cooperation.date}
                          onChange={(newDate) =>
                            setData((prev) => ({
                              ...prev,
                              externalCooperation: {
                                ...prev.externalCooperation,
                                cooperations:
                                  prev.externalCooperation.cooperations.map(
                                    (c, i) =>
                                      i === index ? { ...c, date: newDate } : c
                                  ),
                              },
                            }))
                          }
                          placeholder="Nhập ngày..."
                        />
                      </div>
                      <EditableText
                        value={cooperation.description}
                        onChange={(newDescription) =>
                          setData((prev) => ({
                            ...prev,
                            externalCooperation: {
                              ...prev.externalCooperation,
                              cooperations:
                                prev.externalCooperation.cooperations.map(
                                  (c, i) =>
                                    i === index
                                      ? { ...c, description: newDescription }
                                      : c
                                ),
                            },
                          }))
                        }
                        multiline={true}
                        placeholder="Nhập mô tả hợp tác..."
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Alumni Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-primary via-primary-dark to-error">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Cựu sinh viên</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Users size={20} className="text-primary" />
                Tiêu đề
              </h3>
              <EditableText
                value={data.alumni.title}
                onChange={(newTitle) =>
                  setData((prev) => ({
                    ...prev,
                    alumni: {
                      ...prev.alumni,
                      title: newTitle,
                    },
                  }))
                }
                placeholder="Nhập tiêu đề cựu sinh viên..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Award size={20} className="text-primary" />
                Thành tựu
              </h3>
              <div className="space-y-4">
                {data.alumni.achievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className="p-6 bg-gradient-to-r rounded-xl border from-primary/10 to-error/10 border-primary/20"
                  >
                    <div className="mb-3">
                      <EditableText
                        value={achievement.category}
                        onChange={(newCategory) =>
                          setData((prev) => ({
                            ...prev,
                            alumni: {
                              ...prev.alumni,
                              achievements: prev.alumni.achievements.map(
                                (a, i) =>
                                  i === index
                                    ? { ...a, category: newCategory }
                                    : a
                              ),
                            },
                          }))
                        }
                        placeholder="Nhập danh mục thành tựu..."
                      />
                    </div>
                    {achievement.description && (
                      <EditableText
                        value={achievement.description}
                        onChange={(newDescription) =>
                          setData((prev) => ({
                            ...prev,
                            alumni: {
                              ...prev.alumni,
                              achievements: prev.alumni.achievements.map(
                                (a, i) =>
                                  i === index
                                    ? { ...a, description: newDescription }
                                    : a
                              ),
                            },
                          }))
                        }
                        multiline={true}
                        placeholder="Nhập mô tả thành tựu..."
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

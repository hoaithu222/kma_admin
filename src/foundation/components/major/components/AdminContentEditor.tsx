import { useState } from "react";
import {
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  Settings,
  BookOpen,
  Users,
  Award,
  FileText,
  Map,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Input from "../../inputs/Input";
import TextArea from "../../inputs/TextArea";
import SelectOption from "../../inputs/SelectOption";

interface ExpandedSections {
  [key: string]: boolean;
}

interface ListEditorProps {
  title: string;
  items: string[];
  onAdd?: (item: string) => void;
  onEdit?: (index: number, item: string) => void;
  onDelete?: (index: number) => void;
}

const AdminContentEditor = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(
    {}
  );

  const tabs = [
    { id: "general", name: "Thông tin chung", icon: Settings },
    { id: "objectives", name: "Mục tiêu đào tạo", icon: Award },
    { id: "curriculum", name: "Chương trình học", icon: BookOpen },
    { id: "careers", name: "Nghề nghiệp", icon: Users },
    { id: "admission", name: "Tuyển sinh", icon: FileText },
    { id: "structure", name: "Cấu trúc CT", icon: Map },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const startEditing = (fieldId: string) => {
    setEditingField(fieldId);
    setIsEditing(true);
  };

  const stopEditing = () => {
    setEditingField(null);
    setIsEditing(false);
  };

  const EditableField = ({
    label,
    value,
    fieldId,
    type = "text",
    rows = 1,
    options = [],
  }: {
    label: string;
    value: string;
    fieldId: string;
    type?: string;
    rows?: number;
    options?: { value: string; label: string }[];
  }) => {
    const [tempValue, setTempValue] = useState(value || "");
    const isCurrentlyEditing = editingField === fieldId;

    const handleSave = () => {
      stopEditing();
    };

    const handleCancel = () => {
      setTempValue(value || "");
      stopEditing();
    };

    return (
      <div className="p-4 mb-4 rounded-lg border transition-colors bg-card-bg border-border-primary hover:border-border-focus">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
          {!isCurrentlyEditing && (
            <button
              onClick={() => startEditing(fieldId)}
              className="transition-colors text-text-link hover:text-text-link-hover"
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>

        {isCurrentlyEditing ? (
          <div className="space-y-3">
            {type === "textarea" ? (
              <TextArea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                rows={rows}
                fullWidth
                variant="outlined"
                className="border-border-primary focus:border-border-focus"
              />
            ) : type === "select" ? (
              <SelectOption
                options={options}
                value={tempValue}
                onChange={(value) => setTempValue(value)}
                fullWidth
                variant="outlined"
                className="border-border-primary focus:border-border-focus"
              />
            ) : (
              <Input
                type={type}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                fullWidth
                variant="outlined"
                className="border-border-primary focus:border-border-focus"
              />
            )}
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 space-x-1 rounded-md transition-colors text-text-on-primary bg-button-primary-bg hover:bg-button-primary-hover"
              >
                <Save size={16} />
                <span>Lưu</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center px-4 py-2 space-x-1 rounded-md transition-colors text-text-on-primary bg-button-secondary-bg hover:bg-button-secondary-hover"
              >
                <X size={16} />
                <span>Hủy</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-text-primary bg-background-muted p-3 rounded-md min-h-[2.5rem] flex items-center">
            {value || (
              <span className="italic text-text-muted">Chưa có nội dung</span>
            )}
          </div>
        )}
      </div>
    );
  };

  const ListEditor = ({
    title,
    items = [],
    onAdd,
    onEdit,
    onDelete,
  }: ListEditorProps) => {
    const [newItem, setNewItem] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAdd = () => {
      if (newItem.trim()) {
        onAdd?.(newItem.trim());
        setNewItem("");
        setShowAddForm(false);
      }
    };

    return (
      <div className="p-4 rounded-lg border bg-card-bg border-border-primary">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center px-3 py-1 space-x-1 rounded-md transition-colors text-text-on-primary bg-button-primary-bg hover:bg-button-primary-hover"
          >
            <Plus size={16} />
            <span>Thêm</span>
          </button>
        </div>

        {showAddForm && (
          <div className="p-3 mb-4 rounded-md bg-background-subtle">
            <TextArea
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Nhập nội dung mới..."
              fullWidth
              variant="outlined"
              rows={2}
              className="border-border-primary focus:border-border-focus"
            />
            <div className="flex mt-2 space-x-2">
              <button
                onClick={handleAdd}
                className="px-3 py-1 rounded-md transition-colors text-text-on-primary bg-button-primary-bg hover:bg-button-primary-hover"
              >
                Thêm
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewItem("");
                }}
                className="px-3 py-1 rounded-md transition-colors text-text-on-primary bg-button-secondary-bg hover:bg-button-secondary-hover"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start p-3 space-x-3 rounded-md transition-colors bg-background-muted group hover:bg-background-subtle"
            >
              <span className="mt-1 text-sm text-text-muted">{index + 1}.</span>
              <p className="flex-1 text-text-primary">{item}</p>
              <div className="flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => onEdit?.(index, item)}
                  className="text-text-link hover:text-text-link-hover"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => onDelete?.(index)}
                  className="text-button-danger-bg hover:text-button-danger-hover"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="py-8 italic text-center text-text-muted">
              Chưa có mục nào
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r rounded-lg border from-background-subtle to-background-muted border-border-primary">
              <h2 className="mb-6 text-2xl font-bold text-text-primary">
                Thông tin chung chương trình
              </h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <EditableField
                  label="Tên chương trình"
                  fieldId="programName"
                  value=""
                />
                <EditableField
                  label="Bậc đào tạo"
                  fieldId="trainingLevel"
                  type="select"
                  value=""
                  options={[
                    { value: "dai-hoc", label: "Đại học" },
                    { value: "cao-dang", label: "Cao đẳng" },
                    { value: "trung-cap", label: "Trung cấp" },
                  ]}
                />
                <EditableField
                  label="Bằng cấp"
                  fieldId="degreeAwarded"
                  value=""
                />
                <EditableField label="Ngành" fieldId="major" value="" />
                <EditableField label="Mã ngành" fieldId="majorCode" value="" />
                <EditableField
                  label="Chuyên ngành"
                  fieldId="specialization"
                  value=""
                />
                <EditableField
                  label="Hình thức đào tạo"
                  fieldId="trainingType"
                  type="select"
                  value=""
                  options={[
                    { value: "chinh-quy", label: "Chính quy" },
                    { value: "tai-chuc", label: "Tại chức" },
                    { value: "tu-xa", label: "Từ xa" },
                  ]}
                />
                <EditableField
                  label="Mã chương trình"
                  fieldId="programCode"
                  value=""
                />
              </div>
              <div className="mt-6">
                <EditableField
                  label="Khung chương trình"
                  fieldId="framework"
                  type="textarea"
                  rows={3}
                  value=""
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-6 rounded-lg border bg-card-bg border-border-primary">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                  Chi tiết thời gian
                </h3>
                <EditableField
                  label="Tổng thời gian đào tạo"
                  fieldId="totalTime"
                  value=""
                />
              </div>
              <div className="p-6 rounded-lg border bg-card-bg border-border-primary">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                  Chi tiết tín chỉ
                </h3>
                <EditableField
                  label="Tổng số tín chỉ"
                  fieldId="totalCredits"
                  type="number"
                  value=""
                />
              </div>
            </div>
          </div>
        );

      case "objectives":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r rounded-lg border from-background-subtle to-background-muted border-border-primary">
              <h2 className="mb-6 text-2xl font-bold text-text-primary">
                Mục tiêu đào tạo
              </h2>

              <div className="mb-6">
                <EditableField
                  label="Giới thiệu chung"
                  fieldId="objectiveIntro"
                  type="textarea"
                  rows={4}
                  value=""
                />
              </div>

              <ListEditor title="Các mục tiêu cụ thể" items={[]} />
            </div>

            <div className="p-6 rounded-lg border bg-card-bg border-border-primary">
              <h3 className="mb-4 text-lg font-semibold text-text-primary">
                Phẩm chất chính trị và đạo đức
              </h3>
              <ListEditor title="Các yêu cầu về phẩm chất" items={[]} />
            </div>

            <div className="p-6 rounded-lg border bg-card-bg border-border-primary">
              <h3 className="mb-4 text-lg font-semibold text-text-primary">
                Kiến thức
              </h3>
              <ListEditor title="Các yêu cầu về kiến thức" items={[]} />
            </div>

            <div className="p-6 rounded-lg border bg-card-bg border-border-primary">
              <h3 className="mb-4 text-lg font-semibold text-text-primary">
                Kỹ năng chuyên môn
              </h3>
              <ListEditor title="Các kỹ năng cần đạt được" items={[]} />
            </div>
          </div>
        );

      case "curriculum":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r rounded-lg border from-background-subtle to-background-muted border-border-primary">
              <h2 className="mb-6 text-2xl font-bold text-text-primary">
                Chương trình học chi tiết
              </h2>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((semester) => (
                  <div
                    key={semester}
                    className="rounded-lg border bg-card-bg border-border-primary"
                  >
                    <button
                      onClick={() => toggleSection(`semester-${semester}`)}
                      className="flex justify-between items-center p-4 w-full text-left transition-colors hover:bg-background-subtle"
                    >
                      <h3 className="text-lg font-semibold text-text-primary">
                        Học kỳ {semester}
                      </h3>
                      {expandedSections[`semester-${semester}`] ? (
                        <ChevronDown className="text-text-muted" size={20} />
                      ) : (
                        <ChevronRight className="text-text-muted" size={20} />
                      )}
                    </button>

                    {expandedSections[`semester-${semester}`] && (
                      <div className="p-4 border-t border-border-primary">
                        <ListEditor
                          title={`Các môn học học kỳ ${semester}`}
                          items={[]}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "careers":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r rounded-lg border from-background-subtle to-background-muted border-border-primary">
              <h2 className="mb-6 text-2xl font-bold text-text-primary">
                Cơ hội nghề nghiệp
              </h2>

              <ListEditor title="Các lĩnh vực nghề nghiệp" items={[]} />
            </div>
          </div>
        );

      case "admission":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r rounded-lg border from-background-subtle to-background-muted border-border-primary">
              <h2 className="mb-6 text-2xl font-bold text-text-primary">
                Thông tin tuyển sinh
              </h2>

              <EditableField
                label="Đối tượng tuyển sinh"
                fieldId="targetApplicants"
                type="textarea"
                rows={4}
                value=""
              />

              <EditableField
                label="Phương thức xét tuyển"
                fieldId="admissionMethod"
                type="textarea"
                rows={3}
                value=""
              />

              <EditableField
                label="Tổ hợp môn xét tuyển"
                fieldId="subjectCombination"
                type="textarea"
                rows={2}
                value=""
              />
            </div>
          </div>
        );

      case "structure":
        return (
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r rounded-lg border from-background-subtle to-background-muted border-border-primary">
              <h2 className="mb-6 text-2xl font-bold text-text-primary">
                Cấu trúc chương trình
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-4 rounded-lg border bg-card-bg border-border-primary">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    Khối kiến thức chung
                  </h3>
                  <EditableField
                    label="Số tín chỉ"
                    fieldId="generalCredits"
                    type="number"
                    value=""
                  />
                </div>

                <div className="p-4 rounded-lg border bg-card-bg border-border-primary">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    Khối kiến thức cơ sở ngành
                  </h3>
                  <EditableField
                    label="Số tín chỉ"
                    fieldId="foundationCredits"
                    type="number"
                    value=""
                  />
                </div>

                <div className="p-4 rounded-lg border bg-card-bg border-border-primary">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    Khối kiến thức chuyên ngành
                  </h3>
                  <EditableField
                    label="Số tín chỉ"
                    fieldId="specializedCredits"
                    type="number"
                    value=""
                  />
                </div>

                <div className="p-4 rounded-lg border bg-card-bg border-border-primary">
                  <h3 className="mb-3 font-semibold text-text-primary">
                    Thực tập và đồ án
                  </h3>
                  <EditableField
                    label="Số tín chỉ"
                    fieldId="practicalCredits"
                    type="number"
                    value=""
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Nội dung tab không có sẵn</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background-base">
      {/* Header */}
      <div className="border-b shadow-sm bg-header-bg border-header-border">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Settings className="text-text-link" size={24} />
              <h1 className="text-xl font-semibold text-header-text">
                Quản lý nội dung chương trình đào tạo
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 space-x-2 rounded-md transition-colors text-text-on-primary bg-button-secondary-bg hover:bg-button-secondary-hover">
                <Eye size={16} />
                <span>Xem trước</span>
              </button>
              <button className="flex items-center px-4 py-2 space-x-2 rounded-md transition-colors text-text-on-primary bg-button-primary-bg hover:bg-button-primary-hover">
                <Save size={16} />
                <span>Lưu tất cả</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b shadow-sm bg-header-bg border-header-border">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "border-text-link text-text-link"
                      : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-primary"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {renderTabContent()}
      </div>

      {/* Floating Save Button */}
      {isEditing && (
        <div className="fixed right-6 bottom-6">
          <div className="flex items-center px-4 py-2 space-x-2 rounded-full shadow-lg text-text-on-primary bg-button-primary-bg">
            <Edit3 size={16} />
            <span>Đang chỉnh sửa...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContentEditor;

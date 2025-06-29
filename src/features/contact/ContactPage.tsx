import React, { useState, useEffect } from "react";
import {
  Edit3,
  Save,
  X,
  Send,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Clock,
  Building,
  MessageSquare,
  Calendar,
  Navigation,
  Home,
  Info,
  FileText,
} from "lucide-react";
import contactData from "./data/contact.json";

// TypeScript interfaces
interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

interface ContactData {
  title: string;
  name: string;
  description: string;
  addressLabel: string;
  address: string;
  phoneLabel: string;
  phone: string;
  emailLabel: string;
  email: string;
  websiteLabel: string;
  website: string;
  facebookLabel: string;
  facebook: string;
  workingHoursLabel: string;
  workingHours: string;
  mapLabel: string;
  mapLink: string;
  findUsTitle: string;
  findUsDescription: string;
  quickContactTitle: string;
  quickContactDescription: string;
  emailSupportTitle: string;
  emailSupportDescription: string;
  visitCampusTitle: string;
  visitCampusDescription: string;
  officeHoursTitle: string;
  officeHoursDescription: string;
}

const ContactPage = () => {
  const [data, setData] = useState<ContactData>(contactData as ContactData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    const isChanged = JSON.stringify(data) !== JSON.stringify(contactData);
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
  const updateField = (field: keyof ContactData, value: string) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Submit to server
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
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
    setData(contactData as ContactData);
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
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-primary">
                  Quản lý thông tin liên hệ
                </h3>
                <p className="text-text-secondary">
                  Chỉnh sửa thông tin liên hệ và địa chỉ của Học viện
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
        {/* Main Information Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-secondary via-secondary-dark to-primary">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Building className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Thông tin chính</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Info size={20} className="text-secondary" />
                Tiêu đề trang
              </h3>
              <EditableText
                value={data.title}
                onChange={(value) => updateField("title", value)}
                placeholder="Nhập tiêu đề trang..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Home size={20} className="text-secondary" />
                Tên Học viện
              </h3>
              <EditableText
                value={data.name}
                onChange={(value) => updateField("name", value)}
                placeholder="Nhập tên Học viện..."
              />
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <FileText size={20} className="text-secondary" />
                Mô tả
              </h3>
              <EditableText
                value={data.description}
                onChange={(value) => updateField("description", value)}
                multiline={true}
                placeholder="Nhập mô tả Học viện..."
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-success via-success-dark to-accent">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">Thông tin liên hệ</h2>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                  <MapPin size={20} className="text-success" />
                  {data.addressLabel}
                </h3>
                <EditableText
                  value={data.address}
                  onChange={(value) => updateField("address", value)}
                  multiline={true}
                  placeholder="Nhập địa chỉ..."
                />
              </div>

              <div>
                <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                  <Phone size={20} className="text-success" />
                  {data.phoneLabel}
                </h3>
                <EditableText
                  value={data.phone}
                  onChange={(value) => updateField("phone", value)}
                  placeholder="Nhập số điện thoại..."
                />
              </div>

              <div>
                <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                  <Mail size={20} className="text-success" />
                  {data.emailLabel}
                </h3>
                <EditableText
                  value={data.email}
                  onChange={(value) => updateField("email", value)}
                  placeholder="Nhập email..."
                />
              </div>

              <div>
                <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                  <Globe size={20} className="text-success" />
                  {data.websiteLabel}
                </h3>
                <EditableText
                  value={data.website}
                  onChange={(value) => updateField("website", value)}
                  placeholder="Nhập website..."
                />
              </div>

              <div>
                <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                  <Facebook size={20} className="text-success" />
                  {data.facebookLabel}
                </h3>
                <EditableText
                  value={data.facebook}
                  onChange={(value) => updateField("facebook", value)}
                  placeholder="Nhập link Facebook..."
                />
              </div>

              <div>
                <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                  <Clock size={20} className="text-success" />
                  {data.workingHoursLabel}
                </h3>
                <EditableText
                  value={data.workingHours}
                  onChange={(value) => updateField("workingHours", value)}
                  placeholder="Nhập giờ làm việc..."
                />
              </div>
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-semibold text-text-primary">
                <Navigation size={20} className="text-success" />
                {data.mapLabel}
              </h3>
              <EditableText
                value={data.mapLink}
                onChange={(value) => updateField("mapLink", value)}
                placeholder="Nhập link bản đồ..."
              />
            </div>
          </div>
        </div>

        {/* Service Sections */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Find Us Section */}
          <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
            <div className="p-6 text-white bg-gradient-to-r from-accent via-accent-dark to-warning">
              <div className="flex gap-3 items-center">
                <div className="p-2 rounded-lg bg-white/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">{data.findUsTitle}</h2>
              </div>
            </div>

            <div className="p-6">
              <EditableText
                value={data.findUsDescription}
                onChange={(value) => updateField("findUsDescription", value)}
                multiline={true}
                placeholder="Nhập mô tả tìm chúng tôi..."
              />
            </div>
          </div>

          {/* Quick Contact Section */}
          <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
            <div className="p-6 text-white bg-gradient-to-r from-info via-secondary to-primary">
              <div className="flex gap-3 items-center">
                <div className="p-2 rounded-lg bg-white/20">
                  <Phone className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">
                  {data.quickContactTitle}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <EditableText
                value={data.quickContactDescription}
                onChange={(value) =>
                  updateField("quickContactDescription", value)
                }
                multiline={true}
                placeholder="Nhập mô tả liên hệ nhanh..."
              />
            </div>
          </div>

          {/* Email Support Section */}
          <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
            <div className="p-6 text-white bg-gradient-to-r from-warning via-warning-dark to-error">
              <div className="flex gap-3 items-center">
                <div className="p-2 rounded-lg bg-white/20">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">
                  {data.emailSupportTitle}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <EditableText
                value={data.emailSupportDescription}
                onChange={(value) =>
                  updateField("emailSupportDescription", value)
                }
                multiline={true}
                placeholder="Nhập mô tả hỗ trợ email..."
              />
            </div>
          </div>

          {/* Visit Campus Section */}
          <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
            <div className="p-6 text-white bg-gradient-to-r from-primary via-primary-dark to-error">
              <div className="flex gap-3 items-center">
                <div className="p-2 rounded-lg bg-white/20">
                  <Building className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">
                  {data.visitCampusTitle}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <EditableText
                value={data.visitCampusDescription}
                onChange={(value) =>
                  updateField("visitCampusDescription", value)
                }
                multiline={true}
                placeholder="Nhập mô tả thăm quan cơ sở..."
              />
            </div>
          </div>
        </div>

        {/* Office Hours Section */}
        <div className="overflow-hidden rounded-2xl border shadow-xl bg-card-bg border-border-primary">
          <div className="p-6 text-white bg-gradient-to-r from-success via-success-dark to-accent">
            <div className="flex gap-3 items-center">
              <div className="p-2 rounded-lg bg-white/20">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold">{data.officeHoursTitle}</h2>
            </div>
          </div>

          <div className="p-8">
            <EditableText
              value={data.officeHoursDescription}
              onChange={(value) => updateField("officeHoursDescription", value)}
              multiline={true}
              placeholder="Nhập mô tả giờ làm việc..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

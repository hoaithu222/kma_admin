import {
  FileText,
  Users,
  Image,
  Tag,
  Settings,
  BarChart3,
  PlusCircle,
  Eye,
  Edit,
  Search,
  Bell,
  Calendar,
  TrendingUp,
} from "lucide-react";

const HomePage = () => {
  const stats = [
    {
      title: "Tổng bài viết",
      value: "247",
      icon: FileText,
      color: "bg-secondary",
    },
    { title: "Người dùng", value: "1,234", icon: Users, color: "bg-success" },
    { title: "Hình ảnh", value: "892", icon: Image, color: "bg-accent" },
    { title: "Tags", value: "156", icon: Tag, color: "bg-warning" },
  ];

  const quickActions = [
    {
      title: "Đăng bài mới",
      icon: PlusCircle,
      color: "bg-secondary hover:bg-secondary-dark",
    },
    {
      title: "Xem bài viết",
      icon: Eye,
      color: "bg-success hover:bg-success-dark",
    },
    {
      title: "Chỉnh sửa",
      icon: Edit,
      color: "bg-warning hover:bg-warning-dark",
    },
    {
      title: "Cài đặt",
      icon: Settings,
      color: "bg-primary hover:bg-primary-dark",
    },
  ];

  const recentActivity = [
    { action: "Bài viết mới được đăng", time: "2 phút trước", icon: FileText },
    { action: "Người dùng mới đăng ký", time: "15 phút trước", icon: Users },
    { action: "Hình ảnh được upload", time: "1 giờ trước", icon: Image },
    { action: "Tag mới được tạo", time: "2 giờ trước", icon: Tag },
  ];

  return (
    <div className="min-h-screen p-6 rounded-lg bg-background-base">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-text-primary">
              Trang Quản Lý Thông Tin
            </h1>
            <p className="text-text-secondary">
              Đăng bài viết, quản lý bài viết, quản lý người dùng và nội dung
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 transition-shadow rounded-lg shadow-sm bg-background-surface hover:shadow-md">
              <Bell className="w-5 h-5 text-text-secondary" />
            </button>
            <button className="p-2 transition-shadow rounded-lg shadow-sm bg-background-surface hover:shadow-md">
              <Search className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 transition-shadow shadow-sm bg-background-surface rounded-xl hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-text-secondary">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-text-on-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-text-primary">
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`${action.color} text-text-on-primary p-4 rounded-xl shadow-sm hover:shadow-md transition-all transform hover:scale-105 flex flex-col items-center space-y-2`}
            >
              <action.icon className="w-8 h-8" />
              <span className="text-sm font-medium">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="p-6 shadow-sm bg-background-surface lg:col-span-2 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">
              Hoạt động gần đây
            </h2>
            <Calendar className="w-5 h-5 text-text-muted" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center p-3 space-x-3 transition-colors rounded-lg bg-background-muted hover:bg-background-subtle"
              >
                <div className="p-2 rounded-lg bg-background-surface">
                  <activity.icon className="w-4 h-4 text-text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">
                    {activity.action}
                  </p>
                  <p className="text-xs text-text-muted">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="p-6 shadow-sm bg-background-surface rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">
              Thống kê
            </h2>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-success-light">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success-dark">
                  Lượt xem hôm nay
                </span>
              </div>
              <span className="text-sm font-bold text-success">+12%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary-light">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary-dark">
                  Người dùng mới
                </span>
              </div>
              <span className="text-sm font-bold text-secondary">+8%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent-light">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent-dark">
                  Bài viết mới
                </span>
              </div>
              <span className="text-sm font-bold text-accent">+15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Management Shortcuts */}
      <div className="p-6 mt-8 shadow-sm bg-background-surface rounded-xl">
        <h2 className="mb-4 text-xl font-semibold text-text-primary">
          Quản lý nhanh
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 transition-colors border rounded-lg cursor-pointer border-border-primary hover:border-secondary">
            <div className="flex items-center mb-2 space-x-3">
              <FileText className="w-5 h-5 text-secondary" />
              <h3 className="font-medium text-text-primary">
                Quản lý bài viết
              </h3>
            </div>
            <p className="text-sm text-text-secondary">
              Tạo, chỉnh sửa và xóa bài viết
            </p>
            <div className="flex items-center mt-3 space-x-2">
              <button className="px-2 py-1 text-xs rounded text-secondary bg-secondary-light">
                Xem tất cả
              </button>
              <button className="px-2 py-1 text-xs rounded text-success bg-success-light">
                Thêm mới
              </button>
            </div>
          </div>

          <div className="p-4 transition-colors border rounded-lg cursor-pointer border-border-primary hover:border-success">
            <div className="flex items-center mb-2 space-x-3">
              <Users className="w-5 h-5 text-success" />
              <h3 className="font-medium text-text-primary">
                Quản lý người dùng
              </h3>
            </div>
            <p className="text-sm text-text-secondary">
              Quản lý tài khoản và quyền hạn
            </p>
            <div className="flex items-center mt-3 space-x-2">
              <button className="px-2 py-1 text-xs rounded text-success bg-success-light">
                Danh sách
              </button>
              <button className="px-2 py-1 text-xs rounded text-secondary bg-secondary-light">
                Phân quyền
              </button>
            </div>
          </div>

          <div className="p-4 transition-colors border rounded-lg cursor-pointer border-border-primary hover:border-accent">
            <div className="flex items-center mb-2 space-x-3">
              <Image className="w-5 h-5 text-accent" />
              <h3 className="font-medium text-text-primary">Quản lý media</h3>
            </div>
            <p className="text-sm text-text-secondary">
              Upload và tổ chức hình ảnh
            </p>
            <div className="flex items-center mt-3 space-x-2">
              <button className="px-2 py-1 text-xs rounded text-accent bg-accent-light">
                Thư viện
              </button>
              <button className="px-2 py-1 text-xs rounded text-warning bg-warning-light">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

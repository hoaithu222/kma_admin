import {
  LayoutDashboardIcon,
  UsersIcon,
  FileTextIcon,
  FolderKanbanIcon,
  FolderTreeIcon,
  TagsIcon,
  CalendarClockIcon,
  SettingsIcon,
} from "lucide-react";

interface NavbarItem {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavbarItem[];
}

export const NavbarItems: NavbarItem[] = [
  {
    label: "Thống kê tổng quan",
    icon: LayoutDashboardIcon, // Đổi từ ChartBarIcon
    path: "/dashboard",
  },
  {
    label: "Người dùng",
    icon: UsersIcon, // Đổi từ UserIcon
    path: "/user-management",
  },
  {
    label: "Danh sách bài viết",
    icon: FileTextIcon, // Đổi từ NewspaperIcon
    path: "/posts",
  },
  {
    label: "Danh mục",
    icon: FolderKanbanIcon, // Đổi từ FolderIcon
    path: "/categories",
  },
  {
    label: "Danh mục con",
    icon: FolderTreeIcon, // Đổi từ FolderIcon
    path: "/subcategories",
  },
  {
    label: "Danh sách tag",
    icon: TagsIcon, // Đổi từ TagIcon
    path: "/tags",
  },
  {
    label: "Sự kiện sắp tới",
    icon: CalendarClockIcon, // Đổi từ ClipboardIcon
    path: "/event",
  },
  {
    label: "Cài đặt hệ thống",
    icon: SettingsIcon, // Đổi từ CogIcon
    path: "/setting",
  },
];

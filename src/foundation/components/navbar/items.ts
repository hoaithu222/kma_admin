import {
  LayoutDashboardIcon,
  UsersIcon,
  FileTextIcon,
  FolderKanbanIcon,
  FolderTreeIcon,
  TagsIcon,
  SettingsIcon,
  ImageIcon,
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
    path: "/",
  },
  {
    label: "Giảng viên",
    icon: UsersIcon, // Đổi từ UserIcon
    path: "/teachers",
    children: [
      {
        label: "Giảng viên",
        icon: UsersIcon, // Đổi từ UserIcon
        path: "/teachers",
      },
      {
        label: "Chuyên ngành",
        icon: FolderTreeIcon, // Đổi từ UserIcon
        path: "/majors",
      },
      {
        label: "Chuyên ngành con",
        icon: FolderTreeIcon, // Đổi từ UserIcon
        path: "/sub-majors",
      },
    ],
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
    label: "Danh sách media",
    icon: ImageIcon, // Đổi từ TagIcon
    path: "/media",
  },
  // {
  //   label: "Sự kiện sắp tới",
  //   icon: CalendarClockIcon, // Đổi từ ClipboardIcon
  //   path: "/event",
  // },
  {
    label: "Cài đặt hệ thống",
    icon: SettingsIcon, // Đổi từ CogIcon
    path: "/setting",
  },
];

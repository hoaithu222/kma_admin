import {
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  BookIcon,
  ClipboardIcon,
  BellIcon,
  CameraIcon,
  CogIcon,
  FolderIcon,
  MessageCircleIcon,
  NewspaperIcon,
  TagIcon,
} from "lucide-react";
interface NavbarItem {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavbarItem[];
}
export const NavbarItems: NavbarItem[] = [
  {
    label: "Trang chủ",
    icon: HomeIcon,
    path: "/",
    children: [
      {
        label: "Thống kê tổng quan",
        icon: ChartBarIcon,
        path: "/dashboard",
      },
    ],
  },
  {
    label: "Quản lý người dùng",
    icon: UserIcon,
    path: "/users",
    children: [
      {
        label: "Danh sách người dùng",
        icon: UserIcon,
        path: "/users",
      },
      {
        label: "Phân quyền",
        icon: ClipboardIcon,
        path: "/roles",
      },
    ],
  },
  {
    label: "Quản lý bài viết",
    icon: NewspaperIcon,
    path: "/posts",
    children: [
      {
        label: "Danh mục",
        icon: FolderIcon,
        path: "/categories",
      },
      {
        label: "Danh mục chuyên môn",
        icon: TagIcon,
        path: "/subcategories",
      },
      {
        label: "Danh sách bài viết",
        icon: BookIcon,
        path: "/posts",
      },
    ],
  },
  {
    label: "Quản lý bình luận",
    icon: MessageCircleIcon,
    path: "/comments",
  },
  {
    label: "Thông báo & sự kiện",
    icon: BellIcon,
    path: "/notifications",
    children: [
      {
        label: "Danh sách thông báo",
        icon: BellIcon,
        path: "/notifications",
      },
      {
        label: "Sự kiện sắp tới",
        icon: ClipboardIcon,
        path: "/events",
      },
    ],
  },
  {
    label: "Quản lý hình ảnh / Media",
    icon: CameraIcon,
    path: "/media",
  },
  {
    label: "Cài đặt hệ thống",
    icon: CogIcon,
    path: "/settings",
  },
];

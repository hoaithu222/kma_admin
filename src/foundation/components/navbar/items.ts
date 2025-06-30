import {
  UsersIcon,
  FileTextIcon,
  FolderKanbanIcon,
  FolderTreeIcon,
  TagsIcon,
  ImageIcon,
  BookOpenIcon,
  CalendarIcon,
  HomeIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  GlobeIcon,
  AwardIcon,
  ShieldIcon,
  NewspaperIcon,
  BellIcon,
  DatabaseIcon,
  VideoIcon,
  FileImageIcon,
  SchoolIcon,
  BookMarkedIcon,
  LightbulbIcon,
  Users2Icon,
  CalendarDaysIcon,
  MegaphoneIcon,
  HandshakeIcon,
  FlaskConicalIcon,
  UserCogIcon,
  Building2Icon,
  MailIcon,
} from "lucide-react";

interface NavbarItem {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavbarItem[];
  role?: string;
}

export const NavbarItems: NavbarItem[] = [
  {
    label: "Quản lý trang chủ",
    icon: HomeIcon,
    path: "/",
    children: [
      {
        label: "Banner",
        icon: ImageIcon,
        path: "/",
      },
      {
        label: "Tin tức mới nhất",
        icon: NewspaperIcon,
        path: "/new-post",
      },
      {
        label: "Sự kiện mới nhất",
        icon: CalendarDaysIcon,
        path: "/new-event",
      },
      {
        label: "Hợp tác đối ngoại",
        icon: HandshakeIcon,
        path: "/international-cooperation",
      },
      {
        label: "Sinh viên",
        icon: Users2Icon,
        path: "/students",
      },
    ],
  },
  {
    label: "Giảng viên",
    icon: GraduationCapIcon,
    path: "/teachers",
    children: [
      {
        label: "Giảng viên",
        icon: UsersIcon,
        path: "/teachers",
      },
      {
        label: "Chuyên ngành",
        icon: SchoolIcon,
        path: "/majors",
      },
      {
        label: "Chuyên ngành con",
        icon: FolderTreeIcon,
        path: "/sub-majors",
      },
    ],
  },
  {
    label: "Cài đặt menu",
    icon: FolderKanbanIcon,
    path: "/categories",
    children: [
      {
        label: "Danh mục",
        icon: FolderKanbanIcon,
        path: "/categories",
      },
      {
        label: "Danh mục con",
        icon: FolderTreeIcon,
        path: "/subcategories",
      },
    ],
  },
  {
    label: "Bài viết",
    icon: FileTextIcon,
    path: "/posts",
    children: [
      {
        label: "Bài viết",
        icon: FileTextIcon,
        path: "/posts",
      },

      {
        label: "Danh sách tag",
        icon: TagsIcon,
        path: "/tags",
      },
      {
        label: "Danh sách media",
        icon: FileImageIcon,
        path: "/media",
      },
    ],
  },
  // tuyển sinh
  {
    label: "Tuyển sinh",
    icon: BookMarkedIcon,
    path: "/admission",
    children: [
      {
        label: "Tuyển sinh công nghệ thông tin",
        icon: DatabaseIcon,
        path: "/admission",
      },
      {
        label: "Tuyển sinh an toàn thông tin",
        icon: ShieldIcon,
        path: "/admission-security",
      },
      {
        label: "Tuyển sinh điện tử viễn thông",
        icon: VideoIcon,
        path: "/admission-telecommunication",
      },
    ],
  },
  // nghiên cứu
  {
    label: "Nghiên cứu",
    icon: LightbulbIcon,
    path: "/research",
    children: [
      {
        label: "Nghiên cứu khoa học",
        icon: FlaskConicalIcon,
        path: "/research",
      },
      {
        label: "Đề tài nghiên cứu",
        icon: BookOpenIcon,
        path: "/research-topic",
      },
    ],
  },
  // sinh viên
  {
    label: "Sinh viên",
    icon: Users2Icon,
    path: "/student-activity",
    children: [
      {
        label: "Hoạt động ngoại khóa",
        icon: AwardIcon,
        path: "/student-activity",
      },
      {
        label: "Việc làm thực tập",
        icon: BriefcaseIcon,
        path: "/student-job",
      },
      {
        label: "Hỗ trợ sinh viên",
        icon: UsersIcon,
        path: "/student-support",
      },
      {
        label: "Hướng dẫn thủ tục",
        icon: FileTextIcon,
        path: "/student-guide",
      },
      {
        label: "Đồ án thực hành",
        icon: BookOpenIcon,
        path: "/student-practice",
      },
      {
        label: "Đào tạo tuyển sinh",
        icon: GraduationCapIcon,
        path: "/student-education",
      },
      {
        label: "Cựu sinh viên",
        icon: UsersIcon,
        path: "/student-alumni",
      },
    ],
  },
  // sự kiện
  {
    label: "Sự kiện",
    icon: CalendarIcon,
    path: "/event",
    children: [
      {
        label: "Sự kiện mới",
        icon: CalendarDaysIcon,
        path: "/event-new",
      },
      {
        label: "Sự kiện sắp tới",
        icon: CalendarIcon,
        path: "/event-fall",
      },
      {
        label: "Sự kiện đã diễn ra",
        icon: CalendarIcon,
        path: "/event-spring",
      },
    ],
  },
  // tin tức
  {
    label: "Tin tức",
    icon: MegaphoneIcon,
    path: "/news",
    children: [
      {
        label: "Thông báo chung",
        icon: BellIcon,
        path: "/news-notice",
      },
      {
        label: "Hợp tác đối ngoại",
        icon: GlobeIcon,
        path: "/news-cooperation",
      },
      {
        label: "Nghiên cứu khoa học",
        icon: LightbulbIcon,
        path: "/news-research",
      },
    ],
  },
  // // chuyên ngành
  // {
  //   label: "Chuyên ngành",
  //   icon: SchoolIcon,
  //   path: "/majors-it",
  //   role: "ADMIN",
  //   children: [
  //     {
  //       label: "Ngành công nghệ thông tin",
  //       icon: DatabaseIcon,
  //       path: "/majors-it",
  //       role: "ADMIN",
  //     },
  //     {
  //       label: "Ngành an toàn thông tin",
  //       icon: ShieldIcon,
  //       path: "/majors-security",
  //       role: "ADMIN",
  //     },
  //     {
  //       label: "Ngành điện tử viễn thông",
  //       icon: VideoIcon,
  //       path: "/majors-telecommunication",
  //       role: "ADMIN",
  //     },
  //   ],
  // },

  // Giới thiệu
  {
    label: "Giới thiệu",
    icon: BookOpenIcon,
    path: "/introduction",
    role: "ADMIN",
    children: [
      {
        label: "Tổng quan",
        icon: BookOpenIcon,
        path: "/introduction",
        role: "ADMIN",
      },
      {
        label: "Cơ cấu đào tạo",
        icon: Building2Icon,
        path: "/training-structure",
        role: "ADMIN",
      },
      {
        label: "Tổ chức",
        icon: Building2Icon,
        path: "/organization",
        role: "ADMIN",
      },
    ],
  },
  // đào tạo
  {
    label: "Đào tạo",
    icon: BookOpenIcon,
    path: "/training",
    role: "ADMIN",
    children: [
      {
        label: "Chương trình đào tạo đại học",
        icon: BookOpenIcon,
        path: "/training",
        role: "ADMIN",
      },
      {
        label: "Chương trình đào tạo thạc sĩ",
        icon: BookOpenIcon,
        path: "/training-master",
        role: "ADMIN",
      },
    ],
  },
  // liên hệ
  {
    label: "Liên hệ",
    icon: MailIcon,
    path: "/contact",
    role: "ADMIN",
  },

  // // đào tạo
  // {
  //   label: "Đào tạo",
  //   icon: BookOpenIcon,
  //   path: "/training",
  //   children: [
  //     {
  //       label: "Chương trình đại học",
  //       icon: BookOpenIcon,
  //       path: "/training-list",
  //     },
  //     {
  //       label: "Chương trình thạc sĩ",
  //       icon: BookOpenIcon,
  //       path: "/training-list",
  //     },
  //   ],
  // },
  // {
  //   label: "Chương trình đào tạo",
  //   icon: FolderTreeIcon,
  //   path: "/department",
  //   children: [
  //     {
  //       label: "Chương trình đào tạo ngành công nghệ thông tin",
  //       icon: BookOpenIcon,
  //       path: "/department-list",
  //     },
  //     {
  //       label: "Chương trình đào tạo ngành an toàn thông tin",
  //       icon: BookOpenIcon,
  //       path: "/department-list",
  //     },
  //     {
  //       label: "Chương trình đào tạo ngành công điện tử viễn thông",
  //       icon: BookOpenIcon,
  //       path: "/department-list",
  //     },
  //   ],
  // },
  {
    label: "Quản lý người dùng",
    icon: UserCogIcon,
    path: "/user-management",
    role: "ADMIN",
  },
  // {
  //   label: "Sự kiện sắp tới",
  //   icon: CalendarClockIcon, // Đổi từ ClipboardIcon
  //   path: "/event",
  // },
  // {
  //   label: "Cài đặt hệ thống",
  //   icon: SettingsIcon, // Đổi từ CogIcon
  //   path: "/setting",
  // },
];

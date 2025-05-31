import { lazy } from "react";

const AuthPage = lazy(() => import("@/features/auth/AuthPage"));
const SubcategoryPage = lazy(
  () => import("@/features/subcategory/SubcategoryPage")
);
const HomePage = lazy(() => import("@/features/home/HomePage"));
const PostPage = lazy(() => import("@/features/posts/PostPage"));
const CategoryPage = lazy(() => import("@/features/category/CategoryPage"));
const Setting = lazy(() => import("@/features/setting/Setting"));
const StudentInternship = lazy(() => import("@/features/student/internship"));
const StudentPracticeProject = lazy(
  () => import("@/features/student/practice-project")
);
const StudentResearch = lazy(
  () => import("@/features/student/student-research")
);
const StudentRules = lazy(() => import("@/features/student/student-rules"));
// const Thesis = lazy(() => import("@/features/student/thesis"));
const DashBoard = lazy(() => import("@/features/dashboard/DashBoard"));
const UserManagement = lazy(
  () => import("@/features/user-management/UserManagement")
);
const Media = lazy(() => import("@/features/media/Media"));
const Event = lazy(() => import("@/features/event/index"));
const NotPermisstion = lazy(() => import("@/layout/NotPermisstion"));
const Decentralization = lazy(
  () => import("@/features/user-management/decentralization/Decentralization")
);
const defaultOptions = {
  requireAuth: true,
  hideInMenu: false,
};
const defaultAuthOptions = {
  ...defaultOptions,
  requireAuth: true,
};

export const ROUTE = {
  home: {
    path: "/",
    element: <HomePage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  posts: {
    path: "/posts",
    element: <PostPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  categories: {
    path: "/categories",
    element: <CategoryPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  subcategories: {
    path: "/subcategories",
    element: <SubcategoryPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  auth: {
    path: "/auth",
    element: <AuthPage />,
    layout: "auth",
    options: {
      requireAuth: false,
      hideInMenu: false,
    },
  },
  dashboard: {
    path: "/dashboard",
    element: <DashBoard />,
    layout: "main",
    options: defaultAuthOptions,
  },
  userManagement: {
    path: "/user-management",
    element: <UserManagement />,
    layout: "main",
    options: defaultAuthOptions,
  },
  decentralization: {
    path: "/decentralization",
    element: <Decentralization />,
    layout: "main",
    options: defaultAuthOptions,
  },
  media: {
    path: "/media",
    element: <Media />,
    layout: "main",
    options: defaultAuthOptions,
  },
  event: {
    path: "/event",
    element: <Event />,
    layout: "main",
    options: defaultAuthOptions,
  },

  studentInternship: {
    path: "/student-internship",
    element: <StudentInternship />,
    layout: "main",
    options: defaultAuthOptions,
  },
  studentPracticeProject: {
    path: "/student-practice-project",
    element: <StudentPracticeProject />,
    layout: "main",
    options: defaultAuthOptions,
  },
  studentResearch: {
    path: "/student-research",
    element: <StudentResearch />,
    layout: "main",
    options: defaultAuthOptions,
  },
  studentRules: {
    path: "/student-rules",
    element: <StudentRules />,
    layout: "main",
    options: defaultAuthOptions,
  },

  setting: {
    path: "/setting",
    element: <Setting />,
    layout: "main",
    options: defaultAuthOptions,
  },
  notPermisstion: {
    path: "/not-permisstion",
    element: <NotPermisstion />,
    layout: "main",
    options: defaultAuthOptions,
  },
} satisfies Record<
  string,
  {
    path: string;
    element: React.ReactNode;
    layout: React.ReactNode;
    options: {
      requireAuth: boolean;
      hideInMenu: boolean;
    };
  }
>;

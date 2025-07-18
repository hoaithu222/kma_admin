import { lazy } from "react";

const AuthPage = lazy(() => import("@/features/auth/AuthPage"));
const RegisterPage = lazy(
  () => import("@/features/auth/components/RegisterPage")
);

const SubcategoryPage = lazy(
  () => import("@/features/subcategory/SubcategoryPage")
);
const HomePage = lazy(() => import("@/features/home/HomePage"));
const PostPage = lazy(() => import("@/features/posts/PostPage"));
const CategoryPage = lazy(() => import("@/features/category/CategoryPage"));
const Setting = lazy(() => import("@/features/setting/Setting"));

const UserManagement = lazy(
  () => import("@/features/user-management/UserManagement")
);
const MajorPage = lazy(() => import("@/features/major/MajorPage"));

const NotPermisstion = lazy(() => import("@/layout/NotPermisstion"));

const DetailPost = lazy(
  () => import("@/features/posts/components/detail-posts/DetailPost")
);
const LecturerPage = lazy(() => import("@/features/lecturer/LecturerPage"));
const DetailLecturer = lazy(
  () => import("@/features/lecturer/components/detail/DetailLecturer")
);
const SubMajorPage = lazy(() => import("@/features/submajor/SubMajorPage"));
const NotFound = lazy(() => import("@/layout/NotFound"));
const TagPage = lazy(() => import("@/features/tags/TagPage"));
const MediaPage = lazy(() => import("@/features/media/Media"));
const UserManagementPage = lazy(
  () => import("@/features/user-management/UserManagement")
);
const NewEventPage = lazy(
  () => import("@/features/home/components/new-event/NewEventPage")
);
const CooperationPage = lazy(
  () => import("@/features/home/components/cooperation/CooperationPage")
);
const NewStudentPost = lazy(
  () => import("@/features/home/components/students/NewStudentPost")
);
const NewPostPage = lazy(
  () => import("@/features/home/components/new-post/NewPostPage")
);
// tuyển sinh
const AdminssionInfoPage = lazy(
  () => import("@/features/admission/AdminssionInfoPage")
);
const AdminssionSecurityPage = lazy(
  () => import("@/features/admission/AdminssionSecurityPage")
);
const AdminssionTelePage = lazy(
  () => import("@/features/admission/AdminssionTelePage")
);
// nghiên cứu
const ResearchPage = lazy(() => import("@/features/research/ResearchPage"));
const ResearchTopicPage = lazy(
  () => import("@/features/research/ResearchTopicPage")
);
// sinh viên
const StudentActivity = lazy(
  () => import("@/features/students/StudentActivity")
);
const StudentJob = lazy(() => import("@/features/students/StudentJob"));
const StudentSupport = lazy(() => import("@/features/students/StudentSupport"));
const StudentGuide = lazy(() => import("@/features/students/StudentGuide"));
const StudentPracitie = lazy(
  () => import("@/features/students/StudentPracitie")
);
const StudentEducation = lazy(
  () => import("@/features/students/StudentEducation")
);
const StudentAlumni = lazy(() => import("@/features/students/StudentAlumni"));
// sự kiện
const EventNew = lazy(() => import("@/features/event/EventNew"));
const EventFall = lazy(() => import("@/features/event/EventFall"));
const EventSpring = lazy(() => import("@/features/event/EventSpring"));
// tin tức
const NewNotiPage = lazy(() => import("@/features/new/NewNotiPage"));
const NewCooperation = lazy(() => import("@/features/new/NewCooperation"));
const NewResearch = lazy(() => import("@/features/new/NewResearch"));

// chuyên ngành
const MajorsIt = lazy(
  () => import("@/foundation/components/major/pages/MajorsIt")
);
const MajorTele = lazy(
  () => import("@/foundation/components/major/pages/MajorTele")
);
const MajorSecurity = lazy(
  () => import("@/foundation/components/major/pages/MajorSecurity")
);
// giới thiệu
const Overview = lazy(() => import("@/features/about/components/Overview"));
const TrainingStructure = lazy(
  () => import("@/features/about/components/TrainingStructure")
);
const Organizations = lazy(
  () => import("@/features/about/components/Organizations")
);
// đào tạo
const Training = lazy(
  () => import("@/features/training/components/UndergraduateProgram")
);
const TrainingMaster = lazy(
  () => import("@/features/training/components/Master")
);
// liên hệ
const ContactPage = lazy(() => import("@/features/contact/ContactPage"));
const BasePostPage = lazy(
  () => import("@/foundation/components/base/HomePage")
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
  register: {
    path: "/register",
    element: <RegisterPage />,
    layout: "auth",
    options: {
      requireAuth: false,
      hideInMenu: false,
    },
  },

  userManagement: {
    path: "/user-management",
    element: <UserManagement />,
    layout: "main",
    options: defaultAuthOptions,
  },
  media: {
    path: "/media",
    element: <MediaPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  majors: {
    path: "/majors",
    element: <MajorPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  subMajors: {
    path: "/sub-majors",
    element: <SubMajorPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  basePost: {
    path: "/base-post/:id",
    element: <BasePostPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  tags: {
    path: "/tags",
    element: <TagPage />,
    layout: "main",
    options: defaultAuthOptions,
  },

  teachers: {
    path: "/teachers",
    element: <LecturerPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  setting: {
    path: "/setting",
    element: <Setting />,
    layout: "main",
    options: defaultAuthOptions,
  },
  detailPost: {
    path: "/posts/:id",
    element: <DetailPost />,
    layout: "main",
    options: defaultAuthOptions,
  },
  detailLecturer: {
    path: "/lecturers/:id",
    element: <DetailLecturer />,
    layout: "main",
    options: defaultAuthOptions,
  },
  userManagementPage: {
    path: "/user-management",
    element: <UserManagementPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  notPermisstion: {
    path: "/not-permisstion",
    element: <NotPermisstion />,
    layout: "blank",
    options: {
      requireAuth: false,
      hideInMenu: false,
    },
  },
  notFound: {
    path: "/not-found",
    element: <NotFound />,
    layout: "blank",
    options: {
      requireAuth: false,
      hideInMenu: false,
    },
  },
  // trang chủ
  newPostPage: {
    path: "/new-post",
    element: <NewPostPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  newEvent: {
    path: "/new-event",
    element: <NewEventPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  cooperation: {
    path: "/international-cooperation",
    element: <CooperationPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  students: {
    path: "/students",
    element: <NewStudentPost />,
    layout: "main",
    options: defaultAuthOptions,
  },
  // tuyển sinh
  admission: {
    path: "/admission",
    element: <AdminssionInfoPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  admissionSecurity: {
    path: "/admission-security",
    element: <AdminssionSecurityPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  admissionTelecommunication: {
    path: "/admission-telecommunication",
    element: <AdminssionTelePage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  // nghiên cứu
  research: {
    path: "/research",
    element: <ResearchPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  researchTopic: {
    path: "/research-topic",
    element: <ResearchTopicPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  // sinh viên
  studentActivity: {
    path: "/student-activity",
    element: <StudentActivity />,
    layout: "main",
    options: defaultAuthOptions,
  },
  studentJob: {
    path: "/student-job",
    element: <StudentJob />,
    layout: "main",
    options: defaultAuthOptions,
  },
  studentSupport: {
    path: "/student-support",
    element: <StudentSupport />,
    layout: "main",
    options: defaultAuthOptions,
  },
  studentGuide: {
    path: "/student-guide",
    element: <StudentGuide />,
    layout: "main",
    options: defaultAuthOptions,
  },
  studentPracitie: {
    path: "/student-practice",
    element: <StudentPracitie />,
    layout: "main",
    options: defaultAuthOptions,
  },
  studentEducation: {
    path: "/student-education",
    element: <StudentEducation />,
    layout: "main",
    options: defaultAuthOptions,
  },
  studentAlumni: {
    path: "/student-alumni",
    element: <StudentAlumni />,
    layout: "main",
    options: defaultAuthOptions,
  },
  // sự kiện
  eventNew: {
    path: "/event-new",
    element: <EventNew />,
    layout: "main",
    options: defaultAuthOptions,
  },
  eventFall: {
    path: "/event-fall",
    element: <EventFall />,
    layout: "main",
    options: defaultAuthOptions,
  },
  eventSpring: {
    path: "/event-spring",
    element: <EventSpring />,
    layout: "main",
    options: defaultAuthOptions,
  },
  // tin tức
  newsNotice: {
    path: "/news-notice",
    element: <NewNotiPage />,
    layout: "main",
    options: defaultAuthOptions,
  },
  newsCooperation: {
    path: "/news-cooperation",
    element: <NewCooperation />,
    layout: "main",
    options: defaultAuthOptions,
  },
  newsResearch: {
    path: "/news-research",
    element: <NewResearch />,
    layout: "main",
    options: defaultAuthOptions,
  },
  // chuyên ngành
  majorsIt: {
    path: "/majors-it",
    element: <MajorsIt />,
    layout: "main",
    options: defaultAuthOptions,
  },
  majorsTele: {
    path: "/majors-telecommunication",
    element: <MajorTele />,
    layout: "main",
    options: defaultAuthOptions,
  },
  majorsSecurity: {
    path: "/majors-security",
    element: <MajorSecurity />,
    layout: "main",
    options: defaultAuthOptions,
  },
  // giới thiệu
  overview: {
    path: "/introduction",
    element: <Overview />,
    layout: "main",
    options: defaultAuthOptions,
  },
  trainingStructure: {
    path: "/training-structure",
    element: <TrainingStructure />,
    layout: "main",
    options: defaultAuthOptions,
  },
  organizations: {
    path: "/organization",
    element: <Organizations />,
    layout: "main",
    options: defaultAuthOptions,
  },
  // đào tạo
  training: {
    path: "/training",
    element: <Training />,
    layout: "main",
    options: defaultAuthOptions,
  },
  trainingMaster: {
    path: "/training-master",
    element: <TrainingMaster />,
    layout: "main",
    options: defaultAuthOptions,
  },
  // liên hệ
  contact: {
    path: "/contact",
    element: <ContactPage />,
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

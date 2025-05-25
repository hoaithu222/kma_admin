import NotPermisstion from "@/layout/NotPermisstion";
import { lazy } from "react";

const AuthPage = lazy(() => import("@/features/auth/AuthPage"));
const SubcategoryPage = lazy(
  () => import("@/features/subcategory/SubcategoryPage")
);
const HomePage = lazy(() => import("@/features/home/HomePage"));
const PostPage = lazy(() => import("@/features/posts/PostPage"));
const CategoryPage = lazy(() => import("@/features/category/CategoryPage"));

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

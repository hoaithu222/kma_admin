import { lazy } from "react";

const LoginPage = lazy(() => import("@/features/auth/Login.tsx"));
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
  login: {
    path: "/login",
    element: <LoginPage />,
    layout: "login",
    options: defaultOptions,
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

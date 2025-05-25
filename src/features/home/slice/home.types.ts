import { ReduxStateType } from "@/app/store/types";
// import { IArticle } from "@/core/api/home/types";

interface initialStateType {
  articles: any[];
  status: ReduxStateType;
  error: string | null;
  filter: {
    page: number;
    size: number;
  };
  category: any;
}

export type { initialStateType };

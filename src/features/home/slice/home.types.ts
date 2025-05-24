import { ReduxStateType } from "@/app/store/types";
import { IPost } from "@/core/api/home/types";

interface initialStateType {
  posts: IPost[];
  status: ReduxStateType;
  error: string | null;
  filter: {
    page: number;
    size: number;
  };
  category: any;
}

export type { initialStateType };

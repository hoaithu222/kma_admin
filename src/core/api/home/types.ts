export interface IRequestBanner {
  sort: string;
  order: string;
  page: number;
  size: number;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  file_dto: [
    {
      id: number;
      downloadUrl: string;
    },
  ];
  author: string;
  owner: string;
}

export interface IResponseBanner {
  data: IPost[];
}
export interface IResponseCategory {
  data: any;
}

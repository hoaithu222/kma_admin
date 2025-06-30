export interface Page {
  id: string;
  title: string;
  content: string | Record<string, any>;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse {
  data: Page[];
}

export interface PageRequestWithId {
  id: string;
}
export interface PageRequestUpdate {
  id: string;
  title: string;
  content: string | Record<string, any>;
  path: string;
}

export interface PageRequestCreate {
  title: string;
  content: string | Record<string, any>;
  path: string;
}

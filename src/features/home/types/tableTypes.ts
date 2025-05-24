export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
}

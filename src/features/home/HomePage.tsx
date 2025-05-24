import Table from "@/foundation/components/table/Table";
import { TableColumn } from "./types/tableTypes";
import clsx from "clsx";

const HomePage = () => {
  const columns: TableColumn[] = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "Name",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "phone",
      title: "Phone",
    },
  ];
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "1234567890",
    },
  ];
  return (
    <div
      className={clsx(
        "h-full p-3 border rounded-lg shadow-sm shadow-text-primary",
        "border-border-primary bg-background-base text-text-primary"
      )}
    >
      <Table columns={columns} data={data} hover={true} />
    </div>
  );
};

export default HomePage;

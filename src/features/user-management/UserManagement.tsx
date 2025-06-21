import Button from "@/foundation/components/buttons/Button";
import { useUser } from "./hooks/useUser";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import AddUser from "./components/AddUser";

import ListUser from "./components/ListUser";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../auth/slice/auth.selector";

const UserManagement = () => {
  const { isModalAddUser, openModalAddUserDispatch } = useUser();
  const user = useSelector(selectUser);
  const role = user?.role;
  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }
  return (
    <div
      className={clsx(
        "p-3 h-full rounded-lg border shadow-sm shadow-text-primary",
        "border-border-primary bg-background-base text-text-primary",
        "overflow-auto hidden-scrollbar"
      )}
    >
      <div className="flex justify-between items-center border-b-2 border-border-primary">
        <div className="flex gap-2 items-center p-2">
          <h2 className="text-2xl font-bold text-secondary">
            Quản lý người dùng
          </h2>
        </div>
        <Button
          variant="secondary"
          iconLeft={<PlusIcon className="w-4 h-4 hover:animate-spin" />}
          onClick={() => openModalAddUserDispatch()}
        >
          Thêm người dùng
        </Button>
      </div>
      <div className="mt-4">
        <ListUser />
      </div>
      {isModalAddUser && <AddUser />}
    </div>
  );
};

export default UserManagement;

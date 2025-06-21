import Modal from "@/foundation/components/modal/Modal";

import Input from "@/foundation/components/inputs/Input";
import { LockIcon, PlusIcon, User } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import { useState } from "react";

import { useUser } from "../hooks/useUser";

import { IRequestUpdateUser } from "@/core/api/auth/types";
import { updateUser } from "@/core/api/auth";

const EditUser = () => {
  const { editUser, closeModalUpdateUserDispatch } = useUser();
  const [form, setForm] = useState<IRequestUpdateUser>({
    username: editUser?.username || "",
  });
  const handleSubmit = () => {
    updateUser(editUser?.username || "", {
      username: form.username,
      password: form.password,
    });
    closeModalUpdateUserDispatch();
  };
  return (
    <Modal
      isOpen={true}
      onOpenChange={() => closeModalUpdateUserDispatch()}
      title="Sửa người dùng"
      size="large"
      animation="slide"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Tên người dùng"
          fullWidth
          label="Tên người dùng"
          className="w-full"
          name="username"
          iconLeft={<User className="w-4 h-4" />}
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          placeholder="Mật khẩu"
          fullWidth
          label="Mật khẩu"
          className="w-full"
          name="password"
          type="password"
          showPasswordToggle={true}
          iconLeft={<LockIcon className="w-4 h-4" />}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="flex justify-end">
          <Button
            variant="gradientPrimary"
            type="submit"
            loading={false}
            iconLeft={<PlusIcon className="w-4 h-4" />}
          >
            Sửa người dùng
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUser;

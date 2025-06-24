import Modal from "@/foundation/components/modal/Modal";

import Input from "@/foundation/components/inputs/Input";
import { LockIcon, PlusIcon, User } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import { useState, useEffect } from "react";

import { useUser } from "../hooks/useUser";

import { IRequestUpdateUser } from "@/core/api/auth/types";
import { useSelector } from "react-redux";
import { selectEditUser } from "../slice/user.selector";

const EditUser = () => {
  const editUser = useSelector(selectEditUser);
  const { handleUpdateUser, updateUser } = useUser();
  const [form, setForm] = useState<IRequestUpdateUser>({
    username: editUser?.username || "",
    password: "",
  });

  // Cập nhật form khi editUser thay đổi
  useEffect(() => {
    if (editUser) {
      setForm({
        username: editUser.username || "",
        password: "",
      });
    }
  }, [editUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser?.id && form.username.trim()) {
      updateUser(editUser.id, form.username);
      handleUpdateUser(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onOpenChange={() => handleUpdateUser(false)}
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
          required
        />
        <Input
          placeholder="Mật khẩu (để trống nếu không thay đổi)"
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

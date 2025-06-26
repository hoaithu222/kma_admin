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
    fullName: editUser?.fullName || "",
    password: "",
  });

  // Cập nhật form khi editUser thay đổi
  useEffect(() => {
    if (editUser) {
      setForm({
        fullName: editUser.fullName || "",
        password: "",
        active: editUser.active,
      });
    }
  }, [editUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser?.id && form.fullName?.trim()) {
      updateUser(editUser.id, {
        fullName: form.fullName,
        password: form.password,
        active: form.active,
      });
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
          placeholder="Họ và tên"
          fullWidth
          label="Họ và tên"
          className="w-full"
          name="fullName"
          iconLeft={<User className="w-4 h-4" />}
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
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

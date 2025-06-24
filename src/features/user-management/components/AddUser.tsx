import Modal from "@/foundation/components/modal/Modal";

import Input from "@/foundation/components/inputs/Input";
import { Lock, PlusIcon, User } from "lucide-react";
import Button from "@/foundation/components/buttons/Button";
import { useState } from "react";

import { useUser } from "../hooks/useUser";

import { IRegister } from "@/core/api/auth/types";

const AddUser = () => {
  const { addUser, handleAddUser } = useUser();
  const [form, setForm] = useState<IRegister>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn reload trang
    if (form.username.trim() && form.password.trim()) {
      addUser(form.username, form.password);
      // Không đóng modal ngay, để saga xử lý
      // handleAddUser(false);
      // Reset form
      setForm({ username: "", password: "" });
    }
  };

  return (
    <Modal
      isOpen={true}
      onOpenChange={() => handleAddUser(false)}
      title="Thêm người dùng"
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
          placeholder="Mật khẩu"
          fullWidth
          label="Mật khẩu"
          type="password"
          showPasswordToggle={true}
          className="w-full"
          name="password"
          iconLeft={<Lock className="w-4 h-4" />}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <div className="flex justify-end">
          <Button
            variant="gradientPrimary"
            type="submit"
            iconLeft={<PlusIcon className="w-4 h-4" />}
          >
            Thêm người dùng
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUser;

import clsx from "clsx";
import logo from "@/assets/logo.png";

import Button from "@/foundation/components/buttons/Button";
import { User } from "lucide-react";
import FloatingInput from "@/foundation/components/inputs/FloatingInput";
import { IRequestLogin } from "@/core/api/auth/types";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const { isLoadingLogin, onSubmitLogin } = useAuth();
  const [data, setData] = useState<IRequestLogin>({
    username: "",
    password: "",
    active: true,
    role: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={clsx(
        "w-full max-w-md",
        "min-h-96  p-8 py-10",
        "bg-background-elevated rounded-lg",
        "shadow-md shadow-text-on-accent",
        "relative"
      )}
    >
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl text-text-link">Chào mừng bạn đến với Web</h2>
        <p className="text-text-on-accent">
          Vui lòng đăng nhập để tiếp tục sử dụng dịch vụ
        </p>
      </div>
      <div className="absolute -left-10 -top-10">
        <img src={logo} alt="logo" className="w-20 h-20 lg:w-28 lg:h-28 " />
      </div>
      <form
        className="flex flex-col gap-10 mt-10"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitLogin(data);
        }}
      >
        <FloatingInput
          label="Tên đăng nhập"
          fullWidth
          iconLeft={<User />}
          className="bg-transparent"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
        <FloatingInput
          label="Mật khẩu"
          showPasswordToggle
          fullWidth
          className="bg-transparent "
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <Button
          variant="secondary"
          size="large"
          disabled={isLoadingLogin}
          type="submit"
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;

import { Outlet } from "react-router-dom";
import bg from "@/assets/background.jpg";

const AuthLayout = () => {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 z-0 w-full h-full">
        <img src={bg} alt="bg" className="object-cover w-full h-full" />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

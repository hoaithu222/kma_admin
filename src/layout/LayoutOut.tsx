import { Outlet } from "react-router-dom";

const LayoutOut = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
      <Outlet />
    </div>
  );
};

export default LayoutOut;

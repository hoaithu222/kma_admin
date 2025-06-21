import { Outlet } from "react-router-dom";

const LayoutOut = () => {
  return (
    <div className="flex justify-center items-center p-4 min-h-screen">
      <Outlet />
    </div>
  );
};

export default LayoutOut;

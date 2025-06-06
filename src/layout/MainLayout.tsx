import Header from "@/foundation/components/header/Header";
import Navbar from "@/foundation/components/navbar/Navbar";
import clsx from "clsx";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-12 pt-24">
        <div className="min-h-[calc(100vh-120px)]  col-span-2 border-r rounded-md bg-header-bg border-border-strong">
          <Navbar />
        </div>
        <div
          className={clsx(
            "col-span-10 px-4 min-h-[calc(100vh-120px)] overflow-y-auto hidden-scrollbar"
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

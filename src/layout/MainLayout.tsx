import Header from "@/foundation/components/header/Header";
import Navbar from "@/foundation/components/navbar/Navbar";
import clsx from "clsx";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-12 pt-20">
        <div className="min-h-screen col-span-2 border-r bg-header-bg border-border-strong">
          <Navbar />
        </div>
        <div className={clsx("col-span-10 p-4")}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

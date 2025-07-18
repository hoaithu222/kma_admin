import Header from "@/foundation/components/header/Header";
import Navbar from "@/foundation/components/navbar/Navbar";
import clsx from "clsx";

import { Outlet } from "react-router-dom";
import { useMenu } from "@/features/menu/hooks/useMenu";
import { useEffect } from "react";

const MainLayout = () => {
  const { handleGetMenu } = useMenu();
  useEffect(() => {
    handleGetMenu();
  }, []);
  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-12 pt-24">
        <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-auto hidden-scrollbar col-span-2 border-r rounded-md bg-header-bg border-border-strong">
          <Navbar />
        </div>
        <div
          className={clsx(
            "overflow-auto col-span-10 px-4 max-h-[calc(100vh-120px)] hidden-scrollbar",
            "relative"
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

import clsx from "clsx";
// import React from "react";
import { Outlet } from "react-router-dom";
import { ToastProvider } from "./foundation/components/notification/Toast";
import { ToastContainer } from "react-toastify";

// import ToastContainer from "./widgets/toast/ToastContainer";

/**
 * Appshell là layout chính của toàn bộ ứng dụng
 * Được render 1 lần duy nhất
 * Chứa các thành phần chung như Appbar,Toast,Modal,Dialog,Tooltip,Popover,
 * Dùng <Outlet /> để render các layout con (main,login,extension)
 * Mục tiêu: tránh render lại khi chuyển trang
 * giữ lại trạng thái của modal toast
 *  Là nơi khởi tạo hook toàn cục
 */
const AppShell = () => {
  // Warning tuyệt đổi không thêm localStorage ở đây
  return (
    <ToastProvider position="top-right" maxToasts={5}>
      <div
        className={clsx(
          "box-border flex min-h-screen flex-col rounded-lg bg-background-overlay text-center overflow-hidden overflow-x-hidden hidden-scrollbar"
        )}
      >
        {/* Outlet se được render layout tương ứng với router hiện tại (main,login,extension) */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Outlet />
        </div>
        {/* Các Modal,Toast,Dialog,Tooltip,Popover, sẽ được render ở đây */}
        {/* <ToastContainer /> */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </ToastProvider>
  );
};

export default AppShell;

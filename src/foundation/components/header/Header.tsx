import clsx from "clsx";
import Logo from "./Logo";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 z-40",
        "flex items-center",
        "shadow-lg shadow-header-border bg-header-bg h-20"
      )}
    >
      <div className="container flex flex-col items-center justify-between mx-auto">
        <div className="grid w-full grid-cols-2 gap-2 ">
          <Logo />
          <HeaderRight />
        </div>
      </div>
    </div>
  );
};

export default Header;

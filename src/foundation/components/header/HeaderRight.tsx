import {
  LogOut,
  MoonIcon,
  SearchIcon,
  Settings,
  SunIcon,
  User,
} from "lucide-react";
import InputSearch from "../inputs/InputSearch";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleTheme } from "@/app/store/slices/theme";
import CustomDropdownMenu, {
  DropdownItem,
} from "../dropdown/CustomDropdownMenu";
import { selectUser } from "@/features/auth/slice/auth.selector";
import { logoutUser } from "@/features/auth/slice/auth.slice";

import { useNavigate } from "react-router-dom";

const HeaderRight = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleLogout = () => {
    dispatch(logoutUser({ sessionId: user?.session.sessionId || "" }));
    navigate("/auth");
    localStorage.removeItem("persist:auth");
  };
  return (
    <div className="flex items-center justify-end flex-1 gap-2">
      <InputSearch
        placeholder="Tìm kiếm"
        name="search"
        onChange={handleSearch}
        value={search}
        icon={<SearchIcon className="w-6 h-6 text-text-link-hover" />}
      />
      <div className="flex items-center gap-3">
        {theme === "light" ? (
          <SunIcon
            className="w-8 h-8 text-text-secondary"
            onClick={() => dispatch(toggleTheme())}
          />
        ) : (
          <MoonIcon
            className="w-8 h-8 text-text-secondary"
            onClick={() => dispatch(toggleTheme())}
          />
        )}
        <CustomDropdownMenu
          variant="default"
          size="sm"
          trigger={
            <button className="flex items-center p-2 space-x-2 rounded-lg hover:bg-background-muted">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                <User className="w-4 h-4 text-text-on-primary" />
              </div>
              <span className="text-sm font-medium text-text-primary">
                {user?.username}
              </span>
            </button>
          }
        >
          <DropdownItem icon={<User />}>Profile</DropdownItem>
          <DropdownItem icon={<Settings />}>Settings</DropdownItem>
          <DropdownItem type="separator">{""}</DropdownItem>
          <DropdownItem icon={<LogOut />} destructive onSelect={handleLogout}>
            Logout
          </DropdownItem>
        </CustomDropdownMenu>
        {/* <div className="rounded-full p-0.5 bg-primary-light">
          {user ? (
            <div className="rounded-full w-14 h-14">
              <img
                src={""}
                alt="avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          ) : (
            <UserIcon className="w-8 h-8 text-text-on-primary" />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default HeaderRight;

import { MoonIcon, SearchIcon, SunIcon, UserIcon } from "lucide-react";
import InputSearch from "../inputs/InputSearch";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { toggleTheme } from "@/app/store/slices/theme";

const HeaderRight = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const user = false;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const { theme } = useSelector((state: RootState) => state.theme);

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
        <div className="rounded-full p-0.5 bg-primary-light">
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
        </div>
      </div>
    </div>
  );
};

export default HeaderRight;

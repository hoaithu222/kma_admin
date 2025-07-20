import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { menuItemLast, NavbarItems } from "./items";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/auth/slice/auth.selector";
import { useMenu } from "@/features/menu/hooks/useMenu";
import {
  AwardIcon,
  BookOpenIcon,
  BriefcaseIcon,
  FileImageIcon,
  FileTextIcon,
  GlobeIcon,
  HomeIcon,
  ShieldIcon,
  UserIcon,
  GraduationCapIcon,
  NewspaperIcon,
  CalendarDaysIcon,
  HandshakeIcon,
  UserCogIcon,
  Building2Icon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GroupIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserCheckIcon,
  UserXIcon,
  UserCircleIcon,
  ChevronRightIcon,
  CircleIcon,
} from "lucide-react";

interface NavbarItem {
  label: string;
  icon: React.ElementType;
  path: string;
  children?: NavbarItem[];
  role?: string;
}

interface MenuData {
  id: number;
  name: string;
  slug: string;
  description: string;
  level: number;
  children?: MenuData[];
  isVisible: boolean;
  displayOrder: number;
}

const Navbar = () => {
  const { t } = useTranslation("home");
  const { menu } = useMenu();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Danh sách icon để sử dụng tuần hoán
  const iconList = [
    BookOpenIcon,
    HomeIcon,
    UserIcon,
    FileTextIcon,
    FileImageIcon,
    BriefcaseIcon,
    GlobeIcon,
    AwardIcon,
    ShieldIcon,
    GraduationCapIcon,
    NewspaperIcon,
    CalendarDaysIcon,
    HandshakeIcon,
    UserCogIcon,
    Building2Icon,
    MailIcon,
    PhoneIcon,
    MapPinIcon,
    GroupIcon,
    UserPlusIcon,
    UserMinusIcon,
    UserCheckIcon,
    UserXIcon,
    UserCircleIcon,
  ];

  const getIconByIndex = (index: number) => {
    return iconList[index % iconList.length];
  };

  // Hàm đệ quy để chuyển đổi menu data thành NavbarItem structure
  const convertMenuToNavbarItems = (
    menuItems: MenuData[],
    level: number = 0
  ): NavbarItem[] => {
    return (
      menuItems?.map((item, index) => {
        const navbarItem: NavbarItem = {
          label: item.name,
          path: `/base-post/${item.id}`,
          icon:
            level === 0
              ? getIconByIndex(index)
              : level === 1
                ? getIconByIndex(index + 5)
                : CircleIcon,
        };

        // Xử lý children đệ quy
        if (item.children && item.children.length > 0) {
          navbarItem.children = convertMenuToNavbarItems(
            item.children,
            level + 1
          );
        }

        return navbarItem;
      }) || []
    );
  };

  // Chuyển đổi menu data thành NavbarItem structure
  const dynamicItems = convertMenuToNavbarItems(menu);

  const toggleExpanded = (itemPath: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemPath)
        ? prev.filter((path) => path !== itemPath)
        : [...prev, itemPath]
    );
  };

  const user = useSelector(selectUser);
  const role = user?.role;

  // CSS classes cho các level khác nhau
  const getNavClass =
    (level: number = 0) =>
    ({ isActive }: { isActive: boolean }) =>
      clsx(
        "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
        "hover:shadow-md hover:scale-[1.02]",
        `ml-${level * 4}`, // Tăng margin left theo level
        isActive
          ? "bg-primary text-white font-semibold border-l-4 border-primary shadow-md"
          : "text-text-navbar font-medium hover:bg-background-subtle hover:text-primary"
      );

  const getChildNavClass =
    (level: number = 1) =>
    ({ isActive }: { isActive: boolean }) =>
      clsx(
        "flex items-center gap-2 p-2.5 rounded-md transition-all duration-300",
        "hover:shadow-sm hover:scale-[1.01]",
        `ml-${(level + 1) * 3}`, // Tăng margin left theo level
        isActive
          ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary shadow-sm"
          : "text-text-navbar/80 font-normal hover:bg-background-subtle hover:text-primary"
      );

  // Component đệ quy để render menu items
  const renderNavItem = (
    item: NavbarItem,
    level: number = 0,
    parentPath: string = ""
  ): JSX.Element => {
    const itemKey = `${parentPath}-${item.label}-${level}`;
    const isExpanded = expandedItems.includes(itemKey);
    const hasChildren = item.children && item.children.length > 0;

    // Filter children based on role if they exist
    const filteredChildren = hasChildren
      ? item.children?.filter(
          (child) => !("role" in child) || !child.role || child.role === role
        ) || []
      : [];

    return (
      <div key={itemKey} className="group">
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(itemKey)}
            className={clsx(
              "w-full",
              getNavClass(level)({ isActive: false }),
              "hover:bg-background-subtle/50"
            )}
          >
            <item.icon
              className={clsx(
                "flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                level === 0 ? "w-5 h-5" : level === 1 ? "w-4 h-4" : "w-3 h-3"
              )}
            />
            <span className="flex-1 text-left text-text-primary">
              {t(item.label)}
            </span>
            <ChevronRightIcon
              className={clsx(
                "w-4 h-4 transition-transform duration-300",
                isExpanded ? "rotate-90" : ""
              )}
            />
          </button>
        ) : (
          <NavLink
            to={item.path}
            className={
              level === 0 ? getNavClass(level) : getChildNavClass(level - 1)
            }
          >
            <item.icon
              className={clsx(
                "flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                level === 0 ? "w-5 h-5" : level === 1 ? "w-4 h-4" : "w-3 h-3",
                level > 0 && "opacity-70"
              )}
            />
            <span className="text-text-primary">{t(item.label)}</span>
          </NavLink>
        )}

        {hasChildren && isExpanded && (
          <div
            className={clsx(
              "mt-1 space-y-1 animate-fadeIn",
              level > 0 && "border-l border-border-subtle ml-4 pl-2"
            )}
          >
            {filteredChildren.map((child) =>
              renderNavItem(child, level + 1, itemKey)
            )}
          </div>
        )}
      </div>
    );
  };

  // Kết hợp tất cả nav items
  const allNavItems = [...NavbarItems, ...dynamicItems, ...menuItemLast];

  return (
    <nav
      className={clsx(
        "flex overflow-y-auto flex-col col-span-2 gap-2 p-2 pt-4 h-full rounded-lg",
        "text-text-primary bg-header-bg",
        "border-r shadow-lg shadow-header-border border-border-strong",
        "scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      )}
    >
      {allNavItems
        .filter((item) => {
          // Show item if it has no role restriction or if user's role matches item's role
          return !("role" in item) || !item.role || item.role === role;
        })
        .map((item) => renderNavItem(item, 0))}
    </nav>
  );
};

export default Navbar;

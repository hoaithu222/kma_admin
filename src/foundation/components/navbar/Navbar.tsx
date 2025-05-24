import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { NavbarItems } from "./items";
import clsx from "clsx";

const Navbar = () => {
  const { t } = useTranslation("home");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemLabel: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemLabel)
        ? prev.filter((label) => label !== itemLabel)
        : [...prev, itemLabel]
    );
  };

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-primary text-primary font-semibold border-l-4 border-primary shadow-sm"
        : "text-text-navbar font-medium hover:bg-background-subtle hover:text-primary-4 hover:translate-x-1"
    }`;

  const childNavClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 p-2 ml-6 rounded-md transition-all duration-200 ${
      isActive
        ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary shadow-sm"
        : "text-text-navbar/80 font-normal hover:bg-background-subtle hover:text-primary-4 hover:translate-x-1"
    }`;

  return (
    <nav
      className={clsx(
        "flex flex-col h-full col-span-2 gap-2 pt-4 p-2 overflow-y-auto ",
        "text-text-primary bg-header-bg",
        "shadow-lg shadow-header-border border-r border-border-strong"
      )}
    >
      {NavbarItems.map((item) => (
        <div key={item.label} className="group">
          {item.children ? (
            <button
              onClick={() => toggleExpanded(item.label)}
              className={`w-full ${navClass({ isActive: false })}`}
            >
              <item.icon className="flex-shrink-0 w-5 h-5" />
              <span className="flex-1 text-left text-text-primary">
                {t(item.label)}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedItems.includes(item.label) ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            <NavLink to={item.path} className={navClass}>
              <item.icon className="flex-shrink-0 w-5 h-5" />
              <span className="flex-1 text-text-primary">{t(item.label)}</span>
            </NavLink>
          )}

          {item.children && expandedItems.includes(item.label) && (
            <div className="mt-1 space-y-1 animate-fadeIn">
              {item.children.map((child) => (
                <NavLink
                  to={child.path}
                  key={child.label}
                  className={childNavClass}
                >
                  <child.icon className="flex-shrink-0 w-4 h-4 opacity-70" />
                  <span className="text-text-primary">{t(child.label)}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navbar;

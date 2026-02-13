import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const menuItems = [
  {
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/",
  },
  {
    label: "Products",
    icon: <AppstoreOutlined />,
    path: "/products",
  },
  {
    label: "Settings",
    icon: <SettingOutlined />,
    path: "/settings",
  },
];

function Sidebar({ collapsed, mobile }) {
  return (
    <aside
      className={`
        bg-white border-r border-gray-200 h-full
        transition-all duration-300 ease-in-out
        ${mobile ? "w-64" : collapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="flex flex-col h-full p-4">
        
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          {!collapsed || mobile ? (
            <h2 className="text-lg font-semibold text-indigo-600">
              IntriCareTech
            </h2>
          ) : (
            <span className="text-indigo-600 font-bold text-xl">
              IC
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-3 py-2 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `
              }
            >
              <span className="text-lg">{item.icon}</span>

              {(!collapsed || mobile) && (
                <span className="text-sm font-medium">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;

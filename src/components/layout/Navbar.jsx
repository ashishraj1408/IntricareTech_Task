import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";

function Navbar({
  collapsed,
  setCollapsed,
  setMobileOpen,
}) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-lg text-gray-600"
            onClick={() => setMobileOpen(true)}
          >
            <MenuOutlined />
          </button>

          {/* Desktop Toggle */}
          <button
            className="hidden lg:block text-lg text-gray-600"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuFoldOutlined />
            )}
          </button>

          <h1 className="text-lg font-semibold text-indigo-600">
            Product Dashboard
          </h1>
        </div>

        <div className="text-sm text-gray-500 hidden sm:block">
          Admin Panel
        </div>
      </div>
    </header>
  );
}

export default Navbar;

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Container from "./Container";

function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      
     {/* Desktop Sidebar  */}
      <div className="hidden lg:block h-full">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed z-50 lg:hidden h-full">
            <Sidebar collapsed={false} mobile />
          </div>
        </>
      )}

      {/* Right Section */}
      <div className="flex-1 flex flex-col h-full">

        {/* Fixed Navbar */}
        <div className="flex-shrink-0">
          <Navbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setMobileOpen={setMobileOpen}
          />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto py-6">
          <Container>
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "pages/App/subcomponents/MainLayout/subcomponents/SideBar";
import Navbar from "pages/App/subcomponents/MainLayout/subcomponents/Navbar";
interface LayoutProps {
  children?: React.ReactNode;
  seoData?: any; // Adjust the type according to your SEO data structure
}

const Layout: React.FC<LayoutProps> = ({ children, seoData }) => {
  return (
    <div className="flex flex-col bg-[#F8F7FA] md:min-h-screen">
      {/* { seoData} */}
      <Navbar seoData={seoData || {}} />
      <div className="flex flex-1">
        <span className="hidden md:block">
          <Sidebar />
        </span>
        <main className="flex-1">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default Layout;

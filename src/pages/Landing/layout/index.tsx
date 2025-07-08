import React from "react";
import { Outlet } from "react-router-dom";
import NavbarLanding from "./navbar";
import FooterLanding from "./footer";

interface LandingLayoutProps {
  children?: React.ReactNode;
  seoData?: any;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children, seoData }) => {
  return (
    <div>
      <main className="relative min-h-screen overflow-hidden bg-gray-50 from-violet-950 to-slate-900">
        <div className="absolute left-[-34px] top-[-43px] h-40 w-40 rounded-full bg-fuchsia-600 blur-[150px]" />
        <div className="absolute left-[1801px] top-[940px] h-40 w-40 rounded-full bg-fuchsia-600 blur-[150px]" />
        {/* Background pattern */}
        {/* <div className="bg-[url('/728cd5b65cd47a89a10bd504ab9b558b.png'), lightgray 0px -0.042px / 100.673% 101.304% no-repeat;] aspect-1933/1080 absolute inset-0 z-0 opacity-20"></div> */}
        {/* { seoData } */}
        <NavbarLanding seoData={seoData} />
        {children || <Outlet />}
      </main>
      <FooterLanding />
    </div>
  );
};

export default LandingLayout;

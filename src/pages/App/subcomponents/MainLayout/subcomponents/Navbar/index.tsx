import { useState } from "react";
import "./style.scss";
import { Drawer, Avatar, Button, Dropdown, Menu, Popover } from "antd";
import Thailan from "assets/images/svg/thailan.svg";
import English from "assets/images/svg/unitedstates.svg";
import Logo from "assets/LogoSystem/logo-mobile.svg";
import { RootState } from "configs/configureStore";
//@ts-ignore
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Icons from "assets/icons";
import "pages/App/subcomponents/MainLayout/subcomponents/HeaderLayout/style.scss";
import InforPopover from "pages/App/subcomponents/MainLayout/subcomponents/InforPopover";
import Sidebar from "../SideBar";
const Navbar = ({ seoData }: any) => {
  const { t, i18n } = useTranslation();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const appState = useSelector((state: RootState) => state.appSlice);
  const userBalance = appState.account.balance || 0;

  const [isHovered, setIsHovered] = useState(false);
  const [isBellHovered, setIsBellHovered] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // State for drawer visibility

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleBellMouseEnter = () => setIsBellHovered(true);
  const handleBellMouseLeave = () => setIsBellHovered(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  const showDrawer = () => setIsDrawerVisible(true); // Show drawer
  const closeDrawer = () => setIsDrawerVisible(false); // Close drawer

  const languageMenu = (
    <Menu>
      <Menu.Item key="en" onClick={() => changeLanguage("en")}>
        <div className="flex items-center justify-stretch gap-1">
          <img src={English} alt="English" width={24} height={24} />
          <p>English</p>
        </div>
      </Menu.Item>
      <Menu.Item key="th" onClick={() => changeLanguage("th")}>
        <div className="flex items-center justify-stretch gap-1">
          <img src={Thailan} alt="Thai" width={24} height={24} />
          <p>Thai</p>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex h-16 items-center justify-between bg-gradient-to-r from-[#ED1157] via-[#E41679] to-[#9207C4] px-3 md:px-6">
      {/* Logo and name */}
      <div className="flex items-center justify-stretch gap-1">
        <button className="mr-2 text-white md:hidden" onClick={showDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
        <div className="mr-2 flex items-center">
          <img src={seoData?.site_logo} width={35} height={35} alt="" />
        </div>
        <div className="text-[18px] font-bold leading-[100%] tracking-[0%] text-white">
          {window.location.hostname}
        </div>
      </div>

      {/* Right side with notifications and user profile */}
      <div className="flex items-center gap-5">
        {/* Notification icon */}
        <div className="relative">
          <div className="cursor-pointer rounded-full p-1.5 text-white hover:bg-white/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
          </div>
          <div className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            3
          </div>
        </div>

        {/* User profile avatar */}
        <div className="flex items-center gap-6">
          <Dropdown
            className="hidden md:block"
            overlay={languageMenu}
            trigger={["click"]}
          >
            <Button className="border-none bg-transparent">
              <img
                src={currentLanguage === "en" ? English : Thailan}
                alt="Language"
                width={24}
                height={24}
              />
            </Button>
          </Dropdown>
          <Popover
            trigger="click"
            content={<InforPopover userBalance={userBalance} />}
          >
            <div className="flex cursor-pointer items-center gap-2 rounded-full p-1.5 pl-2 pr-3 hover:bg-[#0A2342] hover:text-white md:bg-[#E2E5E8]">
              <Button className="iconMenu" shape="circle">
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
              </Button>
            </div>
          </Popover>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        title="Menu"
        placement="bottom"
        closable={true}
        onClose={closeDrawer}
        open={isDrawerVisible}
        className="p-0"
      >
        <Sidebar onClose={closeDrawer}></Sidebar>
      </Drawer>
    </div>
  );
};

export default Navbar;

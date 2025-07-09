import { Avatar, Button, Popover, Dropdown, Menu } from "antd";
import React, { useState } from "react";
import Icons from "assets/icons";
import "pages/App/subcomponents/MainLayout/subcomponents/HeaderLayout/style.scss";
import InforPopover from "pages/App/subcomponents/MainLayout/subcomponents/InforPopover";
import { GetBalance } from "utils/user";
import { useSelector } from "react-redux";
import { RootState } from "configs/configureStore";
import { Link } from "react-router-dom";
//@ts-ignore
import { useTranslation } from "react-i18next";
import Logo from "assets/LogoSystem/min_logo.png";
import Thailan from "assets/images/svg/thailan.svg";
import English from "assets/images/svg/unitedstates.svg";
import { useMediaQuery } from "react-responsive";

type Props = {
  collapsed: boolean;
  openShoppingCart: any;
  setCollapsedMenu: any;
  seoData: any;
};

const HeaderLayout: React.FC<Props> = ({
  collapsed,
  openShoppingCart,
  setCollapsedMenu,
  seoData,
}) => {
  const { t, i18n } = useTranslation();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const appState = useSelector((state: RootState) => state.appSlice);
  const userBalance = appState.account.balance || 0;

  const [isHovered, setIsHovered] = useState(false);
  const [isBellHovered, setIsBellHovered] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleBellMouseEnter = () => setIsBellHovered(true);
  const handleBellMouseLeave = () => setIsBellHovered(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="en" onClick={() => changeLanguage("en")}>
        <div className="flex items-center justify-stretch gap-1">
          {" "}
          <img src={English} alt="English" width={24} height={24} />
          <p>English</p>
        </div>
      </Menu.Item>
      <Menu.Item key="th" onClick={() => changeLanguage("th")}>
        <div className="flex items-center justify-stretch gap-1">
          <img src={Thailan} alt="Thai" width={24} height={24} /> <p>Thai</p>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        className={`${collapsed ? (isTabletOrMobile ? "z-999 sticky" : "z-999 sticky") : isTabletOrMobile ? "z-99 absolute" : "z-999 sticky"} header-container top-0 flex w-full bg-white`}
      >
        <div className="flex grow items-center justify-between px-4 py-3 pr-6">
          <div className="flex items-center gap-8">
            <Link className="hidden md:block" to="/">
              <div className="flex w-full flex-col items-center">
                <div className="ml-2 flex w-full sm:ml-0">
                  <img
                    src={seoData?.site_logo || Logo}
                    width={35}
                    height={35}
                    alt=""
                  />
                  <h1
                    className={`${collapsed ? "hidden" : ""} text-nowrap text-center text-lg font-semibold text-primary transition-all duration-300 ease-in-out sm:ml-2 sm:mt-1 sm:text-xl lg:text-[24px]`}
                  >
                    {seoData?.title || window.location.hostname}
                  </h1>
                </div>
              </div>
            </Link>
            <Button
              onClick={() => setCollapsedMenu((prev: boolean) => !prev)}
              className="duration-400 z-10 flex min-h-[34px] min-w-[34px] items-center justify-center rounded-lg border-none transition-all"
              style={{
                backgroundColor: isHovered ? "#2CA58D" : "#E6F4F1",
                color: isHovered ? "white" : "#2CA58D",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              icon={<Icons.menuLine className="" />}
            />
          </div>
          <div className="flex items-center gap-6">
            <Dropdown overlay={languageMenu} trigger={["click"]}>
              <Button className="border-none bg-transparent">
                <img
                  src={currentLanguage === "en" ? English : Thailan}
                  alt="Language"
                  width={24}
                  height={24}
                />
              </Button>
            </Dropdown>
            <Button
              className="duration-400 flex min-h-[34px] min-w-[34px] items-center justify-center rounded-lg border-none transition-all"
              style={{
                backgroundColor: isBellHovered ? "#2CA58D" : "#E6F4F1",
                color: isBellHovered ? "white" : "#2CA58D",
              }}
              onMouseEnter={handleBellMouseEnter}
              onMouseLeave={handleBellMouseLeave}
              icon={<Icons.bellIcon />}
            />
            <Popover
              trigger="click"
              content={<InforPopover userBalance={userBalance} />}
            >
              <div className="flex cursor-pointer items-center gap-2 rounded-full bg-[#E2E5E8] p-1.5 pl-2 pr-3 hover:bg-[#0A2342] hover:text-white">
                <Button className="iconMenu" shape="circle">
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                </Button>
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-settings"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  </svg>
                </span>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderLayout;

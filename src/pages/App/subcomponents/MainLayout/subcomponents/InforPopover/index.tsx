import React from "react";
import "pages/App/subcomponents/MainLayout/subcomponents/InforPopover/style.scss";
import { Avatar, Divider, Button } from "antd";
import Icons from "assets/icons";
import { useDispatch } from "react-redux";
import { logout } from "pages/App/store/appSlice";
import { LOCAL_STORAGE_KEY } from "constants/enums";
import { Link, useNavigate } from "react-router-dom";
import { ACCOUNT_SETTING, LOGIN } from "pages/routes/route.constant";
import {
  ConvertUserRole,
  GetEmailUser,
  GetRoleUser,
  GetUserName,
} from "utils/user";
import moment from "moment";
//@ts-ignore
import { useTranslation } from "react-i18next";

const InforPopover = ({ userBalance }: { userBalance: string | number }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateAccountSetting = () => {
    navigate(ACCOUNT_SETTING);
  };

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER_ID);
    localStorage.removeItem(LOCAL_STORAGE_KEY.USERNAME);
    localStorage.removeItem(LOCAL_STORAGE_KEY.API_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEY.ROLE_USER);
    localStorage.removeItem(LOCAL_STORAGE_KEY.EMAIL_USER);
    localStorage.removeItem(LOCAL_STORAGE_KEY.REF_CODE);
    localStorage.removeItem(LOCAL_STORAGE_KEY.BALANCE_USER);
    dispatch(logout());
    navigate(LOGIN);
    window.location.reload();
  };

  const getGreetingMessage = () => {
    const currentHour = moment().hour();
    if (currentHour >= 0 && currentHour < 12) {
      return t("goodMorning");
    } else if (currentHour >= 12 && currentHour < 18) {
      return t("goodAfternoon");
    } else if (currentHour >= 18 && currentHour < 24) {
      return t("goodEvening");
    }
    return "";
  };

  return (
    <div className="w-[300px] p-2">
      <div>
        <div className="flex flex-nowrap items-center text-[16px] font-semibold">
          <h4 className="text-[#121926]">{getGreetingMessage()},</h4>
          <span className="ml-1 block">{GetUserName()}</span>
        </div>
        <h6 className="text-[12px] text-[#697586]">
          {ConvertUserRole(GetRoleUser())}
        </h6>
        <Divider className="my-3" />
      </div>
      <div className="flex items-start gap-4">
        <Avatar
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          size={64}
        />
        <div className="flex flex-col">
          <div>
            <span>{GetUserName()}</span>
          </div>
          <div className="flex items-center">
            <Icons.mailIcon size={16} />
            <span className="ml-2">{GetEmailUser()}</span>
          </div>
          <div>
            <span className="font-semibold">
              {t("balance")}: {userBalance}$
            </span>
          </div>
        </div>
      </div>
      <Divider className="my-3" />
      <ul className="flex flex-col gap-1">
        <li>
          <Link
            to="/client/account_setting"
            className="flex items-center gap-3.5 rounded-lg px-4 py-[10px] text-sm duration-300 ease-in-out hover:bg-[#E6F4F1] hover:text-[#2CA58D]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
            {t("accountSettings")}
          </Link>
        </li>
        <li className="">
          <div
            onClick={handleLogout}
            className="pl-4.5 flex cursor-pointer items-center gap-3.5 rounded-lg px-4 py-[10px] text-sm duration-300 ease-in-out hover:bg-[#E6F4F1] hover:text-[#2CA58D]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-logout"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>
            {t("logout")}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default InforPopover;

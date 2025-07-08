/* eslint-disable react/jsx-no-useless-fragment */
import { useLocation } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";
//@ts-ignore
import { useTranslation } from "react-i18next";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  // @ts-ignore
  const breadcrumbMap: Record<string, string> = {
    // @ts-ignore
    "/": t("home"),
    // @ts-ignore
    "/client/account_setting": t("accountSetting"),
    // @ts-ignore
    "/client/new_order": t("newOrder"),
    // @ts-ignore
    "/client/services": t("services"),
    // @ts-ignore
    "/client/orders": t("orders"),
    // @ts-ignore
    "/client/add_funds": t("addFunds"),
    // @ts-ignore
    "/client/api": t("api"),
    // @ts-ignore
    "/client/affiliates": t("affiliates"),
    // @ts-ignore
    "/client/mass_order": t("massOrder"),
    // @ts-ignore
    "/client/tickets": t("tickets"),
    // @ts-ignore
    "/client/contact": t("contact"),
  };
  const getBreadcrumbParts = () => {
    const parts = pathname.split("/").filter(Boolean);
    const fullPath = `/${parts.join("/")}`;

    return fullPath in breadcrumbMap
      ? [{ label: breadcrumbMap[fullPath] }]
      : // @ts-ignore
        [{ label: t("unknown") }];
  };

  const breadcrumbParts = getBreadcrumbParts();

  return (
    <div className="mx-auto mb-6 flex max-w-[1200px] items-center justify-between rounded-lg bg-white p-4 px-6">
      <h3 className="text-[16px] font-medium leading-[1.167] text-[#2ca58d]">
        {breadcrumbParts[breadcrumbParts.length - 1]?.label || t("home")}
      </h3>
      <div className="flex flex-nowrap items-center gap-2 text-[14px] text-[#697586]">
        <HomeFilled style={{ fontSize: "12px", color: "#2CA58D" }} />
        {breadcrumbParts.map((part, index) => (
          <span key={index} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
            <span className="text-[14px] font-medium">{part.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;

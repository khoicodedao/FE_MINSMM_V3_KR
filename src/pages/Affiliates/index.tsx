import "./style.scss";
import { Button, message, Row, Space, Table, Skeleton } from "antd";
import icons from "assets/icons";
import { useDefaultColumnsVisit } from "./config";
import { GetRefCode, GetUserName } from "utils/user";
import { useEffect, useState } from "react";
import { affiliateAPI } from "api/aff";
import useWindowSize from "hooks/useWindowSize";
import Bubles from "assets/images/customsvg/bubles";
import Flower from "assets/images/customsvg/Flower";
import Cash from "assets/images/customsvg/Cash";
//@ts-ignore
import { useTranslation } from "react-i18next";
import { Copy, DollarSign, Link, User } from "lucide-react";
import { tab } from "@testing-library/user-event/dist/tab";

const Affiliates = () => {
  const { t } = useTranslation();
  const { height } = useWindowSize();
  const hostName = window.location.hostname;
  const ref_code = GetRefCode();
  const protocol = window.location.protocol;
  const url = `${protocol}//${hostName}?refCode=${ref_code}`;

  const [commissionRate, setCommissionRate] = useState<number | null>(null);
  const [minimumPayout, setMinimumPayout] = useState<number | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoadingAffiliate, setIsLoadingAffiliate] = useState<boolean>(true);
  const [isLoadingEarnings, setIsLoadingEarnings] = useState<boolean>(true);

  const copyLinkToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        message.success(t("copied"));
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        message.success(t("copied"));
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const fetchAffiliateData = async () => {
    setIsLoadingAffiliate(true);
    setIsLoadingEarnings(true);

    // Thực hiện đồng thời hai API request
    const [affiliateResponse, earningResponse] = await Promise.allSettled([
      affiliateAPI.getAffiliateSystem(),
      affiliateAPI.getEarningAffiliates(),
    ]);

    // Xử lý kết quả của API `getAffiliateSystem`
    if (
      affiliateResponse.status === "fulfilled" &&
      affiliateResponse.value?.data?.status === 200
    ) {
      setCommissionRate(affiliateResponse.value.data.result.commission_rate);
      setMinimumPayout(affiliateResponse.value.data.result.minimum_payout);
    } else {
      message.error(t("failedToFetchAffiliateSystemData"));
    }
    setIsLoadingAffiliate(false);

    // Xử lý kết quả của API `getEarningAffiliates`
    if (
      earningResponse.status === "fulfilled" &&
      earningResponse.value?.data?.status === 200
    ) {
      setTableData([earningResponse.value.data.result]);
    } else {
      message.error(t("failedToFetchEarningAffiliatesData"));
    }
    setIsLoadingEarnings(false);
  };

  useEffect(() => {
    fetchAffiliateData();
  }, []);

  const affiliatesSubBox = [
    {
      title: t("referralLink"),
      bubles: false,
      bgColor: "bg-[#fff]",
      text1: "text-[#121926]",
      text2: "text-[#697586]",
      render: (
        <Space align="center" size={"small"}>
          <div className="text-[14px]">{url}</div>
          <Button
            type="text"
            icon={<icons.copyTwoTone />}
            onClick={handleCopy}
          />
        </Space>
      ),
    },
    {
      title: t("commissionRate"),
      bubles: true,
      bub1: "text-[#fff9e9]",
      bub2: "text-[#f1d37a]",
      text1: "text-[#121926]",
      text2: "text-[#697586]",
      bgColor: "bg-[#fff]",
      bgIcon: "bg-[#fff8e1]",
      icon: <Flower className="size-[26px] text-[#ffc107]" />,
      render: isLoadingAffiliate ? (
        <Skeleton active title={false} paragraph={{ rows: 1, width: "100%" }} />
      ) : (
        <>{`${commissionRate}%`}</>
      ),
    },
    {
      title: t("minimumPayout"),
      bubles: true,
      bub1: "text-[#1B8A70]",
      bub2: "text-[#1B8A70]",
      text1: "text-[#fff]",
      text2: "text-[#96d2c6]",
      bgColor: "bg-[#279d85]",
      bgIcon: "bg-[#1B8A70]",
      icon: <Cash className="size-[26px]" />,
      render: isLoadingAffiliate ? (
        <Skeleton active title={false} paragraph={{ rows: 1, width: "100%" }} />
      ) : (
        <>{`$${minimumPayout}`}</>
      ),
    },
  ];

  const defaultColumnsVisit = useDefaultColumnsVisit();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">{t("affiliate")}</h1>

      <div className="flex-1 overflow-y-auto">
        <div className="relative mb-4 overflow-hidden rounded-lg bg-white p-6 shadow-md">
          <div className="absolute left-[-200px] top-[-200px] h-[600px] w-[600px] rounded-full bg-[#EA1363] opacity-20 blur-[300px]" />
          <div className="absolute right-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-[#6000FA] opacity-20 blur-[250px]" />
          <div className="absolute bottom-[-150px] left-[25%] h-[500px] w-[500px] rounded-full bg-[#A00AB7] opacity-20 blur-[250px]" />
          <div className="absolute bottom-[-100px] right-[20%] h-[400px] w-[400px] rounded-full bg-[#6FD6FF] opacity-20 blur-[250px]" />
          <div data-slot="card-content" className="px-6">
            <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
              <div className="flex-1 space-y-6">
                <h5 className="bg-gradient-to-r from-[#ED1157] via-[#E41679] to-[#9207C4] bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  {t("affiliate_header")}
                </h5>
                <p className="text-base text-[#212121]">
                  {t("affiliate_description")}
                </p>
                <Button className="bg-[#ED1157] px-8 py-6 text-lg text-white hover:bg-[#ED1157]">
                  {t("affiliate_register_now")}
                </Button>
              </div>
              <div className="md:w-1/8">
                <img
                  src="/1aeb0079314c98d22bc01c537574b13f.png"
                  alt="Affiliate Program"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Information Section (from Figma design) */}
        <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF2F7]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 14H12C10.6193 14 9.5 12.8807 9.5 11.5V11.5C9.5 10.1193 10.6193 9 12 9H16.5"
                  stroke="#FF2147"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 7L18.5 11L14.5 15"
                  stroke="#FF2147"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.5 20V5C5.5 3.89543 6.39543 3 7.5 3H18.5C19.6046 3 20.5 3.89543 20.5 5V19C20.5 20.1046 19.6046 21 18.5 21H7.5C6.39543 21 5.5 20.1046 5.5 19V15"
                  stroke="#FF2147"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-base text-[#212121]">
              {t("paymentHistoryDescription")}
            </p>
          </div>
        </div>

        {/* Affiliate Information & Statistics Section */}
        <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
          {/* User Information and Core Stats Section */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* User name */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EA1261] text-white">
                <User className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#666270]">{t("userName")}</span>
                <span className="text-sm font-medium text-[#212121]">
                  {GetUserName()}
                </span>
              </div>
            </div>

            {/* Referral Link */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1759E8] text-white">
                <Link className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#666270]">
                  {t("referalLink")}
                </span>
                <span
                  className="text-sm font-medium text-[#212121]"
                  onClick={() =>
                    copyLinkToClipboard(
                      `${protocol}//${hostName}?refCode=${localStorage.getItem("REF_CODE")}`,
                    )
                  }
                >
                  {`${protocol}//${hostName}?refCode=${localStorage.getItem("REF_CODE")}`}
                  <Copy className="ml-2 inline-block h-4 w-4" />
                </span>
              </div>
            </div>

            {/* Commission rate */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#09B96D] text-white">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#666270]">
                  {t("commissionRate")}
                </span>
                <span className="text-sm font-medium text-[#212121]">{`${commissionRate}%`}</span>
              </div>
            </div>

            {/* Minimum payout */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EF561E] text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="M12 8v8"></path>
                  <path d="M9 12h6"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#666270]">
                  {t("minimumPayout")}
                </span>
                <span className="text-sm font-medium text-[#212121]">
                  ${minimumPayout}
                </span>
              </div>
            </div>
          </div>

          {/* Statistics with Progress Bars Section */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {/* Visit */}
            <div className="rounded-lg border border-b-2 border-[#F1EFF5] border-b-[#F12E76] bg-[#F8F7FA] p-4">
              <div className="mb-3 flex flex-col gap-1">
                <span className="text-sm text-[#666270]">{t("referrals")}</span>
                <span className="text-sm font-medium text-[#212121]">
                  {tableData[0]?.referrals || 0}
                </span>
              </div>
              {/* <div className="relative h-2 overflow-hidden rounded-full bg-[#F1EFF5]">
                <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#F12E76]"></div>
              </div> */}
            </div>

            {/* Registration */}
            <div className="rounded-lg border border-b-2 border-[#F1EFF5] border-b-[#0FC369] bg-[#F8F7FA] p-4">
              <div className="mb-3 flex flex-col gap-1">
                <span className="text-sm text-[#666270]">
                  {t("registrations")}
                </span>
                <span className="text-sm font-medium text-[#212121]">
                  {tableData[0]?.registrations || 0}
                </span>
              </div>
              {/* <div className="relative h-2 overflow-hidden rounded-full bg-[#F1EFF5]">
                <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#0FC369]"></div>
              </div> */}
            </div>

            {/* Conversion rate */}
            <div className="rounded-lg border border-b-2 border-[#F1EFF5] border-b-[#EDA012] bg-[#F8F7FA] p-4">
              <div className="mb-3 flex flex-col gap-1">
                <span className="text-sm text-[#666270]">
                  {t("conversionRate")}
                </span>
                <span className="text-sm font-medium text-[#212121]">
                  {tableData[0]?.conversionRate || 0} %
                </span>
              </div>
              {/* <div className="relative h-2 overflow-hidden rounded-full bg-[#F1EFF5]">
                <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#EDA012]"></div>
              </div> */}
            </div>

            {/* Total earnings */}
            <div className="rounded-lg border border-b-2 border-[#F1EFF5] border-b-[#0CBE9B] bg-[#F8F7FA] p-4">
              <div className="mb-3 flex flex-col gap-1">
                <span className="text-sm text-[#666270]">
                  {t("totalEarnings")}
                </span>
                <span className="text-sm font-medium text-[#212121]">
                  ${tableData[0]?.totalEarnings || 0}
                </span>
              </div>
              {/* <div className="relative h-2 overflow-hidden rounded-full bg-[#F1EFF5]">
                <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#0CBE9B]"></div>
              </div> */}
            </div>

            {/* Available earnings */}
            {/* {/* <div className="rounded-lg border border-[#F1EFF5] bg-[#F8F7FA] p-4"> */}
            <div className="rounded-lg border border-b-2 border-[#F1EFF5] border-b-[#10CFE4] bg-[#F8F7FA] p-4">
              <div className="mb-3 flex flex-col gap-1">
                <span className="text-sm text-[#666270]">
                  {t("availableEarnings")}
                </span>
                <span className="text-sm font-medium text-[#212121]">
                  ${tableData[0]?.availableEarnings}
                </span>
              </div>
              {/* <div className="relative h-2 overflow-hidden rounded-full bg-[#F1EFF5]">
                <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#0CBE9B]"></div>
              </div> */}
            </div>
            {/* Payout */}
            <div className="rounded-lg border border-b-2 border-[#F1EFF5] border-b-[#F67E55] bg-[#F8F7FA] p-4">
              <div className="mb-3 flex flex-col gap-1">
                <span className="text-sm text-[#666270]">{t("payout")}</span>
                <span className="text-sm font-medium text-[#212121]">$0</span>
              </div>
              {/* <div className="relative h-2 overflow-hidden rounded-full bg-[#F1EFF5]">
                <div className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#F67E55]"></div>
              </div> */}
            </div>
          </div>
        </div>
        {/* Table data */}
        {/* <div className="aff-page rounded-lg bg-white shadow-md">
          <h3 className="p-5 text-[16px] font-medium text-[#121926]">
            {t("earningAffiliate")}
          </h3>
          <hr style={{ width: "100%", color: "#E3E8EF" }} />
          <div className="mb-4 sm:pb-1">
            {isLoadingEarnings ? (
              <Skeleton active title={false} paragraph={{ rows: 4 }} />
            ) : (
              <Table
                columns={defaultColumnsVisit}
                size="small"
                dataSource={tableData}
                rowKey="id"
                scroll={{ x: "max-content", y: height - 300 }}
                pagination={{
                  showSizeChanger: true,
                  pageSizeOptions: ["20", "50", "100"],
                  size: "default",
                  defaultPageSize: 20,
                  style: { marginRight: 24 },
                }}
              />
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Affiliates;

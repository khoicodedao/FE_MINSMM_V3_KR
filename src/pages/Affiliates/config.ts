import { ColumnsType } from "antd/es/table";
//@ts-ignore
import { useTranslation } from "react-i18next";

const useDefaultColumnsVisit = (): ColumnsType<any> => {
  const { t } = useTranslation();

  return [
    {
      key: 0,
      title: t("registrations"),
      dataIndex: "registrations",
      width: 200,
    },
    {
      key: 1,
      title: t("referrals"),
      dataIndex: "referrals",
      width: 120,
    },
    {
      key: 2,
      title: t("conversionRate"),
      dataIndex: "conversionRate",
      width: 200,
    },
    {
      key: 3,
      title: t("totalEarnings"),
      dataIndex: "totalEarnings",
      width: 200,
    },
    {
      key: 4,
      title: t("availableEarnings"),
      dataIndex: "availableEarnings",
      width: 200,
    },
  ];
};

export { useDefaultColumnsVisit };

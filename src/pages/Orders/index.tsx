import { orderAPI } from "api/order";
import React, { useEffect, useState } from "react";
import { ORDER_TABS, SEARCH_TYPE_OPTIONS } from "./constants";
import "./style.scss";
//@ts-ignore
import { useTranslation } from "react-i18next";

// third-party
import {
  AlertOutlined,
  CheckCircleOutlined,
  PercentageOutlined,
  ReloadOutlined,
  SearchOutlined,
  TruckFilled,
  XFilled,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Table,
  Tag,
  message,
} from "antd";
import { CopyOutlined } from "@ant-design/icons"; // Import biểu tượng copy
// components
import CustomForm from "components/Antd/CustomForm";
import CustomFormItem from "components/Antd/CustomFormItem";
import CustomInput from "components/Antd/CustomInput";
import { formatDateWithHour } from "utils/date";
import { GetApiKey } from "utils/user";
import { useFormik } from "formik";
import Icons from "assets/icons";

type StatusTabType =
  | "all"
  | "pending"
  | "inprogress"
  | "completed"
  | "partial"
  | "processing"
  | "canceled";

type FormValues = {
  search_string: string;
  search_type: number;
};
type Order = {
  id: number;
  createdAt: string;
  link: string;
  charge: number;
  start_count: number;
  quantity: number;
  service_name: string;
  status: number;
  remains: number;
};
type Column = {
  title: string;
  dataIndex: string;
  key: string;
  width?: number;
  render?: (value: any) => React.ReactNode;
  ellipsis?: boolean; // Thêm thuộc tính ellipsis
};
const Orders: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(ORDER_TABS[0].value);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 50,
    total: 0,
  });
  const [searchParams, setSearchParams] = useState({
    search_string: "",
    search_type: 0,
  });
  const getStatusTagColor = (status: number): string => {
    switch (status) {
      case 2:
        return "orange";
      case 3:
        return "orange";
      case 4:
        return "green";
      case 5:
        return "purple";
      case 6:
        return "cyan";
      case 7:
        return "red";
      default:
        return "default";
    }
  };

  const [activeTab, setActiveTab] = React.useState<StatusTabType>("all");

  const fetchOrders = async (
    statusValue: number,
    page = 1,
    pageSize = 50,
    searchString = "",
    searchType = 0,
  ) => {
    setIsLoading(true);
    try {
      const response = await orderAPI.getAll(
        {
          limit: pageSize,
          page,
          status: statusValue,
          search_string: searchString,
          search_type: searchType,
        },
        GetApiKey() || "",
      );
      if (response?.data?.status === 200) {
        setOrders(response.data.result.data);
        setPagination((prev) => ({
          ...prev,
          total: response.data.result.total,
          current: page,
          pageSize,
        }));
      } else {
        message.error(t("failedToFetchOrders"));
      }
    } catch (error) {
      message.error(t("errorFetchingOrders"));
    } finally {
      setIsLoading(false);
    }
  };
  async function handleRefill(id: number) {
    try {
      const response = await orderAPI.refillOrder(
        {
          id,
        },
        GetApiKey() || "",
      );
      if (response?.data?.status === 200) {
        fetchOrders(status, pagination.current, pagination.pageSize);
      } else {
        message.error("Refill failed");
      }
    } catch (error) {
      // @ts-ignore
      message.error(t(error?.message));
    } finally {
      setIsLoading(false);
    }
  }
  async function handleCancel(id: number) {
    try {
      const response = await orderAPI.cancelOrder(
        {
          order_ids: [id],
        },
        GetApiKey() || "",
      );
      if (response?.data?.status === 200) {
        fetchOrders(status, pagination.current, pagination.pageSize);
      } else {
        message.error("Cancel failed");
      }
    } catch (error) {
      // @ts-ignore
      message.error(t(error?.message));
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchOrders(status, pagination.current, pagination.pageSize);
  }, [status, pagination.current, pagination.pageSize]);

  const handleStatusChange = (value: number) => {
    setStatus(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const onFinish = (values: any) => {
    setSearchParams({
      search_string: values.search_string,
      search_type: values.search_type,
    });
    fetchOrders(
      status,
      pagination.current,
      pagination.pageSize,
      values.search_string,
      values.search_type,
    );
  };

  const columns: Column[] = [
    {
      title: t("orderid"),
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: t("date"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (value: string) => formatDateWithHour(value),
    },
    {
      title: t("link"),
      dataIndex: "link",
      key: "link",
      width: 300,
      ellipsis: true,
      render: (link: string) => (
        <div
          title={link}
          style={{
            height: "auto",
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
          className="max-w-[270px]"
        >
          {link}
        </div>
      ),
    },
    {
      title: t("charge"),
      dataIndex: "charge",
      key: "charge",
      width: 100,
      render: (value: number) =>
        `${Number(value).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 10 })}`,
    },
    {
      title: t("startCount"),
      dataIndex: "start_count",
      key: "start_count",
      width: 100,
    },
    {
      title: t("quantity"),
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: t("service"),
      dataIndex: "service_name",
      key: "service_name",
      width: 200,
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: number) => {
        switch (status) {
          case 2:
            return <span className="text-[#FFA500]">{t("pending")}</span>;
          case 3:
            return <span className="text-[#FFA500]">{t("inprogress")}</span>;
          case 4:
            return <span className="text-[#09D85F]">{t("completed")}</span>;
          case 5:
            return <span className="text-[#3D17E8]">{t("partial")}</span>;
          case 6:
            return <span className="text-[#FFA500]">{t("processed")}</span>;
          case 7:
            return <span className="text-[#F60909]">{t("canceled")}</span>;
          case 8:
          default:
            return null;
        }
      },
    },
    { title: t("remains"), dataIndex: "remains", key: "remains", width: 100 },
    {
      title: t("Action"),
      dataIndex: "status",
      key: "status",
      width: 100,
      //@ts-ignore
      render: (status: number, record: Order) => {
        if (status === 4) {
          return (
            <Button
              type="primary"
              size="small"
              onClick={() => handleRefill(record.id)}
            >
              {t("Refill")}
            </Button>
          );
        }
        if (status === 3) {
          return (
            <Button
              type="primary"
              size="small"
              onClick={() => handleCancel(record.id)}
            >
              {t("Cancel")}
            </Button>
          );
        }
        return null;
      },
    },
  ];

  const statusOptions = [
    {
      label: t("all"),
      value: 0,
      count: 0,
      icon: <CheckCircleOutlined size={20} className="text-[#666270]" />,
      color: "purple",
    },
    {
      label: t("pending"),
      value: 2,
      count: 0,
      icon: <CheckCircleOutlined size={20} className="text-[#666270]" />,
      color: "orange",
    },
    {
      label: t("inprogress"),
      value: 3,
      count: 0,
      icon: <AlertOutlined size={20} className="text-[#666270]" />,
      color: "orange",
    },
    {
      label: t("completed"),
      value: 4,
      count: 25,
      icon: <ReloadOutlined size={20} className="text-[#666270]" />,
      color: "green",
    },
    {
      label: t("partial"),
      value: 5,
      count: 0,
      icon: <PercentageOutlined size={20} className="text-[#666270]" />,
      color: "deeporange",
    },
    {
      label: t("processing"),
      value: 6,
      count: 0,
      icon: <TruckFilled size={20} className="text-[#666270]" />,
      color: "teal",
    },
    {
      label: t("canceled"),
      value: 7,
      count: 0,
      icon: <XFilled size={20} className="text-[#666270]" />,
      color: "red",
    },
  ];

  const formik = useFormik({
    initialValues: {
      search_string: "",
      search_type: 0,
    },
    onSubmit: (values) => {
      onFinish({
        search_string: values.search_string,
        search_type: values.search_type,
      });
    },
  });

  return (
    <div
      className="p-6 md:w-auto"
      style={{
        maxWidth: window.innerWidth > 768 ? "calc(100vw - 280px)" : "100vw",
      }}
    >
      <h1 className="mb-6 text-2xl font-bold">{t("orders")}</h1>

      <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
        {isMobile ? (
          <Select
            className="h-[42px] w-full"
            value={status}
            onChange={handleStatusChange}
            options={statusOptions.map((option) => ({
              label: (
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span>{option.label}</span>
                  <span
                    className={`rounded-full ${getBadgeColor(option.color)} px-2 py-1 text-xs font-bold text-white`}
                  >
                    {option.count || 0}
                  </span>
                </div>
              ),
              value: option.value,
            }))}
          />
        ) : (
          <StatusRadioGroup
            // @ts-ignore
            options={statusOptions}
            value={status}
            onChange={handleStatusChange}
          />
        )}
      </div>

      <div className="mb-3 rounded-lg bg-white p-4 shadow-md">
        <div className="mb-3 flex flex-col items-center gap-4 md:flex-row">
          {/* Search Bar */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-full flex-1 flex-col items-center gap-2 border-b-0 md:w-auto md:flex-row"
          >
            <Input
              className="flex-1 px-2 py-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder={t("searchOrders")}
              value={formik.values.search_string}
              onChange={formik.handleChange}
              name="search_string"
              prefix={<Icons.searchIcon className="text-[#666270]" />}
            />
            {/* <div className="mx-4 h-5 w-px bg-[#E1E1E1]"></div> */}
            <Select
              className="search_type h-[40px] w-full md:w-[150px]"
              value={formik.values.search_type}
              onChange={(value) =>
                formik.setFieldValue("search_type", value || 0)
              }
              options={SEARCH_TYPE_OPTIONS.map((option) => ({
                ...option,
                label: t(option.label.toLowerCase().replace(" ", "")),
              }))}
            />
            <Button
              htmlType="submit"
              variant="outlined"
              icon={<Icons.searchIcon />}
              className="h-[40px] w-full bg-[#EA1261] px-6 text-white transition-colors hover:bg-[#d0105a] md:w-auto"
            >
              {t("searchOrders")}
            </Button>
          </form>
        </div>

        <Divider className="mb-3 mt-1" />

        {/* Orders Table */}

        {/* Table Body */}
        {isMobile ? (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border p-4 shadow-md">
                <p>
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%]">
                    {t("orderid")}:
                  </span>{" "}
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%]">
                    {order.id}
                  </span>
                  <CopyOutlined
                    className="mr-2 cursor-pointer text-[#666270] hover:text-[#EA1261]"
                    onClick={() => {
                      navigator.clipboard.writeText(order.id.toString());
                      message.success(t("Copied to clipboard")); // Hiển thị thông báo
                    }}
                  />
                </p>
                <p>
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%]">
                    {t("date")}:
                  </span>{" "}
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%]">
                    {formatDateWithHour(order.createdAt)}
                  </span>
                </p>
                <p>
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%]">
                    {t("link")}:
                  </span>{" "}
                  <a
                    href={order.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words text-blue-500 underline"
                  >
                    {order.link}
                  </a>
                </p>
                <p>
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%]">
                    {t("charge")}:
                  </span>{" "}
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%]">
                    ${order.charge}
                  </span>
                </p>
                <p>
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%]">
                    {t("startCount")}:
                  </span>{" "}
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%]">
                    {order.start_count}
                  </span>
                </p>
                <p>
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%]">
                    {t("quantity")}:
                  </span>{" "}
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%]">
                    {order.quantity}
                  </span>
                </p>
                <p>
                  <span
                    className={`text-[12px] font-medium leading-[100%] tracking-[0%]`}
                  >
                    {t("status")}:
                  </span>{" "}
                  <p>
                    <span className="text-[12px] font-medium leading-[100%] tracking-[0%]">
                      {t("status")}:
                    </span>{" "}
                    <Tag color={getStatusTagColor(order.status)}>
                      {columns
                        .find((col) => col.dataIndex === "status")
                        ?.render?.(order.status)}
                    </Tag>
                  </p>
                </p>
                <p>
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%]">
                    {t("remains")}:
                  </span>{" "}
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%]">
                    {order.remains}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            loading={isLoading}
            scroll={{ x: "max-content" }}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              onChange: (page, pageSize) =>
                handleTableChange({ current: page, pageSize }),
              style: { marginRight: 24 },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;

type StatusOption = {
  label: string;
  value: number;
  count: number;
  icon: React.ReactNode;
  color?: string;
};

type StatusRadioGroupProps = {
  options: StatusOption[];
  value: number;
  onChange: (value: number) => void;
};
const getBadgeColor = (color?: string) => {
  switch (color) {
    case "purple":
      return "bg-[#630C9D]";
    case "green":
      return "bg-[#09D85F]";
    case "orange":
      return "bg-[#FFA500]";
    case "blue":
      return "bg-[#3D17E8]";
    case "red":
      return "bg-[#F60909]";
    case "teal":
      return "bg-[#09B7F6]";
    case "deeporange":
      return "bg-[#FF4500]";
    default:
      return "bg-[#630C9D]";
  }
};
export const StatusRadioGroup: React.FC<StatusRadioGroupProps> = ({
  options,
  value,
  onChange,
}) => {
  const getBgColor = (isActive: boolean) =>
    isActive
      ? "bg-[#FFF2F7] border-[#EA1261]"
      : "bg-[#F8F7FA] border-[#F1EFF5]";

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex w-max flex-row flex-nowrap gap-4 px-2 py-2">
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <div key={option.value}>
              <input
                type="radio"
                id={`status-${option.value}`}
                name="status"
                className="hidden"
                checked={isActive}
                onChange={() => onChange(option.value)}
                value={option.value}
              />
              <label
                htmlFor={`status-${option.value}`}
                className={`hover:shadow-xs flex min-w-[180px] max-w-full cursor-pointer items-center justify-between gap-2 rounded-lg border px-4 py-3 transition-all ${getBgColor(isActive)}`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center">
                    {isActive
                      ? React.cloneElement(option.icon as React.ReactElement, {
                          className: "text-[#EA1261]",
                        })
                      : option.icon}
                  </div>
                  <span
                    className={`${
                      isActive ? "text-[#EA1261]" : "text-[#666270]"
                    } whitespace-nowrap font-medium`}
                  >
                    {option.label}
                  </span>
                </div>
                <div
                  className={`${getBadgeColor(option.color)} flex items-center justify-center rounded-full px-2 py-1`}
                >
                  <span className="text-xs font-bold text-white">
                    {option.count}
                  </span>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

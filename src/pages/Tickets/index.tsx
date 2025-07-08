import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, message, Table, Select } from "antd";
import CustomForm from "components/Antd/CustomForm";
import CustomFormItem from "components/Antd/CustomFormItem";
import CustomInput from "components/Antd/CustomInput";
import { GetApiKey } from "utils/user";
import { ticketAPI } from "api/tickets";
import note from "assets/images/png/note.png";
import "./style.scss";
import { SearchOutlined } from "@ant-design/icons";
// import { fakeTicketsData } from "./fakeTicketsData";
import { ticketColumns, TICKET_SEARCH_OPTIONS } from "./config";
import { AnimatePresence, motion } from "framer-motion";
import SubjectDetail from "./SubjectDetail";
//@ts-ignore
import { useTranslation } from "react-i18next";

const Tickets: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { subject: string; message: string }) => {
    setLoading(true);
    try {
      const response = await ticketAPI.create(values, GetApiKey() || "");
      if (response.status === 200) {
        fetchTickets();
        message.success(t("ticketSubmittedSuccessfully"));
      } else {
        message.error(t("failedToSubmitTicket"));
      }
    } catch (error) {
      message.error(t("errorSubmittingTicket"));
    } finally {
      setLoading(false);
    }
  };
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [tableShrunk, setTableShrunk] = useState(false);
  const fetchTickets = useCallback(
    async (searchString = "", searchType = 1) => {
      setLoading(true);
      try {
        const response = await ticketAPI.getTicket(
          { search_string: searchString, search_type: searchType },
          GetApiKey() || "",
        );
        if (response.data.status === 200) {
          //@ts-ignore
          const tickets = response.data?.result?.data;
          setFilteredData(tickets);
        } else {
          message.error("Failed to fetch tickets");
        }
      } catch (error) {
        message.error("Error fetching tickets");
      } finally {
        setLoading(false);
      }
    },
    [setFilteredData, setLoading],
  );
  useEffect(() => {
    fetchTickets();
  }, []);
  const [searchParams, setSearchParams] = useState({
    search_string: "",
    search_type: 0,
  });

  const handleRowClick = (record: any) => {
    setSelectedRecord(record);
    setTableShrunk(true);
    fetchTickets();
  };

  const handleCloseDetail = () => {
    setTableShrunk(false);
    setTimeout(() => setSelectedRecord(null), 300);
  };

  const onFinishSearch = (values: any) => {
    setSearchParams({
      search_string: values.search_string,
      search_type: values.search_type,
    });
    // fetchTickets(pagination.current, pagination.pageSize, values.search_string, values.search_type);
  };

  return (
    <div className="max-w-[100vw] p-3 md:p-6">
      <h1 className="mb-6 text-2xl font-bold">Tickets</h1>
      <div className="mb-6 grid grid-cols-12 gap-2 shadow-md sm:gap-6">
        <div className="col-span-12 rounded-lg bg-white p-2 shadow-md sm:p-6 md:col-span-6 xl:col-span-8">
          <CustomForm onFinish={onFinish} layout="vertical">
            <CustomFormItem
              label={t("subject")}
              name="subject"
              rules={[{ required: true, message: t("pleaseEnterSubject") }]}
            >
              <CustomInput
                placeholder={t("pleaseEnterSubject")}
                className="px-2 py-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </CustomFormItem>
            <CustomFormItem
              label={t("message")}
              name="message"
              rules={[{ required: true, message: t("pleaseEnterMessage") }]}
            >
              <Input.TextArea placeholder={t("pleaseEnterMessage")} rows={4} />
            </CustomFormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="h-[40px] w-full bg-[#EA1261] px-6 text-white transition-colors hover:bg-[#d0105a]"
            >
              {t("submitTicket")}
            </Button>
          </CustomForm>
        </div>
        <div className="col-span-12 flex flex-col justify-between rounded-lg bg-white p-2 shadow-md sm:p-6 md:col-span-6 xl:col-span-4">
          <div className="flex items-start">
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-info-circle mr-1 block min-w-[24px] text-blue-500 sm:hidden"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M12 9h.01" />
              <path d="M11 12h1v4h1" />
            </svg>
            <div className="flex flex-col text-[#66635a]">
              <h6 className="text-[16px] font-medium">{t("note")}</h6>
              <span className="mt-1 text-[14px]">{t("noteMessage")}</span>
            </div>
          </div>
          <div className="hidden justify-end sm:flex">
            <img src={note} alt="" className="" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-start gap-6 overflow-hidden xl:flex-nowrap">
        <motion.div
          className={`tickets-page ${tableShrunk ? "ticket-active" : ""} rounded-lg bg-white pt-4`}
          initial={{ width: "100%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => {
            if (!tableShrunk) setTableShrunk(false);
          }}
        >
          <div className="mb-2 flex w-full flex-wrap items-center justify-end gap-4 sm:mx-6 sm:mb-6 md:mx-2 md:w-auto">
            <div className="search-tour -mb-[15px] flex flex-wrap items-center justify-between">
              <CustomForm onFinish={onFinishSearch} layout="inline">
                <CustomFormItem name="search_string">
                  <CustomInput
                    className="w-36 rounded-r-none border-r-0 sm:min-w-60"
                    placeholder={t("searchTickets")}
                  />
                </CustomFormItem>
                <CustomFormItem name="search_type" initialValue={0}>
                  <Select
                    options={TICKET_SEARCH_OPTIONS}
                    style={{ width: 120 }}
                  />
                </CustomFormItem>
                <CustomFormItem>
                  <Button
                    className="min-h-[32px] rounded-l-none border-l-0"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  />
                </CustomFormItem>
              </CustomForm>
            </div>
          </div>
          <Table
            size="small"
            columns={ticketColumns.map((col) => ({
              ...col,
              onCell: (record) => ({
                onClick:
                  //@ts-ignore
                  record.status === 0 || record.status === 2
                    ? undefined
                    : () => handleRowClick(record), // Ngăn click nếu status = 0
                style: {
                  //@ts-ignore
                  cursor: record.status === 0 ? "not-allowed" : "pointer", // Thay đổi con trỏ chuột
                  //@ts-ignore
                  opacity: record.status === 0 || record.status === 2 ? 0.6 : 1, // Làm mờ hàng nếu không thể click
                },
              }),
            }))}
            scroll={{ x: "max-content" }}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              size: "default",
              style: { marginRight: 24 },
            }}
            className="custom-scrollbar hidden md:block" // Ẩn trên mobile
            rowClassName={(record) =>
              //@ts-ignore
              record.id === selectedRecord?.id ? "highlight-row" : ""
            }
          />

          {/* Bảng dành cho mobile */}
          <div className="block md:hidden">
            {filteredData.map((record) => (
              <div
                //@ts-ignore
                key={record?.id || ""}
                className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow"
                onClick={() => handleRowClick(record)}
              >
                <div className="flex justify-between pb-2">
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%] text-[#666270]">
                    ID:
                  </span>
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%] text-[#212121]">
                    {/* @ts-ignore */}
                    {record?.id}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%] text-[#666270]">
                    Subject:
                  </span>
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%] text-[#212121]">
                    {/* @ts-ignore */}
                    {record.subject}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%] text-[#666270]">
                    Status:
                  </span>
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%] text-[#212121]">
                    {/* @ts-ignore */}

                    {record.status}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[12px] font-medium leading-[100%] tracking-[0%] text-[#666270]">
                    Last Date:
                  </span>
                  <span className="text-[14px] font-medium leading-[100%] tracking-[0%] text-[#212121]">
                    {/* @ts-ignore */}

                    {record?.lastUpdate || ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        {/* @ts-ignore        */}
        <AnimatePresence>
          {selectedRecord && tableShrunk && (
            <motion.div
              className="flex w-full flex-col gap-6"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={() => {
                if (!tableShrunk) setSelectedRecord(null);
              }}
            >
              <SubjectDetail
                record={selectedRecord}
                onClose={handleCloseDetail}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tickets;

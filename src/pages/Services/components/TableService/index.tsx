import React, { useState } from "react";
import { Button, Divider, Modal, Space, Typography } from "antd";
import "pages/Services/components/TableService/style.scss";
import { ColumnsType } from "antd/es/table";
import { LOCAL_STORAGE_KEY, PAGE_SIZE_OPTIONS } from "constants/enums";
import { CollapseCustom } from "components/CollapseCustom";
import Icons from "assets/icons";
import TableCustom from "components/TableCustom";
import { CategoryType } from "constants/types";
// @ts-ignore
import { useTranslation } from "react-i18next";

type Props = {
  categoryService: CategoryType;
};

const TableService: React.FC<Props> = ({ categoryService }) => {
  const { t } = useTranslation();
  const isMobile = window.innerWidth <= 768;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState<string>("");

  const showModal = (description: string) => {
    setIsModalOpen(true);
    setDescription(description);
  };

  const columns: ColumnsType<any> = [
    {
      key: 1,
      title: t("service_page.id"),
      dataIndex: "id",
      width: 70,
      align: "center",
      sorter: true,
      fixed: "left" as const,
    },
    {
      key: 2,
      title: t("service_page.name"),
      dataIndex: "name",
      width: 350,
      align: "left",
    },
    {
      key: 3,
      title: t("service_page.rate_1000"),
      dataIndex: "rate_1000",
      width: 120,
      render: (value: number) =>
        `${Number(value).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 10,
        })}`,
    },
    {
      key: 4,
      title: t("service_page.min_order"),
      dataIndex: "min_order",
      width: 120,
    },
    {
      key: 5,
      title: t("service_page.max_order"),
      dataIndex: "max_order",
      width: 120,
    },
    {
      key: 6,
      title: t("service_page.average_time"),
      dataIndex: "average_time",
      width: 120,
    },
    {
      key: 7,
      title: t("service_page.description"),
      dataIndex: "description",
      width: 120,
      align: "center",
      render: (text: string, record: any) => (
        <Button
          className="bg-[#EA1261] text-white transition-colors"
          onClick={() => showModal(record.description)}
        >
          {t("service_page.view")}
        </Button>
      ),
    },
  ];

  const [params, setParams] = useState<any>({
    limit: localStorage.getItem(LOCAL_STORAGE_KEY.PAGE_SIZE)
      ? Number(localStorage.getItem(LOCAL_STORAGE_KEY.PAGE_SIZE))
      : PAGE_SIZE_OPTIONS.OPTION_10,
    page: 1,
  });

  return (
    <div className="">
      <CollapseCustom
        expandIcon={({ isActive }) => (
          <Space>
            <Typography style={{ color: "#000000 !important" }}></Typography>
            <Icons.downOutline rotate={isActive ? 180 : 0} />
          </Space>
        )}
        itemList={[
          {
            label: (
              <div className="text-xl font-bold text-[#EA1261] md:w-auto">
                {categoryService.name}
              </div>
            ),
            // @ts-ignore
            icon: (
              <div className="h-7 w-7">
                {categoryService.icon ? (
                  <img
                    src={categoryService.icon}
                    alt={`${categoryService.name} icon`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">
                    {t("service_page.no_icon")}
                  </span>
                )}
              </div>
            ),
            children: isMobile ? (
              <div className="responsive-table">
                {categoryService?.services?.map((service) => (
                  <div className="card" key={service.id}>
                    <div className="card-item">
                      <span>{t("service_page.id")}:</span> {service.id}
                    </div>
                    <div className="card-item">
                      <span>{t("service_page.name")}:</span> {service.name}
                    </div>
                    <div className="card-item">
                      <span>{t("service_page.rate_1000")}:</span>{" "}
                      {service.rate_1000}
                    </div>
                    <div className="card-item">
                      <span>{t("service_page.min_order")}:</span>{" "}
                      {service.min_order}
                    </div>
                    <div className="card-item">
                      <span>{t("service_page.max_order")}:</span>{" "}
                      {service.max_order}
                    </div>
                    <div className="card-item">
                      <span>{t("service_page.average_time")}:</span>{" "}
                      {service.average_time}
                    </div>
                    <div className="card-item">
                      <span>{t("service_page.description")}:</span>
                      <Button
                        className="bg-[#EA1261] px-6 text-white transition-colors hover:bg-[#d0105a] md:w-auto"
                        onClick={() => showModal(service.description)}
                      >
                        {t("service_page.view")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <TableCustom
                dataSource={categoryService.services || []}
                columns={columns}
                bordered={false}
                isLoading={false}
                limit={params.limit}
                total={categoryService.services?.length || 0}
                onLimitChange={(limit) => setParams({ ...params, limit })}
                onPageChange={(page) => setParams({ ...params, page })}
                onSorterChange={() => {}}
                page={params.page}
                scroll={{ x: "max-content" }}
              />
            ),
          },
        ]}
      />

      <Modal
        title={
          <>
            <h4>{t("service_page.modal_title")}</h4>
            <Divider />
          </>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
        className="rounded-2xl"
      >
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Modal>
    </div>
  );
};

export default React.memo(TableService);

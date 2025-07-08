import React, { useState } from "react";
import { Button, Divider, Modal, Space, Typography } from "antd";
import "pages/Services/components/TableService/style.scss";
import { ColumnsType } from "antd/es/table";
import { LOCAL_STORAGE_KEY, PAGE_SIZE_OPTIONS } from "constants/enums";
import { CollapseCustom } from "components/CollapseCustom";
import Icons from "assets/icons";
import TableCustom from "components/TableCustom";
import { CategoryType } from "constants/types";

type Props = {
  categoryService: CategoryType;
};

const TableService: React.FC<Props> = ({ categoryService }) => {
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
      title: "ID",
      dataIndex: "id",
      width: 70,
      align: "center",
      sorter: true,
      fixed: "left" as const,
    },
    {
      key: 2,
      title: "Service",
      dataIndex: "name",
      width: 350,
      align: "left",
    },
    {
      key: 3,
      title: "Rate per 1000",
      dataIndex: "rate_1000",
      width: 120,
      render: (value: number) =>
          `${Number(value).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 10, })}`,
    },
    {
      key: 4,
      title: "Min order",
      dataIndex: "min_order",
      width: 120,
    },
    {
      key: 5,
      title: "Max order",
      dataIndex: "max_order",
      width: 120,
    },
    {
      key: 6,
      title: "Average time",
      dataIndex: "average_time",
      width: 120,
    },

    {
      key: 7,
      title: "Description",
      dataIndex: "description",
      width: 120,
      align: "center",
      render: (text: string, record: any) => {
        return (
          <div>
            <Button
              className="bg-[#EA1261] text-white transition-colors"
              onClick={() => showModal(record.description)}
            >
              View
            </Button>
          </div>
        );
      },
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
            <Typography style={{ color: "#000000 !important" }}>
              {/* {isActive ? "Hide services" : "Show services"} */}
            </Typography>
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
                  <span className="text-gray-400">No Icon</span>
                )}
              </div>
            ),
            // forceRender: true,
            children: isMobile ? (
              <div className="responsive-table">
                {categoryService?.services?.map((service) => (
                  <div className="card" key={service.id}>
                    <div className="card-item">
                      <span>ID:</span> {service.id}
                    </div>
                    <div className="card-item">
                      <span>Service:</span> {service.name}
                    </div>
                    <div className="card-item">
                      <span>Rate per 1000:</span> {service.rate_1000}
                    </div>
                    <div className="card-item">
                      <span>Min order:</span> {service.min_order}
                    </div>
                    <div className="card-item">
                      <span>Max order:</span> {service.max_order}
                    </div>
                    <div className="card-item">
                      <span>Average time:</span> {service.average_time}
                    </div>
                    <div className="card-item">
                      <span>Description:</span>
                      <Button
                        className="bg-[#EA1261] px-6 text-white transition-colors hover:bg-[#d0105a] md:w-auto"
                        onClick={() => showModal(service.description)}
                      >
                        View
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
                limit={1000}
                total={0}
                onLimitChange={(limit) => {
                  setParams({ ...params, limit });
                }}
                onPageChange={(page) => {
                  setParams({ ...params, page });
                }}
                onSorterChange={(sorter) => {
                  // setParams((prev: any) => ({
                  //   ...prev,
                  //   sortBy: sorter?.sortBy,
                  //   sortType: sorter?.sortType,
                  // }));
                }}
                page={params.page || 1}
                scroll={{ x: "max-content" }}
                onRow={(record, rowIndex) => {
                  return {
                    // onDoubleClick: (e) =>
                    //   handleNavigateAppraisalDetail(record.appraisalFileId),
                  };
                }}
              />
            ),
          },
        ]}
      />

      <Modal
        title={
          <>
            <h4>Service description</h4>
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

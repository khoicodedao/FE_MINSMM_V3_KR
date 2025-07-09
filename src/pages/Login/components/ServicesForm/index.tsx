import { Input, Row, Select, Col, Divider, message, Spin, Space } from "antd";
import Icons from "assets/icons";
import { useEffect, useState } from "react";
import React from "react";
import TableService from "../../../Services/components/TableService";
import { CategoryType, CommonGetAllParams } from "constants/types";
import { authAPI } from "api/auth";
import "pages/Login/components/ServicesForm/style.scss";

// const ServiceContainer = () => {
//   return (
//     <div className="service-container">
//       <Services />
//     </div>
//   );
// };

const css = { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 };

const ServiceContainer = () => {
  const { t } = useTranslation();

  const [serviceCategory, setServiceCategory] = useState<CategoryType[]>([]);

  const [isLoadingGetService, setIsLoadingGetService] = useState<boolean>(true);

  const [params, setParams] = useState<CommonGetAllParams>({});

  const handleChangeParams = (data: any) => {
    const newParams = { ...params, ...data };
    setParams(newParams);
  };

  const fetchServiceCategory = async () => {
    setIsLoadingGetService(true);
    try {
      const response = await authAPI.getCategoryService(params);
      if (response.data.status === 200) {
        const services = response.data.result.map((item: any) => {
          return {
            ...item,
            key: item.id,
            services: item.services.map((service: any) => {
              return {
                ...service,
                key: service.id,
              };
            }),
          };
        });
        setServiceCategory(services);
        setIsLoadingGetService(false);
        return;
      }
      setIsLoadingGetService(false);
      message.error("Get services failed");
    } catch (err) {
      setIsLoadingGetService(false);
      message.error("Get services failed");
    }
  };

  useEffect(() => {
    fetchServiceCategory();
  }, [params]);

  return (
    <div className="mx-auto w-full max-w-[95%] sm:max-w-[80%] xl:max-w-[1200px]">
      <div className="services-page page rounded-2xl">
        <div className="page-header rounded-t-2xl">
          <p className="pl-4">{t("services")}</p>
        </div>
        <div className="page-container">
          <div className="page-content">
            <div>
              <Row justify={"space-between"} gutter={[12, 12]}>
                <Col
                  xs={css.xs}
                  sm={css.sm}
                  md={css.md}
                  lg={css.lg}
                  xl={css.xl}
                >
                  <Space.Compact>
                    <Input
                      size="large"
                      // style={{ width: "40px" }}
                      disabled
                      prefix={<Icons.filterTwoTone />}
                    />
                    <Select
                      size="large"
                      // style={{ width: "300px" }}
                    />
                  </Space.Compact>
                </Col>
                <Col
                  xs={css.xs}
                  sm={css.sm}
                  md={css.md}
                  lg={css.lg}
                  xl={css.xl}
                >
                  <Input
                    onChange={(e) =>
                      handleChangeParams({ keyword: e.target.value })
                    }
                    size="large"
                    prefix={<Icons.searchIcon />}
                  />
                </Col>
              </Row>
              <Divider style={{ margin: "10px 0" }} />
              {!isLoadingGetService ? (
                serviceCategory.map((item, index: number) => (
                  <TableService key={index} categoryService={item} />
                ))
              ) : (
                <div>
                  <Row justify={"center"}>
                    <Spin size="large" />
                  </Row>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceContainer;
function useTranslation(): { t: any; i18n: any } {
  throw new Error("Function not implemented.");
}

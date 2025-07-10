import {
  Input,
  Row,
  Select,
  Col,
  Divider,
  message,
  Spin,
  Space,
  Button,
} from "antd";
import Icons from "assets/icons";
import { useEffect, useState, useRef } from "react";
import React from "react";
import TableService from "../Services/components/TableService";
import { CategoryType, CommonGetAllParams } from "constants/types";
import { authAPI } from "api/auth";
import "pages/Login/components/ServicesForm/style.scss";
import NavbarLanding from "./layout/navbar";
import "./style.scss";
import FooterLanding from "./layout/footer";
import { GetApiKey } from "utils/user";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
// @ts-ignore
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { SEARCH_TYPE_OPTIONS } from "../Services/constants";
import { serviceAPI } from "api/service";
import { categoryAPI } from "api/category";
// @ts-ignore
import { Virtuoso } from "react-virtuoso";

const css = { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 };

const ServiceLanding = () => {
  const listRef = useRef<any>(null);
  const { t } = useTranslation();
  const [serviceCategory, setServiceCategory] = useState<CategoryType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<any>([]);
  const [isLoadingGetService, setIsLoadingGetService] = useState<boolean>(true);

  const [params, setParams] = useState<CommonGetAllParams>({
    category_id: undefined,
  });
  const fetchCategory = async () => {
    setIsLoadingGetService(true);
    try {
      const response = await authAPI.getCategories();
      if (response.data.status === 200) {
        const services = response.data.result;
        setCategory(services);
        setIsLoadingGetService(false);
        return;
      }
      setIsLoadingGetService(false);
    } catch (error) {
      setIsLoadingGetService(false);
    }
  };
  const handleChangeParams = (data: any) => {
    const newParams = { ...params, ...data };
    setParams(newParams);
  };

  const handleChangeCategory = (value: number) => {
    const servicesByCategory = categories.filter(
      (category) => category.id === value,
    );
    setParams({ ...params, category_id: value });
  };

  const fetchServiceCategory = async () => {
    setIsLoadingGetService(true);
    try {
      const response = await serviceAPI.getCategoryService(params);
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
    fetchCategory();
  }, []);
  useEffect(() => {
    fetchServiceCategory();
  }, [params]);
  const formik = useFormik({
    initialValues: {
      search_string: "",
      search_type: 1,
    },
    onSubmit: (values) => {
      handleChangeParams({
        search_string: values.search_string,
        search_type: values.search_type,
      });
    },
  });

  return (
    <div>
      <div className="mx-auto w-full max-w-[95%] rounded-xl bg-white shadow-lg sm:max-w-[80%] xl:max-w-[1200px]">
        <div className="services-page page rounded-2xl">
          <div className="page-header rounded-t-2xl">
            <p className="pl-4">{t("services_title")}</p>
          </div>
          <div className="page-container">
            <div className="page-content">
              <div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex w-full flex-1 flex-col items-center gap-2 border-b-0 md:w-auto md:flex-row"
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder={
                      <span>
                        <FilterOutlined className="mr-1" />
                        {t("filterCategory")}
                      </span>
                    }
                    style={{ height: 40, minWidth: 400 }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      // @ts-ignore
                      option?.label?.toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={(value) => {
                      if (value) {
                        setParams({
                          ...params,
                          search_type: 5,
                          search_string: value.toString(),
                        });
                      }
                    }}
                    options={category.map((svc: any) => ({
                      label: svc.name,
                      value: svc.id,
                    }))}
                    suffixIcon={<FilterOutlined />}
                    className="w-[100%] md:w-[220px]"
                  />
                  <Input
                    name="search_string"
                    placeholder={t("placeholder_search_service")}
                    value={formik.values.search_string}
                    onChange={formik.handleChange}
                    prefix={<Icons.searchIcon className="text-[#666270]" />}
                    style={{ height: 40 }}
                    className="w-[100%] px-2 py-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Select
                    value={formik.values.search_type}
                    onChange={(value) =>
                      formik.setFieldValue("search_type", value || 0)
                    }
                    options={SEARCH_TYPE_OPTIONS}
                    className="h-[40px] w-[100%] text-sm md:w-[150px]"
                  />
                  <Button
                    htmlType="submit"
                    variant="outlined"
                    icon={<Icons.searchIcon />}
                    className="h-[40px] w-[100%] bg-[#EA1261] px-6 text-white transition-colors hover:bg-[#d0105a] md:w-auto"
                  >
                    {t("searchService")}
                  </Button>
                </form>

                <Divider className="mb-3 mt-3" />
                <Divider style={{ margin: "10px 0" }} />
                {!isLoadingGetService ? (
                  <Virtuoso
                    style={{ height: 800, width: "100%" }}
                    totalCount={serviceCategory.length}
                    itemContent={(index) => (
                      <div key={serviceCategory[index].id} className="mb-4">
                        <TableService
                          categoryService={serviceCategory[index]}
                        />
                      </div>
                    )}
                  />
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
    </div>
  );
};

export default ServiceLanding;

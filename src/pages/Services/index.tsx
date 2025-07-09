import "./style.scss";
import { Input, Select, Divider, message, Spin, Button } from "antd";
import Icons from "assets/icons";
import { useEffect, useState } from "react";
import TableService from "./components/TableService";
import { CategoryType, CommonGetAllParams } from "constants/types";
import { serviceAPI } from "api/service";
import { categoryAPI } from "api/category";
import { GetApiKey } from "utils/user";
import CustomForm from "components/Antd/CustomForm";
import CustomFormItem from "components/Antd/CustomFormItem";
import { SEARCH_TYPE_OPTIONS } from "./constants";
import { useFormik } from "formik";
import { FilterOutlined } from "@ant-design/icons";
//@ts-ignore
import { useTranslation } from "react-i18next";
//@ts-ignore
import { Virtuoso } from "react-virtuoso";

const Services = () => {
  const [serviceCategory, setServiceCategory] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<any>([]);
  const [isLoadingGetService, setIsLoadingGetService] = useState<boolean>(true);
  const { t } = useTranslation();

  const [params, setParams] = useState<CommonGetAllParams>({
    search_string: "",
    search_type: 0,
  });

  const handleChangeParams = (data: any) => {
    const newParams = { ...params, ...data };
    setParams(newParams);
  };
  const fetchCategory = async () => {
    setIsLoadingGetService(true);
    try {
      const response = await categoryAPI.getAllCategory(GetApiKey() || "");
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
  const fetchServiceCategory = async () => {
    setIsLoadingGetService(true);
    try {
      const response = await serviceAPI.getAllWithCategory(
        params,
        GetApiKey() || "",
      );
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
  useEffect(() => {
    fetchCategory();
  }, []);
  const onFinish = (values: any) => {
    handleChangeParams({
      search_string: values.search_string,
      search_type: values.search_type,
    });
  };

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
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">{t("services")}</h1>
      <div className="service-page max-w max-w-[90vw] rounded-xl bg-white p-6 shadow-md sm:p-6">
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
            optionFilterProp="children"
            filterOption={(input, option) =>
              //@ts-ignore
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
            className="h-10 w-[100%] md:w-[30%]"
          />
          <Input
            name="search_string"
            placeholder="Enter service name to search"
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
            // style={{ height: 40, width: 150 }} // 👈 khớp với input (48px = py-3 của Tailwind)
            className="h-[40px] w-[100%] text-sm md:w-[180px]"
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
        <div>
          {!isLoadingGetService ? (
            <Virtuoso
              style={{ height: 800, width: "100%" }}
              totalCount={serviceCategory.length}
              itemContent={(index) => (
                <div className="mb-4">
                  <TableService
                    categoryService={serviceCategory[index]}
                    // Nếu cần callback collapse, truyền vào đây
                  />
                </div>
              )}
            />
          ) : (
            <div className="mt-6 flex items-center justify-center">
              <Spin size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;

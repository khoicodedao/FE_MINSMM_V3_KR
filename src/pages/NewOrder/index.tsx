import { useState, useEffect } from "react";
import { Button, message, Select, Input, Space, Form } from "antd";
import CustomForm from "components/Antd/CustomForm";
import CustomFormItem from "components/Antd/CustomFormItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "configs/configureStore";
import {
  GetApiKey,
  GetBalance,
  GetIdUser,
  GetTotalBalanceSpent,
  GetUserName,
} from "utils/user";
import { login } from "pages/App/store/appSlice";
import { categoryAPI } from "api/category";
import { serviceAPI } from "api/service";
import { userAPI } from "api/user";
import { orderAPI } from "api/order";
import IdContainer from "components/IdContainer";
import { SearchOutlined, StockOutlined } from "@ant-design/icons";
//@ts-ignore
import { useTranslation } from "react-i18next";
import { DollarSign, ShoppingBag, Lightbulb } from "lucide-react";
import { HistoryOutlined } from "@ant-design/icons"; // Thêm ở đầu file
const { TextArea } = Input;

interface CategoryType {
  id: number;
  name: string;
}

interface ServiceType {
  id: number;
  name: string;
  rate_1000?: number;
  category_id?: number;
  type?: number;
  average_time?: string;
  min_order: string;
  max_order: string;
}

const NewOrder = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  );
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceType[]>([]);
  const [chargeService, setChargeService] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [searchServiceId, setSearchServiceId] = useState<number | undefined>();
  const [showCommentsField, setShowCommentsField] = useState(false);
  const [isTypeOne, setIsTypeOne] = useState(false);
  const appState = useSelector((state: RootState) => state.appSlice);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategory(GetApiKey() || "");
      if (response.data.status === 200) {
        setCategories(response?.data?.result || []);
      } else {
        message.error("Failed to fetch categories");
      }
    } catch (error) {
      message.error("Error fetching categories");
    }
  };

  const fetchServices = async () => {
    try {
      const response = await serviceAPI.getAll(GetApiKey() || "");
      if (response.data.status === 200) {
        setServices(response?.data?.result || []);
        setFilteredServices(response?.data?.result || []);
      } else {
        message.error("Failed to fetch services");
      }
    } catch (error) {
      message.error("Error fetching services");
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await userAPI.getUserInfor(GetApiKey() || "");
      if (response.data.status === 200) {
        const balanceUser = response?.data?.result?.balance;
        const totalBalanceSpent = response?.data?.result?.totalBalanceSpent;
        dispatch(login({ ...appState.account, balanceUser }));
        localStorage.setItem("BALANCE_USER", balanceUser);
        localStorage.setItem("TOTAL_BALANCE_SPENT", totalBalanceSpent);
      }
    } catch (error) {
      message.error("Error fetching user info");
    }
  };

  const handleCategoryChange = (categoryId: number) => {
    const servicesByCategory = services.filter(
      (service) => service.category_id === categoryId,
    );
    setFilteredServices(servicesByCategory);
  };

  const handleServiceChange = (serviceId: number) => {
    const selectedService = services.find(
      (service) => service.id === serviceId,
    );
    setSelectedService(selectedService || null);
    if (selectedService) {
      setChargeService(selectedService.rate_1000 || 0);
      const isTypeOneService = selectedService.type === 1;
      setShowCommentsField(isTypeOneService);
      setIsTypeOne(isTypeOneService);

      if (!isTypeOneService) {
        // Set quantity = min_order khi chọn service
        const minOrder = Number(selectedService.min_order || 1);
        setQuantity(minOrder);
        form.setFieldsValue({
          quantity: minOrder,
          average_time: selectedService.average_time,
        });
      }
    }
  };

  const handleSearchServiceSelect = (serviceId: number) => {
    setSearchServiceId(serviceId);
    const selectedService = services.find(
      (service) => service.id === serviceId,
    );
    if (selectedService) {
      handleCategoryChange(selectedService.category_id!);
      handleServiceChange(serviceId);
      form.setFieldsValue({
        category_id: selectedService.category_id,
        service_id: serviceId,
        average_time: selectedService.average_time,
      });
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const comments = e.target.value;
    const lines = comments
      .split("\n")
      .filter((line) => line.trim() !== "").length;
    if (isTypeOne) {
      setQuantity(lines);
      form.setFieldsValue({ quantity: lines });
    }
  };

  useEffect(() => {
    if (quantity && chargeService) {
      const newCharge = parseFloat(
        ((chargeService * quantity) / 1000).toFixed(10),
      );
      form.setFieldsValue({ charge: newCharge });
    }
  }, [quantity, chargeService]);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    const payload = {
      ...values,
      user_id: GetIdUser(),
      charge: form.getFieldValue("charge"),
    };
    try {
      const response = await orderAPI.create(payload, GetApiKey() || "");
      if (response.data.status === 200) {
        message.success("Order created successfully");
        fetchUserInfo();
      } else {
        message.error(response.data.error.message || "Failed to create order");
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { status, error: apiError } = error.response.data;
        if (apiError?.message) {
          message.error(apiError.message);
        } else {
          message.error("Unexpected error occurred");
        }
      } else {
        message.error("Error creating order");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([fetchCategories(), fetchServices()]);
    };
    initializeData();
  }, []);

  return (
    <div className="p-6">
      <h4 className="mb-6 text-2xl font-bold text-black">{t("newOrder")}</h4>
      <div className="mb-6 flex flex-col gap-6 md:flex-row">
        {/* Left Column - 8/12 width (66.67%) */}
        {/* Show on desktop */}
        <div className="hidden w-full flex-col gap-4 md:flex md:h-[191px] md:w-[70%]">
          <div className="relative h-48 rounded-xl bg-white p-4 shadow-md">
            <div className="relative hidden xl1428:block">
              <img
                className="absolute right-[-40px] top-[-9px] h-[184px] w-[220px]"
                src="/user.png"
              />
              <img
                className="absolute right-[-20px] top-[102px] h-7 w-7"
                src="/372369d3027ae94856961e58ae70ea01.png"
              />
              <img
                className="absolute right-[110px] top-[130px] h-7 w-7"
                src="/372369d3027ae94856961e58ae70ea01.png"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="absolute left-[28px] top-[28px] justify-start">
                <span className="text-2xl font-medium capitalize text-neutral-800">
                  {t("hello")}{" "}
                </span>
                <span className="text-2xl font-medium capitalize text-rose-600">
                  {GetUserName()}
                </span>
                <span className="text-2xl font-medium capitalize text-neutral-800">
                  {" "}
                  👋
                </span>
              </div>

              <div className="absolute left-[28px] top-[69px] justify-start text-xs font-normal text-zinc-500">
                {t("welcome_to")} {window.location.hostname}
              </div>
              <div className="absolute left-[28px] top-[107px] h-14 w-14">
                <div className="absolute left-0 top-0 h-14 w-14 rounded-lg bg-orange-50" />
                <div className="absolute left-[16px] top-[16px] flex h-6 w-6 items-center justify-center overflow-hidden">
                  <DollarSign className="h-5 w-5 text-orange-500" />
                </div>
              </div>
              <div className="absolute left-[213px] top-[107px] h-14 w-14">
                <div className="absolute left-0 top-0 h-14 w-14 rounded-lg bg-emerald-50" />
                <div className="absolute left-[16px] top-[16px] flex h-6 w-6 items-center justify-center overflow-hidden">
                  <StockOutlined className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
              <div className="absolute left-[422px] top-[107px] h-14 w-14">
                <div className="absolute left-0 top-0 h-14 w-14 rounded-lg bg-violet-100" />
                <div className="absolute left-[16px] top-[16px] flex h-6 w-6 items-center justify-center overflow-hidden">
                  <ShoppingBag className="h-5 w-5 text-violet-500" />
                </div>
              </div>
              <div className="absolute left-[96px] top-[114px] inline-flex flex-col items-start justify-start gap-2">
                <div className="justify-start text-base font-bold text-black">
                  {GetBalance()}$
                </div>
                <div className="justify-start self-stretch text-xs font-normal text-zinc-500">
                  {t("balance")}
                </div>
              </div>
              <div className="absolute left-[281px] top-[114px] inline-flex flex-col items-start justify-start gap-2">
                <div className="justify-start text-base font-bold text-black">
                  {GetBalance()}$
                </div>
                <div className="justify-start text-xs font-normal text-zinc-500">
                  {t("balanceSpent")}
                </div>
              </div>
              <div className="absolute left-[490px] top-[114px] inline-flex flex-col items-start justify-start gap-2">
                <div className="justify-start text-base font-bold text-black">
                  {GetTotalBalanceSpent()}$
                </div>
                <div className="justify-start text-xs font-normal text-zinc-500">
                  {t("totalOrder")}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Show on mobile */}
        <div className="flex w-full flex-col gap-4 md:hidden md:h-[191px] md:w-[70%]">
          <div className="relative h-auto rounded-xl bg-white p-4 shadow-md md:h-48">
            <div className="sm:hidden">
              <img
                className="absolute bottom-0 right-[-10px] h-[122px] w-[145px]"
                src="/user.png"
              />
              <img
                className="absolute bottom-3 right-[0px] h-[29px] w-[27px]"
                src="/372369d3027ae94856961e58ae70ea01.png"
              />
              <img
                className="absolute right-[110px] top-[180px] h-7 w-7"
                src="/372369d3027ae94856961e58ae70ea01.png"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative flex flex-col md:flex-row md:items-center">
                <div className="mb-4 md:mb-0">
                  <span className="text-xl font-medium capitalize text-neutral-800 md:text-2xl">
                    Hello{" "}
                  </span>
                  <span className="text-xl font-medium capitalize text-rose-600 md:text-2xl">
                    {GetUserName()}
                  </span>
                  <span className="text-xl font-medium capitalize text-neutral-800 md:text-2xl">
                    {" "}
                    👋
                  </span>
                </div>

                <div className="text-sm font-normal text-zinc-500">
                  Welcome to {window.location.hostname}
                </div>
              </div>
              <div className="flex flex-col flex-wrap justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-50">
                    <DollarSign className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-black">
                      {GetBalance()}$
                    </div>
                    <div className="text-xs font-normal text-zinc-500">
                      Balance
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-emerald-50">
                    <StockOutlined className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-black">
                      {GetBalance()}$
                    </div>
                    <div className="text-xs font-normal text-zinc-500">
                      Balance spent
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-violet-100">
                    <ShoppingBag className="h-5 w-5 text-violet-500" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-black">
                      {GetTotalBalanceSpent()}$
                    </div>
                    <div className="text-xs font-normal text-zinc-500">
                      Total order
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column - 4/12 width (33.33%) */}
        <div className="hidden h-[191px] w-[641px] flex-col gap-4 md:flex md:w-[30%]">
          <div className="h-[200px] rounded-xl bg-white p-4 shadow-md">
            <div className="flex flex-col items-start justify-start gap-2 p-4">
              {/* Icon & Title */}
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100">
                  <HistoryOutlined className="text-lg text-blue-500" />
                </div>
                <div className="text-base font-medium capitalize text-neutral-800">
                  {t("orderHistory")}
                </div>
              </div>

              {/* Description */}
              <div className="mt-2 text-xs font-normal capitalize text-neutral-500">
                {t("orderHistoryDescription")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 flex-wrap items-start gap-6">
        <div className="col-span-12 rounded-lg bg-white p-6 shadow-md md:col-span-7">
          <div className="mb-4 flex items-center gap-2 text-base font-bold text-black">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-violet-100">
              <ShoppingBag className="h-5 w-5 text-violet-600" />
            </div>
            <span>{t("newOrder")}</span>
          </div>
          <CustomForm
            form={form} // Thêm dòng này
            onFinish={onFinish}
            layout="vertical"
            style={{ width: "100%" }}
          >
            <Space.Compact style={{ width: "100%" }} className="mb-4">
              <Input style={{ width: "40px" }} prefix={<SearchOutlined />} />
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                loading={isLoading}
                style={{ width: "calc(100% - 40px)", height: "40px" }}
                showSearch
                value={searchServiceId}
                onChange={(value: number) => handleSearchServiceSelect(value)}
                options={services.map((item) => ({
                  value: item.id,
                  label: (
                    <Space size={5}>
                      <IdContainer value={item.id || 0} />
                      <div>
                        {item.name} - ${item.rate_1000} per 1000
                      </div>
                    </Space>
                  ),
                }))}
                placeholder={t("searchService")}
                filterOption={(input, option) => {
                  const service = services.find(
                    (service) => service.id === option?.value,
                  );
                  if (!service) return false;
                  const serviceName = service.name.toLowerCase();
                  const serviceId = service.id.toString();
                  return (
                    serviceName.includes(input.toLowerCase()) ||
                    serviceId.includes(input)
                  );
                }}
              />
            </Space.Compact>
            <CustomFormItem
              label={t("category")}
              name="category_id"
              rules={[{ required: true, message: t("pleaseSelectCategory") }]}
            >
              <Select
                options={categories.map((category: CategoryType) => ({
                  label: category.name,
                  value: category.id,
                }))}
                style={{ height: "40px" }}
                placeholder={t("pleaseSelectCategory")}
                onChange={handleCategoryChange}
              />
            </CustomFormItem>
            <CustomFormItem
              label={t("service")}
              name="service_id"
              rules={[{ required: true, message: t("pleaseSelectService") }]}
            >
              <Select
                style={{ height: "40px" }}
                options={filteredServices.map((service: ServiceType) => ({
                  label: (
                    <Space size={5}>
                      <IdContainer value={service.id || 0} />
                      <div>
                        {service.name} - ${service.rate_1000} per 1000
                      </div>
                    </Space>
                  ),
                  value: service.id,
                }))}
                placeholder={t("selectService")}
                onChange={handleServiceChange}
              />
            </CustomFormItem>
            <CustomFormItem
              label={t("link")}
              name="link"
              rules={[{ required: true, message: t("pleaseEnterLink") }]}
            >
              <Input placeholder={t("enterLink")} style={{ height: "40px" }} />
            </CustomFormItem>
            <CustomFormItem
              label={t("quantity")}
              name="quantity"
              rules={[
                { required: true, message: t("pleaseEnterQuantity") },
                {
                  type: "number",
                  min: Number(selectedService?.min_order || 1),
                  message: `${t("min")}: ${selectedService?.min_order}`,
                },
              ]}
            >
              <Input
                type="number"
                placeholder={t("enterQuantity")}
                disabled={isTypeOne}
                value={quantity}
                min={selectedService?.min_order || 1}
                onChange={(e) => {
                  if (!isTypeOne) {
                    const value = Number(e.target.value);
                    setQuantity(value);
                    form.setFieldsValue({ quantity: value });
                  }
                }}
                style={{ height: "40px" }}
              />
              <p className="mt-2 text-xs font-normal capitalize text-neutral-500">
                Min:{selectedService?.min_order} - Max:
                {selectedService?.max_order}
              </p>{" "}
            </CustomFormItem>
            {showCommentsField && (
              <CustomFormItem label={t("comments")} name="comments">
                <TextArea
                  rows={4}
                  placeholder={t("enterComments")}
                  onChange={handleCommentChange}
                />
              </CustomFormItem>
            )}
            <CustomFormItem label={t("averageTime")} name="average_time">
              <Input
                disabled
                // placeholder={t("enterAverageTime")}
                style={{ height: "40px" }}
              />
            </CustomFormItem>
            <CustomFormItem label={t("charge")} name="charge">
              <Input
                disabled
                placeholder={t("calculatedCharge")}
                style={{ height: "40px" }}
              />
            </CustomFormItem>
            <Space className="mt-4 w-full" direction="vertical">
              <Button
                // style={{ backgroundColor: "#2CA58D" }}
                className="h-[40px] w-full rounded-lg bg-[#EA1261] py-3 font-bold text-white hover:bg-[#d11157]"
                htmlType="submit"
                loading={isLoading}
              >
                {t("submit")}
              </Button>
            </Space>
          </CustomForm>
        </div>
        <div className="col-span-12 rounded-xl bg-white p-6 shadow-md md:col-span-5">
          {/* Icon & Title */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
            </div>
            <h2 className="text-lg font-semibold text-neutral-800">
              {t("quickTips")}
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-3 text-sm leading-relaxed text-neutral-700">
            <div className="flex items-start gap-2">
              <span className="mt-1 text-green-500">✔️</span>
              <p>{t("needNoticeablePresence")}</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 text-blue-500">💡</span>
              <p>{t("helpWithThat")}</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-1 text-purple-500">📦</span>
              <p>{t("placeOrder")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;

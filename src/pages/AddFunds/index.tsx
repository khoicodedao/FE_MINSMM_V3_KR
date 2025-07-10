import "./style.scss";
import { useEffect, useState } from "react";
import { message, Button, Table, Select, Form, Checkbox, Card } from "antd";
import CustomForm from "components/Antd/CustomForm";
import CustomFormItem from "components/Antd/CustomFormItem";
import CustomInput from "components/Antd/CustomInput";
import { paymentMethodAPI } from "api/paymentMethod";
import { paymentAPI } from "api/payment";
import { PaymentMethodType, PaymentType } from "constants/types";
import dataResponse from "./data.json";
import {
  convertMode,
  convertStatus,
  PAYMENT_MODE_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
} from "constants/payments";
import { GetApiKey, GetIdUser } from "utils/user";
import { formatDateWithHour } from "utils/date";
//@ts-ignore
import { useTranslation } from "react-i18next";
import QRCodePopup from "./component/QR_code";
import QRAmount from "./component/QR_code/Amount";
import BinancePopup from "./component/Binance";
import QRCodeTHPopup from "./component/Thai";
import QRAmountTH from "./component/Thai/Amount";
import { PAYMENT_METHOD_TYPE } from "./constants";
import {
  AlertOutlined,
  CopyOutlined,
  DownCircleOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { WalletOutlined } from "@ant-design/icons";

interface Bank {
  id: number;
  name: string;
  logo: string;
  isSelected: boolean;
}
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // You could add a toast notification here
};

const AddFunds = () => {
  const [form] = Form.useForm();
  const [binanceAmount, setBinanceAmount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false); //popup-payment-method
  const [isPopupOpenThai, setIsPopupOpenThai] = useState(false); //popup-payment-method
  const [isloadingPay, setIsLoadingPay] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenThaiPopup = () => {
    setIsPopupOpenThai(true);
  };

  const handleCloseThaiPopup = () => {
    setIsPopupOpenThai(false);
  };

  const [isPopupBinanceOpen, setIsPopupBinanceOpen] = useState(false); //popup-payment-method
  const [qrData, setQrData] = useState<{ qr_code: string; emv: string } | null>(
    null,
  );
  const handleOpenBinancePopup = () => {
    setIsPopupBinanceOpen(true);
  };
  const handleCloseBinancePopup = () => {
    setIsPopupBinanceOpen(false);
  };

  //data sample response from QR payment

  const { t } = useTranslation();
  const steps = [
    {
      title: t("step1"),
    },
    {
      title: t("step2"),
    },
    {
      title: t("step3"),
    },
    {
      title: t("step4"),
    },
  ];
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([]);
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [isLoadingGetPayment, setIsLoadingGetPayment] =
    useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>(null);
  const [selectedInstruction, setSelectedInstruction] = useState<string>("");
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });

  // Fetch Payment Methods
  const fetchPaymentMethod = async () => {
    try {
      const response = await paymentMethodAPI.getAll({}, GetApiKey() || "");
      if (response.data.status === 200) {
        setPaymentMethods([...response.data.result]);
      } else {
        message.error(
          response.data.error.message || t("failedToFetchPaymentMethods"),
        );
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { status, error: apiError } = error.response.data;
        if (apiError?.message) {
          message.error(apiError.message);
        } else {
          message.error(t("unexpectedErrorOccurred"));
        }
      } else {
        message.error(t("failedToFetchPaymentMethods"));
      }
    }
  };

  const fetchPayments = async () => {
    setIsLoadingGetPayment(true);
    const user_id = GetIdUser() ?? 0;
    try {
      const response = await paymentAPI.getPaymentsByUser(
        params,
        user_id,
        GetApiKey() || "",
      );
      if (response.data.status === 200) {
        setPayments(response.data.result.data || []);
        if (!form.getFieldValue("payment_method_id")) {
          form.setFieldsValue({
            payment_method_id:
              paymentMethods[0]?.id ||
              response.data.result.data[0]?.payment_method_id,
          });
        }
        setTotalPayments(response.data.result.total || 0);
      } else {
        message.error(
          response.data.error.message || t("failedToFetchPayments"),
        );
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { status, error: apiError } = error.response.data;
        if (apiError?.message) {
          message.error(apiError.message);
        } else {
          message.error(t("unexpectedErrorOccurred"));
        }
      } else {
        message.error(t("failedToFetchPayments"));
      }
    } finally {
      setIsLoadingGetPayment(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethod();
    fetchPayments();
  }, [params]);

  useEffect(() => {
    if (paymentMethods.length > 0 && !selectedPaymentMethod) {
      const defaultMethod = paymentMethods[0]; // Select ACB (first method)
      setSelectedPaymentMethod(defaultMethod);
      setSelectedInstruction(defaultMethod.instruction || "");
      form.setFieldsValue({
        payment_method_id: defaultMethod.id, // Set form to ACB's ID (9)
      });
    }
  }, [paymentMethods, form, selectedPaymentMethod]);
  //Thanh toan Binance code cu cua Binance
  const handleBinancePayment = async (values: any) => {
    try {
      const response = await paymentAPI.create(values, GetApiKey() || "");
      if (response.data.status === 200) {
        message.success(t("paymentAddedSuccessfully"));
        fetchPayments();
      } else {
        message.error(response.data.error.message || t("failedToAddPayment"));
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { status, error: apiError } = error.response.data;
        if (apiError?.message) {
          message.error(apiError.message);
        } else {
          message.error(t("unexpectedErrorOccurred"));
        }
      } else {
        message.error(t("failedToAddPayment"));
      }
    }
  };
  const onFinish = async (values: any) => {
    const selectedMethod = paymentMethods.find(
      (method) => method.id === values.payment_method_id,
    );
    setIsLoadingPay(true);
    if (selectedMethod?.type === PAYMENT_METHOD_TYPE.BANK_VN.value) {
      const response = await paymentAPI.create(
        {
          money: values.usdAmount,
          payment_method_id: values.payment_method_id,
        },
        GetApiKey() || "",
      );
      if (response.data.status === 200) {
        const responseQR = await paymentAPI.getQR(
          { id: response.data.result.id },
          GetApiKey() || "",
        );
        if (responseQR.data.status === 200) {
          setQrData(responseQR.data.result); // Lưu dữ liệu QR vào state
          message.success(t("paymentAddedSuccessfully"));
          handleOpenPopup();
          setIsLoadingPay(false);
        } else {
          message.error(
            responseQR.data.error.message || t("failedToFetchQRCode"),
          );
          setIsLoadingPay(false);
        }
      } else {
        message.error(response.data.error.message || t("failedToAddPayment"));
      }
    } else if (selectedMethod?.type === PAYMENT_METHOD_TYPE.BANK_KR.value) {
      const response = await paymentAPI.create(
        {
          money: values.usdAmount,
          payment_method_id: values.payment_method_id,
        },
        GetApiKey() || "",
      );
      if (response.data.status === 200) {
        const responseQR = await paymentAPI.getQR(
          { id: response.data.result.id },
          GetApiKey() || "",
        );
        if (responseQR.data.status === 200) {
          setQrData(responseQR.data.result); // Lưu dữ liệu QR vào state
          message.success(t("paymentAddedSuccessfully"));
          handleOpenThaiPopup();
          setIsLoadingPay(false);
        } else {
          message.error(
            responseQR.data.error.message || t("failedToFetchQRCode"),
          );
          setIsLoadingPay(false);
        }
      } else {
        message.error(response.data.error.message || t("failedToAddPayment"));
      }
    } else {
      handleOpenBinancePopup();
      setBinanceAmount(values.money);
      setIsLoadingPay(false);
      // handleBinancePayment(values);
    }
  };

  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
      align: "center" as const,
    },
    {
      title: t("date"),
      dataIndex: "createdAt",
      key: "createdAt",
      align: "left" as const,
      render: (createdAt: string) => formatDateWithHour(createdAt),
    },
    {
      title: t("paymentMethod"),
      dataIndex: "payment_method",
      key: "payment_method",
      align: "center" as const,
    },
    {
      title: t("amount"),
      dataIndex: "money",
      key: "money",
      align: "center" as const,
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (value: number) => convertStatus(value),
    },
  ];

  const [activeTab, setActiveTab] = useState("add");
  // const [activeBank, setActiveBank] = useState<any>(banks[0]);
  const scrollLeft = () => {
    const container = document.getElementById("bank-carousel");
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById("bank-carousel");
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  return (
    <div className="max-w-[100vw] p-3 md:p-6">
      <div className="flex-1 overflow-y-auto">
        <h4 className="mb-6 text-start text-2xl font-bold text-black">
          {t("deposit")}
        </h4>
        <div className="mb-6 flex w-full flex-col gap-6 md:flex-row">
          <Card className="flex w-full flex-col space-y-6 md:w-1/2">
            <div className="mb-3 flex-col items-center justify-between md:flex-row">
              <h5 className="mb-3 flex items-center gap-2 border-b border-[#F1EFF5] pb-3 text-base font-bold">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
                  <WalletOutlined className="text-lg text-violet-500" />
                </div>

                {t("depositFundsToYourWallet")}
              </h5>

              <div>
                <button
                  className={`mr-1 flex-1 cursor-pointer rounded-md px-4 py-2 text-sm font-medium ${
                    activeTab === "add"
                      ? "bg-[#EA1261] text-white"
                      : "text-[#666270]"
                  }`}
                  onClick={() => setActiveTab("add")}
                >
                  {t("addFunds")}
                </button>
                <button
                  className={`flex-1 cursor-pointer rounded-md px-4 py-2 text-sm font-medium ${
                    activeTab === "history"
                      ? "bg-[#EA1261] text-white"
                      : "text-[#666270]"
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  {t("paymentHistory")}
                </button>
              </div>
            </div>

            <div className="mb-3 border-b border-[#F1EFF5]"></div>
            {activeTab === "add" ? (
              <div className="mb-6 grid gap-6">
                <QRCodePopup
                  isOpen={isPopupOpen}
                  onRequestClose={handleClosePopup}
                  //@ts-ignore
                  data={qrData || {}}
                />

                <BinancePopup
                  isOpen={isPopupBinanceOpen}
                  onRequestClose={handleCloseBinancePopup}
                  //@ts-ignore
                  data={{
                    amount: binanceAmount,
                    paymentMethod: selectedPaymentMethod || paymentMethods[0],
                  }}
                  fetchPayments={fetchPayments}
                ></BinancePopup>

                <QRCodeTHPopup
                  isOpen={isPopupOpenThai}
                  onRequestClose={handleCloseThaiPopup}
                  //@ts-ignore
                  data={qrData || {}}
                ></QRCodeTHPopup>

                <div className="col-span-12 overflow-hidden rounded-lg bg-white p-6 shadow-md md:col-span-6 lg:col-span-8">
                  <CustomForm form={form} onFinish={onFinish} layout="vertical">
                    <CustomFormItem
                      label={t("method")}
                      name="payment_method_id"
                      rules={[
                        {
                          required: true,
                          message: t("pleaseSelectPaymentMethod"),
                        },
                      ]}
                    >
                      <Select
                        placeholder={t("pleaseSelectPaymentMethod")}
                        value={selectedPaymentMethod?.id}
                        onChange={(value) => {
                          // Use onChange instead of onSelect for better compatibility
                          const selectedMethod = paymentMethods.find(
                            (method) => method.id === value,
                          );
                          setSelectedInstruction(
                            selectedMethod?.instruction || "",
                          );
                          setSelectedPaymentMethod(selectedMethod);
                        }}
                        options={paymentMethods.map((method) => ({
                          label: method.method_name,
                          value: method.id,
                        }))}
                        style={{ height: 40 }}
                      />
                    </CustomFormItem>
                    {selectedPaymentMethod?.type ===
                    PAYMENT_METHOD_TYPE.BANK_VN.value ? (
                      <QRAmount
                        exchangeRate={selectedPaymentMethod?.rate || 25000}
                      />
                    ) : selectedPaymentMethod?.type ===
                      PAYMENT_METHOD_TYPE.BANK_KR.value ? (
                      <QRAmountTH
                        exchangeRate={selectedPaymentMethod?.rate || 10000}
                      />
                    ) : (
                      <CustomFormItem
                        label={t("amount")}
                        name="money"
                        rules={[
                          { required: true, message: t("pleaseEnterAmount") },
                        ]}
                      >
                        <CustomInput
                          placeholder={t("pleaseEnterAmount")}
                          type="number"
                          style={{ height: 40 }}
                        />
                      </CustomFormItem>
                    )}
                    <div className="mb-4">
                      <Checkbox></Checkbox> {t("understand")}
                    </div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full"
                      loading={isloadingPay}
                    >
                      {t("pay")}
                    </Button>
                  </CustomForm>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* <h3 className="text-base font-medium">Payment history</h3> */}
                <p className="text-sm leading-relaxed text-[#212121]">
                  <div className="overflow-hidden rounded-lg bg-white">
                    <Table
                      columns={columns}
                      dataSource={payments}
                      pagination={{
                        current: params.page,
                        pageSize: params.limit,
                        total: totalPayments,
                        onChange: (page, pageSize) => {
                          setParams((prevParams) => ({
                            ...prevParams,
                            page,
                            limit: pageSize,
                          }));
                        },
                      }}
                      loading={isLoadingGetPayment}
                      rowKey="id"
                      scroll={{ x: 600 }}
                    />
                  </div>
                </p>
              </div>
            )}
          </Card>

          <Card className="w-full space-y-6 rounded-xl bg-white md:w-1/2">
            <div className="mb-3 space-y-4">
              <h5
                className="text-center text-base font-bold"
                style={{ fontSize: "16px" }}
              >
                {t("instruction")}
              </h5>

              <div className="relative">
                <div className="col-span-12 flex h-fit items-start break-words rounded-lg bg-white p-6 shadow-md md:col-span-6 lg:col-span-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2ca58d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-info-circle mr-1 min-w-[24px] text-blue-500"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                    <path d="M12 9h.01" />
                    <path d="M11 12h1v4h1" />
                  </svg>
                  <div className="flex w-full flex-col text-[#66635a]">
                    <h6 className="text-[16px] font-medium">
                      {t("instruction")}
                    </h6>
                    <div className="space-y-2 text-sm leading-relaxed text-neutral-700">
                      <div className="mb-6">
                        <Steps
                          direction="vertical" // hoặc "horizontal" nếu bạn muốn hiển thị ngang
                          current={steps.length} // hoặc để là -1 nếu không muốn highlight bước nào
                          items={steps}
                        />
                        {selectedInstruction && (
                          <div
                            className="mt-4 rounded-md bg-gray-50 p-4 text-sm text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: selectedInstruction,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AddFunds;

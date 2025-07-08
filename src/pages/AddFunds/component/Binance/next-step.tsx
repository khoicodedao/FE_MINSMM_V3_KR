import React, {useEffect, useState} from "react";
import {Button, Input, Typography, Space, message, Form} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import Logo from "assets/LogoSystem/min_logo.png";
import CustomForm from "components/Antd/CustomForm";
import CustomFormItem from "components/Antd/CustomFormItem";
import CustomInput from "components/Antd/CustomInput";
import {paymentAPI} from "api/payment";
import {GetApiKey} from "utils/user";
// @ts-ignore
import {useTranslation} from "react-i18next";

const {Title, Text} = Typography;

interface PaymentProps {
    data: {
        amount: number;
        invoiceId: string;
        binanceId: string;
        paymentMethodId: number,
    };
    fetchPayments: any;
    onRequestClose: () => void;
}

const NextStep: React.FC<PaymentProps> = ({ data, fetchPayments, onRequestClose }) => {
    const [orderId, setOrderId] = useState("");
    const [form] = Form.useForm();
    const {t} = useTranslation();

    const handleCopy = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => message.success("Copied to clipboard!"))
            .catch(() => message.error("Failed to copy!"));
    };

    useEffect(() => {
        form.setFieldsValue({
            payment_method_id: data.paymentMethodId,
            money: data.amount,
        });
    });

    const onFinish = async (values: any) => {
        try {
            const response = await paymentAPI.create(values, GetApiKey() || "");
            if (response.data.status === 200) {
                message.success(t("paymentAddedSuccessfully"));
                onRequestClose();
                fetchPayments();
            } else {
                message.error(response.data.error.message || t("failedToAddPayment"));
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                const {status, error: apiError} = error.response.data;
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

    return (
        <div
            style={{
                margin: "auto",
                textAlign: "center",
                padding: 20,
                border: "1px solid #ddd",
                borderRadius: 10,
                color: "white",
            }}
        >
            <img
                className="m-auto w-fit"
                src="https://pay.jtsmmpanel.com/assets/template/images/international/binance-personal.png"
                alt="Binance"
                style={{width: 200, marginBottom: 10}}
            />
            <div className="flex items-center justify-between">
                {/*<div
          style={{
            background: "var( --primary-color-blur)",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "var(--primary-color)" }}>
            Invoice ID: {data.invoiceId}
          </Text>
        </div>
        <div
          style={{
            background: "var( --primary-color-blur)",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "var(--primary-color)" }} strong>
            USDT: {data.amount}
          </Text>
        </div>*/}
            </div>

            <CustomForm form={form} onFinish={onFinish} layout="vertical">
                <CustomFormItem
                    name="payment_method_id"
                    hidden
                >
                </CustomFormItem>
                <CustomFormItem
                    name="money"
                    hidden
                >
                </CustomFormItem>
                <CustomFormItem
                    name="order_id"
                    rules={[{required: true, message: t("pleaseEnterAmount")}]}
                >
                    <CustomInput
                        placeholder="Enter Order ID"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        style={{marginBottom: 10}}
                    />
                </CustomFormItem>
                {/*<Input*/}
                {/*    placeholder="Enter Order ID"*/}
                {/*    value={orderId}*/}
                {/*    onChange={(e) => setOrderId(e.target.value)}*/}
                {/*    style={{marginBottom: 10}}*/}
                {/*/>*/}
                <div
                    style={{
                        background: "var( --primary-color-blur)",
                        padding: 10,
                        borderRadius: 5,
                        color: "white",
                        marginBottom: 10,
                    }}
                >
                    <Text style={{color: "var(--primary-color)"}} strong>
                        • Open Binance App → Pay → Send to Binance User or{" "}
                        <a href="#" style={{color: "#ffcc00"}}>
                            Click here
                        </a>
                    </Text>
                    <br/>
                    <Text style={{color: "var(--primary-color)"}} strong>
                        • Send to Binance ID: <strong>{data.binanceId}</strong>
                    </Text>
                    <Button
                        icon={<CopyOutlined/>}
                        size="small"
                        onClick={() => handleCopy(data.binanceId)}
                        style={{marginLeft: 5, color: "var(--primary-color)"}}
                    >
                        Copy
                    </Button>
                    <br/>
                    <Text style={{color: "var(--primary-color)"}} strong>
                        • Amount: <strong>{data.amount} USDT</strong>
                    </Text>
                    <Button
                        icon={<CopyOutlined/>}
                        size="small"
                        onClick={() => handleCopy(data.amount.toString())}
                        style={{marginLeft: 5, color: "var(--primary-color)"}}
                    >
                        Copy
                    </Button>
                    <br/>
                    <Text style={{color: "var(--primary-color)"}} strong>
                        • Complete The Payment
                    </Text>
                    <br/>
                    <Text style={{color: "var(--primary-color)"}} strong>
                        🟡 After completing the payment, paste the <strong>Order ID</strong>{" "}
                        above and click <strong>SUBMIT</strong>
                    </Text>
                </div>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    disabled={!orderId}
                    style={{background: "var(--primary-color)", color: "white"}}
                >
                    SUBMIT
                </Button>
            </CustomForm>
        </div>
    );
};
export default NextStep;

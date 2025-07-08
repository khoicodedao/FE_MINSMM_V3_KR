import "./style.scss";
import React, { useState } from "react";
import {
  Button,
  Col,
  Row,
  Card,
  Collapse,
  Input,
  Select,
  Form,
  message,
} from "antd";

import CustomForm from "components/Antd/CustomForm";
import CustomFormItem from "components/Antd/CustomFormItem";
//@ts-ignore
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

interface ChildPanelProps {
  fixedPricePerMonth?: number;
}

const ChildPanel: React.FC<ChildPanelProps> = ({ fixedPricePerMonth }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        message.success("Child panel order submitted successfully!");
        setIsLoading(false);
        form.resetFields();
      }, 1000);
    } catch (error) {
      message.error("Failed to submit order.");
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <h4 className="mb-6 text-2xl font-bold text-black">{t("childPanel")}</h4>
      <div className="bg-white p-1">
        <CustomForm
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ width: "100%" }}
          initialValues={{
            currency: "USD", // Đặt giá trị mặc định cho trường currency
            ...(fixedPricePerMonth && { price_per_month: fixedPricePerMonth }),
          }}
        >
          {/* Domain Field */}
          <CustomFormItem
            label={t("domain")}
            name="domain"
            rules={[{ required: true, message: t("pleaseEnterDomain") }]}
          >
            <Input placeholder={t("enterDomain")} style={{ height: "40px" }} />
          </CustomFormItem>

          {/* Nameserver Information */}
          <div
            className="mb-4 rounded-lg p-4 text-sm"
            style={{
              backgroundColor: "rgb(234 18 97 / 10%)",
              color: "rgb(234 18 97)",
            }}
          >
            <p>{t("pleaseChangeNameservers")}:</p>
            <ul className="list-disc pl-6">
              <li>cory.ns.cloudflare.com</li>
              <li>katja.ns.cloudflare.com</li>
            </ul>
          </div>

          {/* Currency Field */}
          <CustomFormItem
            label={t("currency")}
            name="currency"
            rules={[{ required: true, message: t("pleaseSelectCurrency") }]}
          >
            <Select
              options={[{ label: "United States Dollars (USD)", value: "USD" }]}
              defaultActiveFirstOption={true}
              placeholder={t("selectCurrency")}
              style={{ height: "40px" }}
              disabled // Vô hiệu hóa trường Select
            />
          </CustomFormItem>

          {/* Admin Username Field */}
          <CustomFormItem
            label={t("adminUsername")}
            name="admin_username"
            rules={[{ required: true, message: t("pleaseEnterAdminUsername") }]}
          >
            <Input
              placeholder={t("enterAdminUsername")}
              style={{ height: "40px" }}
            />
          </CustomFormItem>

          {/* Admin Password Field */}
          <CustomFormItem
            label={t("adminPassword")}
            name="admin_password"
            rules={[{ required: true, message: t("pleaseEnterAdminPassword") }]}
          >
            <Input.Password
              placeholder={t("enterAdminPassword")}
              style={{ height: "40px" }}
            />
          </CustomFormItem>

          {/* Confirm Password Field */}
          <CustomFormItem
            label={t("confirmPassword")}
            name="confirm_password"
            dependencies={["admin_password"]}
            rules={[
              { required: true, message: t("pleaseConfirmPassword") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("admin_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("passwordsDoNotMatch")));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={t("passwordsDoNotMatch")}
              style={{ height: "40px" }}
            />
          </CustomFormItem>

          {/* Price Per Month Field */}
          <CustomFormItem
            label={t("pricePerMonth")}
            name="price_per_month"
            rules={[
              { required: true, message: t("pleaseSelectPricePerMonth") },
            ]}
          >
            {fixedPricePerMonth ? (
              <Input
                value={fixedPricePerMonth}
                disabled
                style={{ height: "40px" }}
                suffix="$/month"
              />
            ) : (
              <Select
                placeholder={t("selectPricePerMonth")}
                style={{ height: "40px" }}
                options={[
                  { label: "Standard - $2/month", value: 2 },
                  { label: "Premium - $10/month", value: 10 },
                  { label: "Exclusive - $30/month", value: 30 },
                ]}
              />
            )}
          </CustomFormItem>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="mt-4 h-[40px] w-full rounded-lg bg-[#EA1261] text-white hover:bg-[#d11157]"
          >
            {t("submit")}
          </Button>
        </CustomForm>
      </div>
    </div>
  );
};

export default ChildPanel;

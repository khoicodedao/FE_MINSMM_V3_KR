import "./style.scss";
import React from "react";
import { Button, Col, Row, Input } from "antd";
//@ts-ignore
import { useTranslation } from "react-i18next";
import CustomForm from "components/Antd/CustomForm";
import CustomFormItem from "components/Antd/CustomFormItem";

const { TextArea } = Input;

const MassOrder: React.FC = () => {
  const { t } = useTranslation();

  const onFinish = (values: any) => {
    console.log("Form submitted with values:", values);
    // Add logic to handle form submission here
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Mass Order</h1>

      <div className="rounded-lg bg-white p-2 sm:p-6">
      <CustomForm
        initialValues={{ orderDetails: "" }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={[4, 4]}>
          <Col span={24}>
            <CustomFormItem
              label={t("oneOrderPerLine")}
              name="orderDetails"
              rules={[
                { required: true, message: t("pleaseEnterOrderDetails") },
              ]}
            >
              <TextArea
                size="large"
                rows={6}
                placeholder={t("serviceIdLinkQuantity")}
              />
            </CustomFormItem>
          </Col>
          <Col span={24}>
            <Button
              style={{ width: "100%", backgroundColor: "#2CA58D" }}
              type="primary"
              htmlType="submit"
            >
              {t("submit")}
            </Button>
          </Col>
        </Row>
      </CustomForm>
    </div>
    </div>
  );
};

export default MassOrder;

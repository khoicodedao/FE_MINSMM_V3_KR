import "./style.scss";
import React, { useState } from "react";
import { Button, Col, Row, Card, Collapse, Modal } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  ApiOutlined,
  DollarCircleOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ChildPanel from "pages/ChildPanel";
// @ts-ignore
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

const PricingPlans: React.FC = () => {
  const { t } = useTranslation();

  const allFeatures = [
    t("pricing_child_panel.features.ready"),
    t("pricing_child_panel.features.languages"),
    t("pricing_child_panel.features.payments"),
    t("pricing_child_panel.features.price_editing"),
    t("pricing_child_panel.features.template_2"),
    t("pricing_child_panel.features.template_5"),
    t("pricing_child_panel.features.custom_design"),
    t("pricing_child_panel.features.support_24"),
  ];

  const plans = [
    {
      title: t("pricing_child_panel.plans.standard.title"),
      price: "$2/month",
      features: [
        t("pricing_child_panel.features.ready"),
        t("pricing_child_panel.features.languages"),
        t("pricing_child_panel.features.payments"),
        t("pricing_child_panel.features.price_editing"),
        t("pricing_child_panel.features.template_2"),
      ],
      buttonText: t("pricing_child_panel.plans.standard.select"),
    },
    {
      title: t("pricing_child_panel.plans.premium.title"),
      price: "$10/month",
      features: [
        t("pricing_child_panel.features.ready"),
        t("pricing_child_panel.features.languages"),
        t("pricing_child_panel.features.payments"),
        t("pricing_child_panel.features.price_editing"),
        t("pricing_child_panel.features.template_2"),
        t("pricing_child_panel.features.service_editing"),
        t("pricing_child_panel.features.template_5"),
      ],
      buttonText: t("pricing_child_panel.plans.premium.select"),
      highlight: true,
    },
    {
      title: t("pricing_child_panel.plans.exclusive.title"),
      price: "$30/month",
      features: allFeatures,
      buttonText: t("pricing_child_panel.plans.exclusive.select"),
    },
  ];

  const [openChildPanel, setOpenChildPanel] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(
    undefined,
  );

  const handleOpenChildPanel = (price: string) => {
    const priceValue = Number(price.replace(/[^0-9]/g, ""));
    setSelectedPrice(priceValue);
    setOpenChildPanel(true);
  };

  return (
    <div className="plan-page p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">
        {t("pricing_child_panel.heading")}
      </h1>

      <div className="rounded-lg bg-white p-4 sm:p-6">
        <Row gutter={[16, 16]}>
          {plans.map((plan, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                title={
                  <h3
                    className={`text-lg font-bold ${
                      plan.highlight ? "text-green-600" : ""
                    }`}
                  >
                    {plan.title}
                  </h3>
                }
                bordered={true}
                className={`text-center shadow-md transition-shadow duration-300 hover:shadow-lg ${
                  plan.highlight ? "border-green-600" : ""
                }`}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-primary">
                    {plan.price}
                  </h2>
                  <ul className="my-4 text-left">
                    {allFeatures.map((feature, idx) => (
                      <li key={idx} className="mb-2 flex items-center">
                        {plan.features.includes(feature) ? (
                          <CheckCircleOutlined className="mr-2 text-green-600" />
                        ) : (
                          <CloseCircleOutlined className="mr-2 text-red-600" />
                        )}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <Button
                    type={plan.highlight ? "primary" : "default"}
                    block
                    className={plan.highlight ? "bg-green-600 text-white" : ""}
                    onClick={() => handleOpenChildPanel(plan.price)}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        open={openChildPanel}
        onCancel={() => setOpenChildPanel(false)}
        footer={null}
        width={600}
        destroyOnClose
      >
        <ChildPanel fixedPricePerMonth={selectedPrice} />
      </Modal>
    </div>
  );
};

export default PricingPlans;

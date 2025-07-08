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
const { Panel } = Collapse;

const PricingPlans: React.FC = () => {
  const allFeatures = [
    "Fully programmed and ready for immediate use",
    "All languages available",
    "Almost all payment methods available: Paypal, Visa, MasterCard, Skrill, Perfect Money, WebMoney, etc.",
    "Open, close, and edit service prices",
    "Add, delete, and edit all services",
    "2 design templates to choose from",
    "5 design templates to choose from",
    "Custom design or design based on your requirements",
    "24/24 customer support through tickets (e.g., dripfeed, cancel, refill, service information, etc.)",
  ];

  const plans = [
    {
      title: "Standard",
      price: "$2/month",
      features: [
        "Fully programmed and ready for immediate use",
        "All languages available",
        "Almost all payment methods available: Paypal, Visa, MasterCard, Skrill, Perfect Money, WebMoney, etc.",
        "Open, close, and edit service prices",
        "2 design templates to choose from",
      ],
      buttonText: "Select Standard",
    },
    {
      title: "Premium",
      price: "$10/month",
      features: [
        "Fully programmed and ready for immediate use",
        "All languages available",
        "Almost all payment methods available: Paypal, Visa, MasterCard, Skrill, Perfect Money, WebMoney, etc.",
        "Open, close, and edit service prices",
        "2 design templates to choose from",
        "Add, delete, and edit all services",
        "5 design templates to choose from",
      ],
      buttonText: "Select Premium",
      highlight: true,
    },
    {
      title: "Exclusive",
      price: "$30/month",
      features: [
        "Fully programmed and ready for immediate use",
        "All languages available",
        "Almost all payment methods available: Paypal, Visa, MasterCard, Skrill, Perfect Money, WebMoney, etc.",
        "Open, close, and edit service prices",
        "2 design templates to choose from",
        "Add, delete, and edit all services",
        "5 design templates to choose from",
        "Custom design or design based on your requirements",
        "24/24 customer support through tickets (e.g., dripfeed, cancel, refill, service information, etc.)",
      ],
      buttonText: "Select Exclusive",
    },
  ];

  const [openChildPanel, setOpenChildPanel] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(
    undefined,
  );

  const handleOpenChildPanel = (price: string) => {
    // Parse price string like "$2/month" to number 2
    const priceValue = Number(price.replace(/[^0-9]/g, ""));
    setSelectedPrice(priceValue);
    setOpenChildPanel(true);
  };

  return (
    <div className="plan-page p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Choose a suitable plan to build and start selling!
      </h1>

      {/* Pricing Plans Section */}
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

      {/* Modal Child Panel */}
      <Modal
        open={openChildPanel}
        onCancel={() => setOpenChildPanel(false)}
        footer={null}
        width={600}
        destroyOnClose
      >
        <ChildPanel fixedPricePerMonth={selectedPrice} />
      </Modal>

      {/* Introduction Section */}
      <div className="mt-8">
        <Collapse
          accordion={false}
          bordered={false}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <span
              className={`transition-transform ${
                isActive ? "rotate-90" : ""
              } text-pink-600`}
            ></span>
          )}
          className="custom-collapse"
        >
          <Panel
            header={
              <span className="flex items-center">
                <InfoCircleOutlined className="mr-2 text-pink-600" />
                <span className="font-semibold">What is child panel?</span>
              </span>
            }
            key="1"
          >
            <ul className="p-4 text-gray-700">
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                We provide you a panel and its own website exactly identical to
                our site in terms of features and additions and of course it
                works automatically.
              </li>
            </ul>
          </Panel>
          <Panel
            header={
              <span className="flex items-center">
                <ApiOutlined className="mr-2 text-pink-600" />
                <span className="font-semibold">How will it work?</span>
              </span>
            }
            key="2"
          >
            <ul className="p-4 text-gray-700">
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                You will buy services from our site automatically by linking the
                two sites to each other.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                Sell to your customer at a higher price and of course you can
                change it easily from your admin page.
              </li>
            </ul>
          </Panel>
          <Panel
            header={
              <span className="flex items-center">
                <GlobalOutlined className="mr-2 text-pink-600" />
                <span className="font-semibold">
                  What is the mechanism of the website?
                </span>
              </span>
            }
            key="3"
          >
            <ul className="p-4 text-gray-700">
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                When your customer purchases from your website, you
                automatically buy the same service that the customer requested
                from our website with the registered user we have.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                Where the two websites are linked via API, You copy the API code
                in your account here on our website and put it in the Providers
                box of your website then all things will be automatic.
              </li>
            </ul>
          </Panel>
          <Panel
            header={
              <span className="flex items-center">
                <SettingOutlined className="mr-2 text-pink-600" />
                <span className="font-semibold">What are the features?</span>
              </span>
            }
            key="4"
          >
            <ul className="p-4 text-gray-700">
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                The website is fully programmed and ready for immediate use.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                You can add, delete and edit all services on our website, and of
                course, change their prices.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                The website has several designs for you to choose from.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                All languages are available.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                Almost all payment methods are available: Paypal, Visa,
                MasterCard, Skrill, Perfect Money, WebMoney etc.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                You will also be given a special control panel for addicts to
                follow up on requests and payments, make any adjustments to the
                site and respond to tickets and other.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                The ability to modify a user in terms of prices, possibility of
                charging, Banning, and others.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                You can add more than one user to the site to enter the control
                page if you have employees.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                Multiple pages in the main interface of the site with the
                ability to delete and add any new page.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                You can add services with an infinite number.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                You can place orders for your clients in an infinite number on
                your site every month.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                All account features are available: from Editing the password,
                time and any other settings.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                You can also control orders manually if the need that arises.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />A special
                page for statistics, requests, amounts and tickets with a
                filtering system.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                The site is 100% safe and free from all loopholes and problems
                with programming.
              </li>
            </ul>
          </Panel>
          <Panel
            header={
              <span className="flex items-center">
                <UserOutlined className="mr-2 text-pink-600" />
                <span className="font-semibold">
                  Do I have to have a domain and hosting?
                </span>
              </span>
            }
            key="5"
          >
            <ul className="p-4 text-gray-700">
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                You should get a domain only and without hosting.
              </li>
            </ul>
          </Panel>
          <Panel
            header={
              <span className="flex items-center">
                <ClockCircleOutlined className="mr-2 text-pink-600" />
                <span className="font-semibold">
                  How long is installation and delivery?
                </span>
              </span>
            }
            key="6"
          >
            <ul className="p-4 text-gray-700">
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                The website will be delivered to you within a maximum of 12-24
                hours.
              </li>
              <li className="mb-2 flex items-center">
                <CheckCircleOutlined className="mr-2 text-green-600" />
                Of course, it can be delivered in a shorter time, depending on
                the pressure on the website's support.
              </li>
            </ul>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default PricingPlans;

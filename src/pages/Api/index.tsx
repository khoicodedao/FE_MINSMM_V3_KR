import React from "react";
import "pages/Api/style.scss";
import RowComponent from "pages/Api/components/RowComponent";
import { Row } from "antd";
//@ts-ignore
import { useTranslation } from "react-i18next";

const lightBlue = "#DEEFF5";

const Api = () => {
  const { t } = useTranslation();
  const hostName = window.location.hostname;
  const protocol = window.location.protocol;
  const url = `${protocol}//api.${hostName}/api/v2`;

  const jsonData1 = [
    [
      {
        service: 1,
        name: "Followers",
        type: "Default",
        category: "First Category",
        rate: "0.90",
        min: "50",
        max: "10000",
        refill: true,
        cancel: true,
      },
      {
        service: 2,
        name: "Comments",
        type: "Custom Comments",
        category: "Second Category",
        rate: "8",
        min: "10",
        max: "1500",
        refill: false,
        cancel: true,
      },
    ],
  ];
  const jsonData2 = {
    order: 23501,
  };
  const jsonData3 = {
    charge: "0.27819",
    start_count: "3572",
    status: "Partial",
    remains: "157",
    currency: "USD",
  };
  const jsonData4 = {
    "1": {
      charge: "0.27819",
      start_count: "3572",
      status: "Partial",
      remains: "157",
      currency: "USD",
    },
    "10": {
      error: "Incorrect order ID",
    },
    "100": {
      charge: "1.44219",
      start_count: "234",
      status: "In progress",
      remains: "10",
      currency: "USD",
    },
  };
  const jsonData5 = {
    balance: "100.84292",
    currency: "USD",
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Api Document</h1>

      <div className="rounded-lg bg-white p-6">
      <div className="text-[16px] font-bold">{t("apiDocs")}</div>
      <RowComponent title="HTTP Method" content="POST" />
      <RowComponent backgroundColor={lightBlue} title="API URL" content={url} />
      <RowComponent
        title="API Key"
        content="Get an API key on the Account page"
      />
      <RowComponent
        backgroundColor={lightBlue}
        title="Response format"
        content="JSON"
      />
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("serviceList")}</div>
      </Row>
      <RowComponent title="Parameters" content="Description" header={true} />
      <RowComponent title="key" content="Your API key" />
      <RowComponent
        backgroundColor={lightBlue}
        title="action"
        content="services"
      />
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("exampleResponse")}</div>
      </Row>
      <Row
        className="json-container"
        style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
      >
        {JSON.stringify(jsonData1, null, 3)}
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("addOrder")}</div>
      </Row>
      <Row className="font-semibold">Default</Row>
      <RowComponent title="Parameters" content="Description" />
      <RowComponent
        backgroundColor={lightBlue}
        title="key"
        content="Your API key"
      />
      <RowComponent title="action" content="add" />
      <RowComponent
        backgroundColor={lightBlue}
        title="service"
        content="Service ID"
      />
      <RowComponent title="link" content="Link to page" />
      <RowComponent
        backgroundColor={lightBlue}
        title="quantity"
        content="Needed quantity"
      />
      <RowComponent title="runs (optional)" content="Runs to deliver" />
      <RowComponent
        backgroundColor={lightBlue}
        title="interval (optional)"
        content="Interval in minutes"
      />
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("exampleResponse")}</div>
      </Row>
      <Row
        className="json-container"
        style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
      >
        {JSON.stringify(jsonData2, null, 3)}
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("orderStatus")}</div>
      </Row>
      <RowComponent title="Parameters" content="Description" />
      <RowComponent
        backgroundColor={lightBlue}
        title="key"
        content="Your API key"
      />
      <RowComponent title="action" content="add" />
      <RowComponent
        backgroundColor={lightBlue}
        title="key"
        content="Your API key"
      />
      <RowComponent title="action" content="Status" />
      <RowComponent
        backgroundColor={lightBlue}
        title="order"
        content="Order ID"
      />
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("exampleResponse")}</div>
      </Row>
      <Row
        className="json-container"
        style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
      >
        {JSON.stringify(jsonData3, null, 3)}
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("multipleOrdersStatus")}</div>
      </Row>
      <RowComponent title="Parameters" content="Description" />
      <RowComponent
        backgroundColor={lightBlue}
        title="key"
        content="Your API key"
      />
      <RowComponent
        backgroundColor={lightBlue}
        title="action"
        content="status"
      />
      <RowComponent
        backgroundColor={lightBlue}
        title="orders"
        content="Order IDs (separated by a comma, up to 100 IDs)"
      />
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("exampleResponse")}</div>
      </Row>
      <Row
        className="json-container"
        style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
      >
        {JSON.stringify(jsonData4, null, 3)}
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("userBalance")}</div>
      </Row>
      <RowComponent title="Parameters" content="Description" />
      <RowComponent
        backgroundColor={lightBlue}
        title="key"
        content="Your API key"
      />
      <RowComponent
        backgroundColor={lightBlue}
        title="action"
        content="balance"
      />
      <Row style={{ marginTop: "10px" }}>
        <div className="text-[16px] font-bold">{t("exampleResponse")}</div>
      </Row>
      <Row
        className="json-container"
        style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
      >
        {JSON.stringify(jsonData5, null, 3)}
      </Row>
    </div>
    </div>
  );
};

export default Api;

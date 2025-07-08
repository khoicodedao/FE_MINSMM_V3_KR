import React from "react";
import RowComponent from "./components/RowComponent";
import "pages/Login/components/ApiForm/style.scss";
import { Row } from "antd";

const lightBlue = "#DEEFF5";

const ApiForm = () => {
  const hostName = window.location.hostname;

  const port = window.location.port;

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
    <div className="mx-auto w-full max-w-[95%] rounded-2xl bg-white p-6 sm:max-w-[80%] xl:max-w-[720px]">
      <div className="page-content">
        <div className="form-submit-container">
          <Row>
            <div className="api-title text-[20px] font-bold">API DOCS</div>
          </Row>
          <RowComponent title="HTTP Method" content="POST" />
          <RowComponent
            backgroundColor={lightBlue}
            title="API URL"
            // content="https://doremonmmo.com/api/v2"
            content={url}
          />
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
            <div className="api-title">Service list</div>
          </Row>
          <RowComponent
            title="Parameters"
            content="Description"
            header={true}
          />
          <RowComponent title="key" content="Your API key" />
          <RowComponent
            backgroundColor={lightBlue}
            title="action"
            content="services"
          />
          <Row style={{ marginTop: "10px" }}>
            <div className="api-title">Example response</div>
          </Row>
          <Row
            className="json-container"
            style={{
              whiteSpace: "pre-wrap", // Preserves line breaks and whitespace
              fontFamily: "monospace", // Makes it more readable like in code
            }}
          >
            {JSON.stringify(jsonData1, null, 3)}
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <div className="api-title">Add order</div>
          </Row>
          <Row className="json-container">Default</Row>
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
            <div className="api-title">Example response</div>
          </Row>
          <Row
            className="json-container"
            style={{
              whiteSpace: "pre-wrap", // Preserves line breaks and whitespace
              fontFamily: "monospace", // Makes it more readable like in code
            }}
          >
            {JSON.stringify(jsonData2, null, 3)}
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <div className="api-title">Order status</div>
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
            content="	Order ID"
          />
          <Row style={{ marginTop: "10px" }}>
            <div className="api-title">Example response</div>
          </Row>
          <Row
            className="json-container"
            style={{
              whiteSpace: "pre-wrap", // Preserves line breaks and whitespace
              fontFamily: "monospace", // Makes it more readable like in code
            }}
          >
            {JSON.stringify(jsonData3, null, 3)}
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <div className="api-title">Multiple orders status</div>
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
            content="	Order IDs (separated by a comma, up to 100 IDs)"
          />
          <Row style={{ marginTop: "10px" }}>
            <div className="api-title">Example response</div>
          </Row>
          <Row
            className="json-container"
            style={{
              whiteSpace: "pre-wrap", // Preserves line breaks and whitespace
              fontFamily: "monospace", // Makes it more readable like in code
            }}
          >
            {JSON.stringify(jsonData4, null, 3)}
          </Row>

          <Row style={{ marginTop: "10px" }}>
            <div className="api-title">User balance</div>
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
            <div className="api-title">Example response</div>
          </Row>
          <Row
            className="json-container"
            style={{
              whiteSpace: "pre-wrap", // Preserves line breaks and whitespace
              fontFamily: "monospace", // Makes it more readable like in code
            }}
          >
            {JSON.stringify(jsonData5, null, 3)}
          </Row>
          <div className="background-container">{/* <  */}</div>
        </div>
      </div>
    </div>
  );
};

export default ApiForm;

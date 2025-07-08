import { Col, Row } from "antd";
import "pages/Login/components/ApiForm/components/RowComponent/style.scss";
import React from "react";

type Props = {
  title: string;
  content: string;
  backgroundColor?: string;
  header?: boolean;
};

const RowComponent: React.FC<Props> = ({
  title,
  content,
  backgroundColor,
  header,
}) => {
  return (
    <>
      {!header ? (
        <Row
          align={"middle"}
          gutter={[8, 8]}
          className="row-component-container"
          style={{
            background: backgroundColor ? backgroundColor : "#ffffff",
            height: "auto",
          }}
        >
          <Col
            span={10}
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {title}
          </Col>
          <Col
            span={14}
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {content}
          </Col>
        </Row>
      ) : (
        <Row
          align={"middle"}
          className="row-component-container"
          gutter={[8, 8]}
          style={{
            background: backgroundColor ? backgroundColor : "#ffffff",
            height: "auto",
          }}
        >
          <Col
            span={10}
            style={{
              fontWeight: 500,
              fontSize: 16,
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {title}
          </Col>
          <Col
            span={14}
            style={{
              fontWeight: 500,
              fontSize: 16,
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {content}
          </Col>
        </Row>
      )}
    </>
  );
};

export default RowComponent;

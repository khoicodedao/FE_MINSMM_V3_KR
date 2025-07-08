import { Col, Row } from "antd";
import "pages/Api/components/RowComponent/style.scss";
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
          className="row-component-container"
          style={{
            height: "auto",
            background: backgroundColor ? backgroundColor : "#ffffff",
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
          style={{
            height: "auto",
            background: backgroundColor ? backgroundColor : "#ffffff",
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

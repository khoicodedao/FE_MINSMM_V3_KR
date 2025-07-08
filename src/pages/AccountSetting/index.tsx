import React from "react";
import EmailChange from "./components/EmailChange";
import KeyGenerate from "./components/KeyGenerate";
import PasswordChange from "./components/PasswordChange";
import "pages/AccountSetting/style.scss";
import { Col, Row } from "antd";

const AccountSetting = () => {
  return (
    <div className="p-6">
      <Row gutter={[12, 12]} justify={'center'}>
        <Col span={22}>
          <EmailChange />
        </Col>
        <Col span={22}>
          <PasswordChange />
        </Col>
        <Col span={22}>
          <KeyGenerate />
        </Col>
      </Row>
    </div>
  );
};

export default AccountSetting;

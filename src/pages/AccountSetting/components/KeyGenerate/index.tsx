import React, { useEffect, useState } from "react";
import "pages/AccountSetting/components/KeyGenerate/style.scss";
import {
  Button,
  Col,
  Input,
  message,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { userAPI } from "api/user";
import { GetApiKey } from "utils/user";
import { MESSAGE } from "constants/message";
import { LOCAL_STORAGE_KEY } from "constants/enums";
import { formatDateWithHour } from "utils/date";

const KeyGenerate = () => {
  const [timeCreatedApiKey, setTimeCreatedApiKey] = useState<Date>();

  const [apiKey, setApiKey] = useState<string>("");

  const fetchTimeCreatedApiKey = async () => {
    try {
      const response = await userAPI.getTimeCreateApiKey(GetApiKey() || "");
      if (response.data.status === 200) {
        const newApiKey = response?.data?.result?.timeCreateApiKey;
        setTimeCreatedApiKey(newApiKey);
      }
    } catch (err) {}
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(apiKey)
      .then(() => {
        message.success("Copied"); // Show "Copied!" message for 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const generateNewApiKey = async () => {
    try {
      const response = await userAPI.refreshToken(GetApiKey() || "");
      if (response.data.status === 200) {
        message.success(MESSAGE.USERS.GENERATE_API_KEY_SUCCESS);
        const newApiKey = response?.data?.result?.newKey;
        await localStorage.setItem(LOCAL_STORAGE_KEY.API_KEY, newApiKey);
        setApiKey(newApiKey);
        fetchTimeCreatedApiKey();
        return;
      }
      message.error(MESSAGE.USERS.GENERATE_API_KEY_FAILED);
    } catch (err) {
      message.error(MESSAGE.USERS.GENERATE_API_KEY_FAILED);
    }
  };

  useEffect(() => {
    fetchTimeCreatedApiKey();
  }, []);

  return (
    <div className="key-generate-container">
      <Row gutter={[8, 8]} justify={"space-between"}>
        <Col span={24}>
          <div style={{ fontSize: "16px", fontWeight: 500 }}>API key</div>
        </Col>
        <Col span={18}>
          <Tooltip title="The key is hidden for security reasons">
            <Input size="large" value="*************************************" />
          </Tooltip>
        </Col>
        <Col
          span={4}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            // height: '120px'
          }}
        >
          <Button type="primary" size="large" onClick={generateNewApiKey}>
            Generate new
          </Button>
        </Col>
        {timeCreatedApiKey ? (
          <Col span={24}>Created: {formatDateWithHour(timeCreatedApiKey)}</Col>
        ) : null}
        {apiKey ? (
          <Col span={24}>
            <div className="api-key-container">
              <Row gutter={[4, 4]}>
                <Col>API key has been generated:</Col>
                <Col>
                  <a
                    style={{
                      width: "100%",
                      whiteSpace: "nowrap",
                      overflow: "visible",
                    }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy();
                    }}
                  >
                    {apiKey}
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default KeyGenerate;

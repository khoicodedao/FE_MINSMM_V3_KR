"use client";
import React from "react";
import { Modal, Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "./index.scss";

interface QRCodePopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: {
    qr_code: string;
    emv: string;
  };
}

const QRCodePopup: React.FC<QRCodePopupProps> = ({
  isOpen,
  onRequestClose,
  data,
}) => {
  const { qr_code, emv } = data;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(emv)
      .then(() => {
        message.success("Copied to clipboard!");
      })
      .catch(() => {
        message.error("Failed to copy!");
      });
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={onRequestClose}
      footer={[
        <Button
          className="bg-[#2ca58d] text-white"
          key="close"
          onClick={onRequestClose}
        >
          Close
        </Button>,
      ]}
    >
      <div>
        <img src={`${qr_code}`} alt="QR Code" />
        <div className="copy-container">
          <pre className="relative bg-[#cdefe9b7] p-4 text-[#2ca58d]">
            {emv}
            <CopyOutlined
              onClick={handleCopy}
              className="absolute right-2 top-2 cursor-pointer text-xl text-[#2ca58d]"
            />
          </pre>
        </div>
      </div>
    </Modal>
  );
};

export default QRCodePopup;

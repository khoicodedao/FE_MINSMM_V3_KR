"use client";
import React from "react";
import { Modal, Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import "./index.scss";

interface QRCodeTHPopupProps {
    isOpen: boolean;
    onRequestClose: () => void;
    data: {
        qr_code: string;
        emv: string;
    };
}

const QRCodeTHPopup: React.FC<QRCodeTHPopupProps> = ({
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
            open={isOpen}
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
            centered
            closable
            bodyStyle={{ padding: 24 }}
        >
            <div className="flex flex-col items-center space-y-4">
                <img
                    src={`data:image/png;base64,${qr_code}`}
                    alt="QR Code"
                    className="w-64 h-64 border rounded-lg shadow-sm"
                />

                <div className="relative w-full bg-[#cdefe9b7] p-4 text-[#2ca58d] rounded-md shadow-md">
                    <pre className="whitespace-pre-wrap break-words">{emv}</pre>
                    <CopyOutlined
                        onClick={handleCopy}
                        className="absolute right-3 top-3 cursor-pointer text-xl hover:text-[#1f7866]"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default QRCodeTHPopup;

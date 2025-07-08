import React, { useState } from "react";
import { Modal, Button, Space, Typography, Image, Steps } from "antd";
import {
  QuestionCircleOutlined,
  InfoCircleOutlined,
  CustomerServiceOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Logo from "assets/LogoSystem/min_logo.png";
import NextStep from "./next-step";

const { Title } = Typography;
const { Step } = Steps;

interface PaymentPopupProps {
  isOpen: boolean;
  onRequestClose: () => void;
  data: {
    amount: number;
    paymentMethod: any;
  };
  fetchPayments: any;
}

const BinancePopup: React.FC<PaymentPopupProps> = ({
  isOpen,
  onRequestClose,
  data,
  fetchPayments,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Modal visible={isOpen} onCancel={onRequestClose} footer={null} centered>
      <Steps current={currentStep}>
        {/*<Step/>*/}
        <Step />
        <Step />
      </Steps>
      {/*{currentStep === 0 && (
                <Space
                    direction="vertical"
                    style={{width: "100%", textAlign: "center"}}
                >
                    <Image
                        width={100}
                        height={100}
                        src={Logo}
                        alt="Logo"
                        preview={false}
                    />
                    <Space>
                        <Button icon={<CustomerServiceOutlined/>}>Support</Button>
                        <Button icon={<QuestionCircleOutlined/>}>FAQ</Button>
                        <Button icon={<InfoCircleOutlined/>}>Details</Button>
                    </Space>
                    <Button
                        style={{backgroundColor: "var(--primary-color)", color: "white"}}
                        type="primary"
                        block
                        onClick={next}
                    >
                        Select Payment Method
                    </Button>
                </Space>
            )}*/}
      {currentStep === 1 && (
        <Space
          className="pt-4"
          direction="vertical"
          style={{ width: "100%", textAlign: "center" }}
        >
          <div className="card-input flex w-full items-center justify-center rounded-md ring-1 ring-[#0057d0]/10">
            <img
              onClick={next}
              src="https://pay.jtsmmpanel.com/assets/template/images/international/binance-personal.png"
              alt="Binance Personal"
              className="bank-img"
            />
          </div>
          <Button
            style={{ backgroundColor: "var(--primary-color-blur)" }}
            type="primary"
            block
            onClick={next}
          >
            <p className="text-sm font-bold">Pay {data.amount} USD</p>
          </Button>

          <a onClick={prev}>
            <ArrowLeftOutlined /> Previous
          </a>
        </Space>
      )}
      {currentStep === 2 && (
        <Space
          className="pt-4"
          direction="vertical"
          style={{ width: "100%", textAlign: "center" }}
        >
          <NextStep
            data={{
              amount: data.amount,
              invoiceId: "gTlw9hxMS2z00CgzNOet",
              binanceId: data.paymentMethod.data.address,
              paymentMethodId: data.paymentMethod.id,
            }}
            fetchPayments={fetchPayments}
            onRequestClose={onRequestClose}
          />
          <a onClick={prev}>
            <ArrowLeftOutlined /> Previous
          </a>
        </Space>
      )}
    </Modal>
  );
};

export default BinancePopup;

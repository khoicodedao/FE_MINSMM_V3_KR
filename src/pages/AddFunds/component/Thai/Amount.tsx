"use client";
import React, { useState } from "react";
import { Button, Input } from "antd";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import CustomFormItem from "../../../../components/Antd/CustomFormItem";
import CustomInput from "../../../../components/Antd/CustomInput";
//@ts-ignore
import { useTranslation } from "react-i18next";

interface QRAmountTHProps {
  exchangeRate: number;
}

const QRAmountTH: React.FC<QRAmountTHProps> = ({ exchangeRate }) => {
  const { t } = useTranslation();
  const [usdAmount, setUsdAmount] = useState<number | undefined>(undefined);
  const [bathAmount, setBathAmount] = useState<number | undefined>(undefined);
  const [isUsdToBath, setIsUsdToBath] = useState(true);

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUsdAmount(value);
    setBathAmount(value ? value * exchangeRate : undefined);
  };

  const handleBathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBathAmount(value);
    setUsdAmount(value ? value / exchangeRate : undefined);
  };

  const handleSwap = () => {
    setIsUsdToBath((prev) => !prev);
    setUsdAmount(undefined);
    setBathAmount(undefined);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      {isUsdToBath ? (
        <>
          <CustomFormItem
            label={t("amountInUSD")}
            name="usdAmount"
            rules={[{ required: true, message: t("pleaseEnterAmount") }]}
          >
            <CustomInput
              placeholder={t("pleaseEnterAmount")}
              type="number"
              value={usdAmount}
              onChange={handleUsdChange}
              className="md:w-fit-content w-full"
              suffix="$"
              allowClear={false}
              style={{ textAlign: "center" }}
            />
          </CustomFormItem>
          <Button
            icon={<SwapOutlined />}
            style={{ border: "none", color: "var(--primary-color)" }}
            className="transfer-icon mt-3"
            onClick={handleSwap}
          />
          <div className="md:mt-0">
            <label style={{ position: "relative", bottom: "3px" }}>
              {t("amountInBath")}
            </label>
            <Input
              className="md:w-fit-content w-full"
              style={{ marginBottom: "10px" }}
              type="number"
              value={bathAmount}
              suffix="Bath"
              allowClear={false}
              readOnly
            />
          </div>
        </>
      ) : (
        <>
          <CustomFormItem
            label={t("amountInBath")}
            name="bathAmount"
            rules={[{ required: true, message: t("pleaseEnterAmount") }]}
          >
            <CustomInput
              placeholder={t("pleaseEnterAmount")}
              type="number"
              value={bathAmount}
              onChange={handleBathChange}
              className="md:w-fit-content w-full"
              suffix="Bath"
              allowClear={false}
              style={{ textAlign: "center" }}
            />
          </CustomFormItem>
          <Button
            icon={<SwapOutlined />}
            style={{ border: "none", color: "var(--primary-color)" }}
            className="transfer-icon mt-3"
            onClick={handleSwap}
          />
          <div className="md:mt-0">
            <label style={{ position: "relative", bottom: "3px" }}>
              {t("amountInUSD")}
            </label>
            <Input
              className="md:w-fit-content w-full"
              style={{ marginBottom: "10px" }}
              type="number"
              value={usdAmount}
              suffix="$"
              allowClear={false}
              readOnly
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QRAmountTH;

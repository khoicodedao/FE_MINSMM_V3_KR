"use client";
import React, { useState } from "react";
import { Button, Input } from "antd";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import CustomFormItem from "../../../../components/Antd/CustomFormItem";
import CustomInput from "../../../../components/Antd/CustomInput";
//@ts-ignore
import { useTranslation } from "react-i18next";

interface QRAmountProps {
    exchangeRate: number; // Thêm prop exchangeRate
}

const QRAmount: React.FC<QRAmountProps> = ({ exchangeRate }) => {
  const { t } = useTranslation();
  const [usdAmount, setUsdAmount] = useState<number | undefined>(undefined);
  const [vndAmount, setVndAmount] = useState<number | undefined>(undefined);

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUsdAmount(value);
    setVndAmount(value * exchangeRate);
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4">
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
      />
      <div className="md:mt-0">
        <label style={{ position: "relative", bottom: "3px" }}>
          {t("amountInVND")}
        </label>
        <Input
          className="md:w-fit-content w-full"
          style={{ marginBottom: "10px" }}
          type="number"
          value={vndAmount}
          suffix="VND"
          allowClear={false}
        />
      </div>
    </div>
  );
};

export default QRAmount;

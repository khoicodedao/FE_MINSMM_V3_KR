import React from "react";
import { Form, FormItemProps } from "antd";

interface CustomFormItemProps extends FormItemProps {
  children: React.ReactNode;
}

const CustomFormItem: React.FC<CustomFormItemProps> = ({
  name = "",
  label = "",
  rules = [],
  children,
  className = "",
  ...rest
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      className={className}
      {...rest}
      style={{ marginBottom: 15 }}
    >
      {children}
    </Form.Item>
  );
};

export default CustomFormItem;

import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Input, InputProps } from "antd";
import {
  CloseOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";

interface CustomInputProps extends InputProps {
  showPasswordToggle?: boolean;
  icon?: React.ReactNode;
}

const CustomInput = forwardRef<any, CustomInputProps>(
  (
    {
      type = "text",
      value,
      onChange,
      placeholder,
      style,
      className,
      disabled = false,
      allowClear = true,
      size = "middle",
      showPasswordToggle = false,
      icon = null,
      ...rest
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(
      type !== "password"
    );

    const inputRef = React.useRef<any>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => inputRef.current.input.value,
      setValue: (newValue: string) =>
        onChange && onChange({ target: { value: newValue } } as any),
      focus: () => inputRef.current?.focus(),
      clear: () => onChange && onChange({ target: { value: "" } } as any),
      togglePasswordVisibility: () => setIsPasswordVisible((prev) => !prev),
    }));

    const handleTogglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue: string | number = e.target.value;
      if (type === "number") {
        newValue = newValue === "" ? 0 : Number(newValue);
      }
      onChange && onChange({ target: { value: newValue } } as any);
    };

    const renderSuffix = () => {
      if (disabled) return null;
      if (type === "password" && showPasswordToggle) {
        return isPasswordVisible ? (
          <EyeOutlined onClick={handleTogglePasswordVisibility} />
        ) : (
          <EyeInvisibleOutlined onClick={handleTogglePasswordVisibility} />
        );
      }
      if (type === "search") {
        return <SearchOutlined />;
      }
      if (!allowClear && value) {
        return (
          <CloseOutlined onClick={() => onChange && onChange({ target: { value: "" } } as any)} />
        );
      }
      return null;
    };

    const inputType =
      type === "password" ? (isPasswordVisible ? "text" : "password") : type;

    return (
      <Input
        ref={inputRef}
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        size={size}
        suffix={renderSuffix()}
        prefix={icon}
        className={`custom-input ${className}`}
        style={style}
        {...rest}
      />
    );
  }
);

export default CustomInput;

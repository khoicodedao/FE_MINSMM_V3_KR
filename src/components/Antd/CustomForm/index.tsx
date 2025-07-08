import React, { useEffect } from "react";
import { Form, FormProps, FormInstance } from "antd";

interface CustomFormProps extends FormProps {
  formItemLayout?: Record<string, any>;
  children: React.ReactNode;
  form?: FormInstance;
}

const CustomForm: React.FC<CustomFormProps> = ({
  layout = "vertical",
  initialValues,
  onValuesChange,
  onFinish,
  formItemLayout,
  children,
  form: formProp,
}) => {
  const [form] = Form.useForm(formProp);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFormLayoutChange = (changedValues: any, allValues: any) => {
    if (onValuesChange) {
      onValuesChange(changedValues, allValues);
    }
  };

  return (
    <Form
      {...formItemLayout}
      layout={layout}
      form={form}
      initialValues={initialValues}
      onValuesChange={handleFormLayoutChange} 
      onFinish={onFinish}
      style={{ maxWidth: "100%" }}
    >
      {children}
    </Form>
  );
};

export default CustomForm;
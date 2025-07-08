import React from "react";
import "pages/AccountSetting/components/EmailChange/style.scss";
import * as Yup from "yup";
import { TYPE_FIELD } from "constants/enums";
import { useFormik } from "formik";
import { InputFiledParams } from "constants/types/Form_Field_type";
import { Form, Row, Col, Button, message } from "antd";
import InputFields from "components/InputFields";
import { userAPI } from "api/user";
import { GetApiKey } from "utils/user";
import { MESSAGE } from "constants/message";

const { INPUT } = TYPE_FIELD;

const css = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
const labelCol = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
const wrapperCol = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };

type EmailChangeType = {
  email: string;
  username: string;
};

const initialDataForm: EmailChangeType = {
  email: "",
  username: "",
};

const formSchema = Yup.object().shape({
  email: Yup.string().required("Please enter email"),
  username: Yup.string().required("Please enter username"),
});

const EmailChange = () => {
  const formData = useFormik({
    initialValues: initialDataForm,
    validationSchema: formSchema,
    onSubmit: async (data: any) => {
      try {
        const response = await userAPI.changeEmail(data, GetApiKey() || "");
        if (response.data.status === 200) {
          message.success(MESSAGE.USERS.CHANGE_EMAIL_SUCCESS);
          formData.resetForm();
          return;
        }
        message.error(response?.data?.error?.message);
      } catch (err: any) {
        message.error(err?.response?.data?.result?.error?.message);
      }
    },
  });

  const handleChangeData = (data: any) => {
    const newData = {
      ...formData.values,
      ...data,
    };
    formData.setValues(newData);
  };

  const inputs: InputFiledParams[] = [
    {
      key: 1,
      label: "Username",
      value: formData.values.username,
      css: css,
      error: formData.errors.username,
      touched: formData.touched.username,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      size: "large",
      type: INPUT,
      onChange: (e: any) => handleChangeData({ username: e.target.value }),
    },
    {
      key: 2,
      label: "Email",
      size: "large",
      value: formData.values.email,
      css: css,
      error: formData.errors.email,
      touched: formData.touched.email,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      type: INPUT,
      onChange: (e: any) => handleChangeData({ email: e.target.value }),
    },
  ];

  return (
    <div className="email-change-container">
      <Form layout="vertical" style={{ width: "100%" }}>
        <Row gutter={[12, 12]}>
          <InputFields data={inputs} />
          <Col span={24} style={{ marginTop: "10px" }}>
            <Button
              style={{ width: "100%", backgroundColor: "rgb(178, 223, 219)" }}
              type="primary"
              htmlType="submit"
              onClick={formData.submitForm}
            >
              Change Email
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EmailChange;

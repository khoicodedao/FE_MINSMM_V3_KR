import React from "react";
import "pages/AccountSetting/components/PasswordChange/style.scss";
import { TYPE_FIELD } from "constants/enums";
import * as Yup from "yup";
import { ErrorMessage, useFormik } from "formik";
import { InputFiledParams } from "constants/types/Form_Field_type";
import { Form, Row, Button, Col, message } from "antd";
import InputFields from "components/InputFields";
import { userAPI } from "api/user";
import { GetApiKey } from "utils/user";
import { MESSAGE } from "constants/message";

const { INPUT_PASSWORD } = TYPE_FIELD;

const css = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
const labelCol = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
const wrapperCol = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };

type PasswordChangeType = {
  currrentPassword: string;
  newPassword: string;
  confirmedPassword: string;
};

const initialDataForm: PasswordChangeType = {
  currrentPassword: "",
  newPassword: "",
  confirmedPassword: "",
};

const formSchema = Yup.object().shape({
  currrentPassword: Yup.string().required("Please enter password"),
  newPassword: Yup.string()
    .required("Please enter new password")
    .min(8, "Password must be at least 8 characters"),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm password"),
});

const PasswordChange = () => {
  const formData = useFormik({
    initialValues: initialDataForm,
    validationSchema: formSchema,
    onSubmit: async (data: any) => {
      try {
        const response = await userAPI.changePass(data, GetApiKey() || "");
        if (response.data.status === 200) {
          message.success(MESSAGE.USERS.CHANGE_PASS_SUCCESS);
          formData.resetForm();
          return;
        }
        message.error(MESSAGE.USERS.CHANGE_PASS_FAILED);
      } catch (err) {}
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
      label: "Current password",
      value: formData.values.currrentPassword,
      css: css,
      error: formData.errors.currrentPassword,
      touched: formData.touched.currrentPassword,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      size: "large",
      type: INPUT_PASSWORD,
      onChange: (e: any) =>
        handleChangeData({ currrentPassword: e.target.value }),
    },
    {
      key: 2,
      label: "New password",
      size: "large",
      value: formData.values.newPassword,
      css: css,
      error: formData.errors.newPassword,
      touched: formData.touched.newPassword,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      type: INPUT_PASSWORD,
      onChange: (e: any) => handleChangeData({ newPassword: e.target.value }),
    },
    {
      key: 3,
      label: "Confirm new password",
      size: "large",
      value: formData.values.confirmedPassword,
      css: css,
      error: formData.errors.confirmedPassword,
      touched: formData.touched.confirmedPassword,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      type: INPUT_PASSWORD,
      onChange: (e: any) =>
        handleChangeData({ confirmedPassword: e.target.value }),
    },
  ];

  return (
    <div className="pass-change-container">
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
              Change password
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PasswordChange;

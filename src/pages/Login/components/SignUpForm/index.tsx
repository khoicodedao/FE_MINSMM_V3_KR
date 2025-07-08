import { Button, Form, message, Row } from "antd";
import InputFields from "components/InputFields";
import "pages/Login/components/SignUpForm/style.scss";
import { LOCAL_STORAGE_KEY, TYPE_FIELD } from "constants/enums";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { MESSAGE } from "constants/message";
import { useDispatch } from "react-redux";
import { login } from "pages/App/store/appSlice";
import { authAPI } from "api/auth";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

type Props = {
  // changeTabIndex: any
};

const { INPUT, INPUT_PASSWORD } = TYPE_FIELD;

type SignUpFormType = {
  username: string | null;
  email: string | null;
  password: string | null;
  password_revert: string | null;
  ref_code: string | null;
};

const initialDataForm: SignUpFormType = {
  username: "",
  email: "",
  password: "",
  password_revert: "",
  ref_code: null,
};

const schemaForm = Yup.object().shape({
  username: Yup.string().required("Please enter username"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter email"),
  password: Yup.string()
    .required("Please enter password")
    .min(8, "Password must be at least 8 characters"),
  password_revert: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm password"),
});

const css = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
const labelCol = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
const wrapperCol = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };

const SignUpForm: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const query = useQuery();

  const ref_code = query.get("refCode");

  useEffect(() => {
    if (ref_code) {
      formData.setValues({
        ...formData.values,
        ref_code: ref_code,
      });
      // If have ref_code, then switch to signup tab
    }
  }, [ref_code]);

  const formData = useFormik({
    initialValues: initialDataForm,
    validationSchema: schemaForm,
    onSubmit: async (data: SignUpFormType) => {
      try {
        const response = await authAPI.register(data);
        if (response?.data?.status === 200) {
          dispatch(login(response.data.result));
          localStorage.setItem(
            LOCAL_STORAGE_KEY.ACCESS_TOKEN,
            response.data.result.token,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.USER_ID,
            response.data.result.id,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.USERNAME,
            response.data.result.username,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.API_KEY,
            response.data.result.api_key,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.ROLE_USER,
            response.data.result.role,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.EMAIL_USER,
            response.data.result.email,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.REF_CODE,
            response.data.result.ref_code,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.BALANCE_USER,
            response.data.result.balance,
          );
          message.success(MESSAGE.USERS.SIGN_UP_SUCCESS);
          formData.resetForm();
          return;
        }
        message.error(MESSAGE.USERS.SIGN_UP_FAILED);
      } catch (error: any) {
        message.error(
          error?.response?.data?.error?.message || MESSAGE.USERS.SIGN_UP_FAILED,
        );
      }
    },
  });

  const handleChangeValue = (field: string, value: any) => {
    const newValue = { ...formData.values, [field]: value };
    formData.setValues(newValue);
  };

  const inputs: any[] = [
    {
      key: 1,
      label: "Username",
      type: INPUT,
      value: formData.values.username,
      error: formData.errors.username,
      touched: formData.touched.username,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      css: css,
      size: "large",
      handleEnter: formData.submitForm,
      onChange: (e: any) => handleChangeValue("username", e.target.value),
    },
    {
      key: 2,
      label: "Email",
      type: INPUT,
      value: formData.values.email,
      error: formData.errors.email,
      touched: formData.touched.email,
      labelCol: labelCol,
      handleEnter: formData.submitForm,
      wrapperCol: wrapperCol,
      css: css,
      size: "large",
      onChange: (e: any) => handleChangeValue("email", e.target.value),
    },
    {
      key: 3,
      label: "Password",
      type: INPUT_PASSWORD,
      value: formData.values.password,
      error: formData.errors.password,
      touched: formData.touched.password,
      labelCol: labelCol,
      handleEnter: formData.submitForm,
      wrapperCol: wrapperCol,
      css: css,
      size: "large",
      onChange: (e: any) => handleChangeValue("password", e.target.value),
    },
    {
      key: 4,
      label: "Confirm password",
      type: INPUT_PASSWORD,
      value: formData.values.password_revert,
      error: formData.errors.password_revert,
      handleEnter: formData.submitForm,
      touched: formData.touched.password_revert,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      css: css,
      size: "large",
      onChange: (e: any) =>
        handleChangeValue("password_revert", e.target.value),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[95%] rounded-2xl bg-white p-6 sm:max-w-[80%] xl:max-w-[720px]">
      <Row>
        <Form layout="vertical" style={{ width: "100%" }}>
          <Row gutter={[16, 16]}>
            <InputFields data={inputs} />
          </Row>
        </Form>
      </Row>
      <Row style={{ marginTop: "32px" }}>
        <Button
          className="submit-button"
          type="primary"
          size="large"
          style={{ width: "100%" }}
          htmlType="submit"
          onClick={formData.submitForm}
        >
          Sign up
        </Button>
      </Row>
    </div>
  );
};

export default SignUpForm;

import { LOCAL_STORAGE_KEY } from "./../../constants/enums/index";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { NEW_ORDER } from "../routes/route.constant";
import { authAPI } from "../../api/auth";
import { MESSAGE } from "../../constants/message";
import { MailOutlined } from "@ant-design/icons";
import { login } from "../../pages/App/store/appSlice";
import { Button, Input, message, Typography } from "antd";
import { RegisterDialog } from "./layout/navbar";
function ForgetPassword() {
  type SigninType = {
    email: string | null;
  };

  const initialData: SigninType = {
    email: "",
  };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter email")
      .email("Invalid email format"),
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formData = useFormik({
    initialValues: initialData,
    validationSchema: formSchema,
    onSubmit: async (data: any) => {
      try {
        const response = await authAPI.login(data);
        if (response.data.status === 200) {
          dispatch(login(response.data.result.user));
          localStorage.setItem(
            LOCAL_STORAGE_KEY.USER_ID,
            response.data.result.user.id,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.USERNAME,
            response.data.result.user.username,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.API_KEY,
            response.data.result.user.key,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.ROLE_USER,
            response.data.result.user.role,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.EMAIL_USER,
            response.data.result.user.email,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.REF_CODE,
            response.data.result.user.ref_code,
          );
          localStorage.setItem(
            LOCAL_STORAGE_KEY.BALANCE_USER,
            response.data.result.user.balance,
          );
          dispatch(login(response.data.result.user));
          console.log("Login successful", response.data.result.user);
          message.success(MESSAGE.USERS.SIGN_IN_SUCCESS);
          navigate(NEW_ORDER);
          return;
        }
        message.error(MESSAGE.USERS.SIGN_IN_FAILED);
      } catch (err) {
        message.error(MESSAGE.USERS.SIGN_IN_FAILED);
        console.error("Login error", err);
      }
    },
  });
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label className="text-[13px] font-medium not-italic leading-[22px] text-[#666270]">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          name="email"
          placeholder="Enter your email"
          prefix={<MailOutlined />}
          value={formData.values.email ?? ""}
          onChange={formData.handleChange}
          onBlur={formData.handleBlur}
          status={
            formData.touched.email && formData.errors.email ? "error" : ""
          }
        />
        {formData.touched.email && formData.errors.email && (
          <div className="mt-1 text-sm text-red-500">
            {typeof formData.errors.email === "string" && formData.errors.email}
          </div>
        )}

        <Button
          htmlType="submit"
          block
          className="space-y-2 bg-pink-600 text-white hover:bg-pink-700"
        >
          Gửi
        </Button>
        <div className="flex items-center justify-center gap-2 text-sm text-[#212121]">
          <span>Bạn đã có tài khoản?</span>
          <RegisterDialog classButton="p-0 bg-transparent hover:bg-transparent cursor-pointer text-pink-400 hover:underline border-none hover:bg-transparent" />
        </div>
      </div>
    </form>
  );
}

export default ForgetPassword;

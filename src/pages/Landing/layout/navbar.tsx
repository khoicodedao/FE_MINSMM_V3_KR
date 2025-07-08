import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "assets/LogoSystem/min_logo.png";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Typography,
  Drawer,
  Button as AntButton,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import * as Yup from "yup";
import { useFormik } from "formik";
import { authAPI } from "api/auth";
import { useDispatch } from "react-redux";
import { login } from "pages/App/store/appSlice";
import { LOCAL_STORAGE_KEY, TYPE_FIELD } from "constants/enums";
import { MESSAGE } from "constants/message";
interface NavbarLandingProps {
  seoData?: any;
}

const NavbarLanding: React.FC<NavbarLandingProps> = ({ seoData }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const isActive = (path: string) => {
    return (
      currentPath === path || (path !== "/" && currentPath.startsWith(path))
    );
  };

  const getLinkClassName = (path: string) => {
    return isActive(path)
      ? "justify-start text-base leading-normal font-bold text-pink-600 capitalize"
      : "justify-start text-base leading-normal text-gray-400 font-bold capitalize";
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <nav className="relative z-10 flex items-center justify-between gap-4 px-10 py-4">
      <div className="flex items-center gap-2">
        <div className="text-white">
          <img src={seoData?.site_logo} width={35} height={35} alt="" />
        </div>
        <h1 className="text-xl font-bold text-white">
          {" "}
          {window.location.hostname}
        </h1>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <div className="flex items-center gap-6">
          <Link to="/" className={getLinkClassName("/")}>
            Home
          </Link>
          <Link to="/services" className={getLinkClassName("/services")}>
            Service
          </Link>
          <Link to="/api" className={getLinkClassName("/api")}>
            API
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <RegisterDialog
            classButton={
              "cursor-pointer rounded-full bg-[#EA256D] px-6 py-2 font-medium text-white transition-colors hover:bg-pink-600 border-none"
            }
          />
        </div>
      </div>

      {/* Button to show drawer */}
      <button className="text-white md:hidden" onClick={showDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {/* Drawer component */}
      <Drawer
        title="Menu"
        placement="bottom"
        closable={true}
        onClose={closeDrawer}
        open={isDrawerVisible}
        height="50%"
      >
        <div className="flex flex-col items-start gap-4 p-4">
          <Link to="/" className={getLinkClassName("/")}>
            Home
          </Link>
          <Link to="/services" className={getLinkClassName("/services")}>
            Service
          </Link>
          <Link to="/api" className={getLinkClassName("/api")}>
            API
          </Link>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <AntButton
            className="w-[40%] rounded-full border-pink-600 text-pink-600"
            onClick={closeDrawer}
          >
            <a href="#login">Login</a>
          </AntButton>
          <RegisterDialog
            classButton={
              "cursor-pointer w-[40%] text-center rounded-full bg-[#EA256D] px-6 py-2 font-medium text-white transition-colors hover:bg-pink-600 border-none"
            }
          />
        </div>
      </Drawer>
    </nav>
  );
};

export default NavbarLanding;

type RegisterDialogProps = {
  classButton?: string;
  label?: string;
  icon?: React.ReactNode;
};
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
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

export const RegisterDialog = ({
  classButton,
  label,
  icon,
}: RegisterDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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

  return (
    <>
      <a className={classButton} onClick={() => setOpen(true)}>
        {label || "Register"}
        {icon && icon}
      </a>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        title={<span className="text-xl font-bold">Register</span>}
      >
        <form onSubmit={formData.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[13px] font-medium not-italic leading-[22px] text-[#666270]">
              Username <span className="text-red-500">*</span>
            </label>
            <Input
              name="username"
              placeholder="Enter your username"
              prefix={<UserOutlined />}
              value={formData.values.username ?? ""}
              onChange={formData.handleChange}
              onBlur={formData.handleBlur}
              status={
                formData.touched.username && formData.errors.username
                  ? "error"
                  : ""
              }
            />
            {formData.touched.username && formData.errors.username && (
              <div className="mt-1 text-sm text-red-500">
                {formData.errors.username}
              </div>
            )}
          </div>
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
                {formData.errors.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium not-italic leading-[22px] text-[#666270]">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              prefix={<LockOutlined />}
              value={formData.values.password ?? ""}
              onChange={formData.handleChange}
              onBlur={formData.handleBlur}
              status={
                formData.touched.password && formData.errors.password
                  ? "error"
                  : ""
              }
              suffix={
                showPassword ? (
                  <EyeInvisibleOutlined
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOutlined onClick={() => setShowPassword(true)} />
                )
              }
            />
            {formData.touched.password && formData.errors.password && (
              <div className="mt-1 text-sm text-red-500">
                {formData.errors.password}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-medium not-italic leading-[22px] text-[#666270]">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <Input
              name="password_revert"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your password again"
              prefix={<LockOutlined />}
              value={formData.values.password_revert ?? ""}
              onChange={formData.handleChange}
              onBlur={formData.handleBlur}
              status={
                formData.touched.password_revert &&
                formData.errors.password_revert
                  ? "error"
                  : ""
              }
              suffix={
                showConfirmPassword ? (
                  <EyeInvisibleOutlined
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <EyeOutlined onClick={() => setShowConfirmPassword(true)} />
                )
              }
            />
            {formData.touched.password_revert &&
              formData.errors.password_revert && (
                <div className="mt-1 text-sm text-red-500">
                  {formData.errors.password_revert}
                </div>
              )}
          </div>

          <Button
            htmlType="submit"
            block
            className="bg-pink-600 text-white hover:bg-pink-700"
          >
            Sign Up
          </Button>

          <Typography.Text className="block text-center">
            Already have an account?{" "}
            <a
              onClick={() => setOpen(false)}
              className="cursor-pointer text-pink-600 hover:underline"
            >
              Sign In
            </a>
          </Typography.Text>
        </form>
      </Modal>
    </>
  );
};

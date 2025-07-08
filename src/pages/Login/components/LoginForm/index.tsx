import { Button, Form, message, Row } from "antd";
import InputFields from "components/InputFields";
import "pages/Login/components/LoginForm/style.scss";
import { LOCAL_STORAGE_KEY, TYPE_FIELD } from "constants/enums";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { authAPI } from "api/auth";
import { useDispatch } from "react-redux";
import { login } from "pages/App/store/appSlice";
import { MESSAGE } from "constants/message";

// components
import BoxContainer from "../../../../components/Container/BoxContainer";
import FeatureSection from "./FeatureSection";
import SugStepSection from "./SugStepSection";
import ReviewSection from "./ReviewSection";

// assets
import BgIntro from "assets/Landing/BgIntro.png";
import BgReview from "assets/Landing/BgReview.png";
import BgAsk from "assets/Landing/BgAsk.png";
import AskSection from "./AskSection";
import FooterSection from "./FooterSection";

const { INPUT, INPUT_PASSWORD } = TYPE_FIELD;

const css = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
const labelCol = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };
const wrapperCol = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 };

type SigninType = {
  username: string | null;
  password: string | null;
};

const initialData: SigninType = {
  username: "",
  password: "",
};

const formSchema = Yup.object().shape({
  username: Yup.string().required("Please enter username"),
  password: Yup.string().required("Please enter password"),
});

const LoginForm = () => {
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
          return;
        }
        message.error(MESSAGE.USERS.SIGN_IN_FAILED);
      } catch (err) {
        message.error(MESSAGE.USERS.SIGN_IN_FAILED);
      }
    },
  });

  const handleChangeData = (field: string, value: any) => {
    const newData = {
      ...formData.values,
      [field]: value,
    };
    formData.setValues(newData);
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
      handleEnter: formData.submitForm,
      css: css,
      size: "large",
      onChange: (e: any) => handleChangeData("username", e.target.value),
    },
    {
      key: 3,
      label: "Password",
      type: INPUT_PASSWORD,
      value: formData.values.password,
      error: formData.errors.password,
      touched: formData.touched.password,
      handleEnter: formData.submitForm,
      labelCol: labelCol,
      wrapperCol: wrapperCol,
      css: css,
      size: "large",
      onChange: (e: any) => handleChangeData("password", e.target.value),
    },
  ];

  return (
    <>
      {/* --------------- IntroSection --------------- */}
      <div style={{ background: "linear-gradient(0deg, rgba(31, 11, 108, 1) 0%, rgba(18, 11, 46, 0) 100%)", }} className="relative flex flex-col items-center overflow-hidden pb-16 lg:pb-[280px]">
        <div>
          <div className="absolute hidden lg:block left-0 h-full w-full overflow-hidden">
            {/* <img
              height={600}
              src={BgIntro}
              alt=""
              className="absolute left-0 z-1 overflow-hidden"
              style={{ backgroundPositionX: "20%", backgroundPositionY: "44%" }}
            /> */}
            <div style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1,
              backgroundImage: `url(${BgIntro})`,
              backgroundPosition: "49% 44%",
              backgroundAttachment: "inherit",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}></div>
          </div>
        </div>
        <div className="z-4 pt-16 mb-10 flex flex-col gap-4 text-white">
          <h3 className="text-center text-3xl font-bold sm:text-[42px]">
            Supreme SMM service reseller panel
          </h3>
          <h4 className="text-center text-[14px] mx-8">
            Quickly and easily buy followers, likes, views, website traffic and
            more.
          </h4>
        </div>
        <div className="bg-white p-6 rounded-2xl mx-6 z-2">
          <Row>
            <Form layout="vertical" style={{ width: "100%" }}>
              <Row gutter={[16, 16]}>
                <InputFields data={inputs} />
              </Row>
            </Form>
          </Row>
          <Row style={{ marginTop: "32px" }}>
            <Button
              className="submit-button bg-[#1f0b6c]"
              type="primary"
              size="large"
              style={{ width: "100%" }}
              htmlType="submit"
              onClick={formData.submitForm}
            >
              Login
            </Button>
          </Row>
        </div>
        <div className="absolute bottom-[-1px] hidden h-[100px] w-full lg:block">
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 1280 140"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#F4F3F8]"
          >
            <g fill="currentColor">
              <path d="M1280 140V0S993.46 140 640 140 0 0 0 0v140z"></path>
            </g>
          </svg>
        </div>
      </div>

      {/* --------------- FeatureSection --------------- */}
      <div className="relative bg-[#F4F3F8]">
        <BoxContainer>
          <FeatureSection />
        </BoxContainer>
        <div className="absolute bottom-0 hidden h-[100px] w-full border-current lg:block">
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 1280 140"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#FFFFFF]"
          >
            <g fill="currentColor">
              <path d="M1280 140V0S993.46 140 640 140 0 0 0 0v140z"></path>
            </g>
          </svg>
        </div>
      </div>

      {/* --------------- SugStepSection --------------- */}
      <div className="bg-white">
        <BoxContainer>
          <SugStepSection />
        </BoxContainer>
      </div>

      {/* --------------- ReviewSection --------------- */}
      <div className="relative flex h-full flex-col items-center overflow-hidden bg-[#E9E7F1] pb-16">
        <div className="absolute z-2 hidden h-full w-full lg:block">
          <img src={BgReview} alt="BgReview" className="h-full w-full" />
        </div>
        <BoxContainer>
          <ReviewSection />
        </BoxContainer>
      </div>

      {/* --------------- AskSection --------------- */}
      <div className="relative flex flex-col items-center overflow-hidden bg-[#1C0B61] pb-32">
        <div className="absolute top-0 z-2 h-fit w-full">
          <img src={BgAsk} alt="BgAsk" className=" h-[84px] sm:h-[120px] lg:h-[200px] xl:h-[250px] w-full" />
        </div>
        <BoxContainer>
          <AskSection />
        </BoxContainer>
      </div>

      {/* --------------- FooterSection --------------- */}
      <FooterSection />
    </>
  );
};

export default LoginForm;

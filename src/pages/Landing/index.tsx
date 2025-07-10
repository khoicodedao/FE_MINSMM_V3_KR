import "./home/index.scss";
import HeroSection from "./home/components/hero-section";
import StatsSection from "./home/components/stats-section";
import FeaturesSection from "./home/components/features-section";
import HowItWorksSection from "./home/components/how-it-works-section";
import ServicesSection from "./home/components/services-section";
import VideoSection from "./home/components/video-section";
import PaymentMethodsSection from "./home/components/payment-methods-section";
import CTASection from "./home/components/cta-section";
import Footer from "./home/components/footer";
import FeatureSection2 from "./home/components/feature-section-2";
import FAQ from "./home/components/faq-section";
import Testimonial from "./home/components/testimonials-section";
import React from "react";
import ForgetPassword from "./ForgetPassword";
import * as Yup from "yup";
import { LOCAL_STORAGE_KEY } from "constants/enums";
import { login } from "pages/App/store/appSlice";
import { message, Modal } from "antd";
import { MESSAGE } from "constants/message";
import { NEW_ORDER } from "pages/routes/route.constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { authAPI } from "api/auth";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { RegisterDialog } from "./layout/navbar";
// @ts-ignore
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const [isForgetPasswordVisible, setForgetPasswordVisible] =
    React.useState(false);
  const handleOpenForgetPassword = () => setForgetPasswordVisible(true);
  const handleCloseForgetPassword = () => setForgetPasswordVisible(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const initialData = { username: "", password: "" };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = Yup.object().shape({
    username: Yup.string().required(t("validation.usernameRequired")),
    password: Yup.string().required(t("validation.passwordRequired")),
  });

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
    <div className="min-h-screen bg-white">
      <HeroSection>
        <section
          id="login"
          className="container relative z-10 mx-auto px-4 pb-16"
        >
          <div className="mx-auto max-w-5xl rounded-xl border border-white/20 bg-white/10 p-8 shadow-lg backdrop-blur">
            <h3 className="mb-6 text-center text-lg font-semibold text-white">
              {t("home_landing.welcome")}
            </h3>

            <form className="space-y-6" onSubmit={formData.handleSubmit}>
              <div className="grid items-start gap-4 md:grid-cols-12">
                {/* Username */}
                <div className="relative md:col-span-6">
                  <input
                    name="username"
                    type="text"
                    placeholder={t("home_landing.usernamePlaceholder")}
                    value={formData.values.username}
                    onChange={formData.handleChange}
                    onBlur={formData.handleBlur}
                    className={
                      `w-full rounded-md border bg-white/20 px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 ` +
                      (formData.touched.username && formData.errors.username
                        ? "border-red-400 focus:ring-red-400"
                        : "border-white/30 focus:ring-white/50")
                    }
                  />
                  {formData.touched.username && formData.errors.username && (
                    <div className="absolute -bottom-5 left-0 text-sm text-red-400">
                      {formData.errors.username}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="relative md:col-span-6">
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("home_landing.passwordPlaceholder")}
                      value={formData.values.password}
                      onChange={formData.handleChange}
                      onBlur={formData.handleBlur}
                      className={
                        `w-full rounded-md border bg-white/20 px-4 py-2 pr-10 text-white placeholder-white/70 focus:outline-none focus:ring-2 ` +
                        (formData.touched.password && formData.errors.password
                          ? "border-red-400 focus:ring-red-400"
                          : "border-white/30 focus:ring-white/50")
                      }
                    />
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white/60 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeInvisibleOutlined size={18} />
                      ) : (
                        <EyeOutlined size={18} />
                      )}
                    </div>
                  </div>
                  {formData.touched.password && formData.errors.password && (
                    <div className="absolute -bottom-5 left-0 text-sm text-red-400">
                      {formData.errors.password}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="mt-[2px] flex items-center md:col-span-12">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-yellow-400 px-6 py-2 font-semibold text-blue-900 transition-colors hover:bg-yellow-300"
                  >
                    {t("home_landing.signIn")}
                  </button>
                </div>
              </div>

              {/* Remember & Actions */}
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-white/30 text-yellow-400 focus:ring-white/50"
                  />
                  <label htmlFor="remember" className="text-sm text-white">
                    {t("home_landing.rememberMe")}
                  </label>
                </div>

                <button
                  type="button"
                  className="text-sm text-yellow-300 hover:underline"
                  onClick={handleOpenForgetPassword}
                >
                  {t("home_landing.forgotPassword")}
                </button>

                {isForgetPasswordVisible && (
                  <Modal
                    footer={null}
                    centered
                    title={
                      <span className="text-xl font-bold">
                        {t("home_landing.forgotPasswordTitle")}
                      </span>
                    }
                    open={isForgetPasswordVisible}
                    onCancel={handleCloseForgetPassword}
                  >
                    <ForgetPassword />
                  </Modal>
                )}

                <div className="flex items-center gap-2 text-sm text-white">
                  <span>{t("home_landing.noAccount")}</span>
                  <RegisterDialog classButton="p-0 text-yellow-300 hover:underline bg-transparent border-none cursor-pointer" />
                </div>
              </div>
            </form>
          </div>
        </section>
      </HeroSection>

      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ServicesSection />
      <VideoSection />
      <FeatureSection2 />
      <PaymentMethodsSection />
      <CTASection />
      <FAQ />
      <Testimonial />
      <Footer />
    </div>
  );
}

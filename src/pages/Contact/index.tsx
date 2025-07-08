import React from "react";
import { Form, Input, Button, Card, Space } from "antd";
//@ts-ignore
import { useTranslation } from "react-i18next";
import "./style.scss";
import {
  GlobalOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import CustomForm from "components/Antd/CustomForm";
import CustomFormItem from "components/Antd/CustomFormItem";
const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSubmit = (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    // Handle form submission logic here
    console.log("Form submitted:", values);
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">{t("contact")}</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column - Contact Info and Social Media */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2 text-base font-bold text-black">
            <span>{t("contact")}</span>
          </div>
          {/* Contact Us Section */}
          <div>
            <div className="mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center">
                    <GlobalOutlined className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-[#212121]">minsmm.com</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center">
                    <MailOutlined className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="text-[#212121]">admin@minsmm.com</span>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div>
              <h2 className="mb-6 text-xl font-bold">Social media</h2>

              <div className="quick-connect-buttons mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="btn btn-primary btn-tone btn-nw btn-nw2"
                    id="link_tele"
                    onClick={() => window.open("https://t.me/MinSmm_Admin")}
                  >
                    <i
                      className="fab fa-telegram"
                      style={{ fontSize: 50, color: "#0088cc" }}
                    />
                  </button>
                  <p style={{ color: "#0088cc" }}>{t("telegram")}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="btn btn-success btn-tone btn-nw btn-nw2"
                    id="link_whatsapp"
                    onClick={() => window.open("https://wa.me/84941027300")}
                  >
                    <i
                      className="fab fa-whatsapp"
                      style={{
                        fontSize: 50,
                        background:
                          "linear-gradient(45deg, #0099FF, #A033FF, #FF5280)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    />
                  </button>
                  <p
                    style={{
                      background:
                        "linear-gradient(45deg, #0099FF, #A033FF, #FF5280)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {t("WhatsApp")}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="btn btn-primary btn-tone btn-nw btn-nw2"
                    id="zalo_phone"
                    onClick={() => window.open("https://zalo.me/0941027300")}
                  >
                    <i
                      className="fas fa-envelope"
                      style={{ fontSize: 50, color: "#0068ff" }}
                    />
                  </button>
                  <p style={{ color: "#0068ff" }}>{t("zalo")}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="btn btn-secondary btn-tone btn-nw btn-nw2"
                    id="link_group_fb"
                    onClick={() =>
                      window.open(
                        "https://www.facebook.com/profile.php?id=61566527644981",
                      )
                    }
                  >
                    <i
                      className="fab fa-facebook-square"
                      style={{ fontSize: 50, color: "#3b5998" }}
                    />
                  </button>
                  <p style={{ color: "#3b5998" }}>{t("facebook")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2 text-base font-bold text-black">
            <span>{t("contact_us")}</span>
          </div>
          <div className="mb-4 flex items-center gap-2 text-base">
            <span>{t("contact_us_message")}</span>
          </div>
          <div>
            <CustomForm
              form={form} // Thêm dòng này
              onFinish={onFinish}
              layout="vertical"
              style={{ width: "100%" }}
            >
              <CustomFormItem
                label={t("name")}
                name="name"
                rules={[{ required: true, message: t("pleaseInputYourName") }]}
                className="text-[#212121]"
              >
                <Input className="px-2 py-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0" />
              </CustomFormItem>
              <CustomFormItem
                label={t("email")}
                name="email"
                rules={[
                  { required: true, message: t("pleaseInputYourEmail") },
                  { type: "email", message: t("invalidEmail") },
                ]}
              >
                <Input className="px-2 py-2 text-sm focus-visible:ring-0 focus-visible:ring-offset-0" />
              </CustomFormItem>
              <CustomFormItem
                label={t("message")}
                name="message"
                rules={[
                  { required: true, message: t("pleaseInputYourMessage") },
                ]}
              >
                <TextArea rows={4} />
              </CustomFormItem>
              <CustomFormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="h-[40px] w-full bg-[#EA1261] px-6 text-white transition-colors hover:bg-[#d0105a]"
                >
                  {t("send")}
                </Button>
              </CustomFormItem>
            </CustomForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

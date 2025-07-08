import { Input, Row, Select, Col, Divider, message, Spin, Space } from "antd";
import Icons from "assets/icons";
import { useEffect, useState } from "react";
import React from "react";
import TableService from "../Services/components/TableService";
import { CategoryType, CommonGetAllParams } from "constants/types";
import { authAPI } from "api/auth";
import "pages/Login/components/ServicesForm/style.scss";
import NavbarLanding from "./layout/navbar";
import "./style.scss";
import FooterLanding from "./layout/footer";
import APIComponent from "../../pages/Api/index";
// @ts-ignore
import { useTranslation } from "react-i18next";

// const ServiceContainer = () => {
//   return (
//     <div className="service-contaiMIN ner">
//       <Services />
//     </div>
//   );
// };

const css = { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 };

const ServiceLanding = () => {
  return (
    <div className="mx-auto w-full max-w-[95%] rounded-xl bg-white shadow-lg sm:max-w-[80%] xl:max-w-[1200px]">
      <APIComponent></APIComponent>
    </div>
  );
};

export default ServiceLanding;

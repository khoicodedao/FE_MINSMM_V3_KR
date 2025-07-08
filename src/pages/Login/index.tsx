import React, { useEffect, useState } from "react";
import "pages/Login/style.scss";
import { Radio, Row, Typography } from "antd";
import LoginForm from "pages/Login/components/LoginForm";
import SignUpForm from "pages/Login/components/SignUpForm";
import { RootState } from "configs/configureStore";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import ApiForm from "pages/Login/components/ApiForm";
import ServiceContainer from "./components/ServicesForm";
import { useLocation } from "react-router-dom";
import { GetUserName } from "utils/user";
import { NEW_ORDER } from "pages/routes/route.constant";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = () => {
  const appState = useSelector((state: RootState) => state.appSlice);

  const hostName = window.location.hostname;

  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState<number>(1);

  const handleChangeTabIndex = (value: number) => {
    setTabIndex(value);
  };

  const query = useQuery();

  const refCode = query.get("refCode");

  useEffect(() => {
    const username = GetUserName();
    if (username) {
      navigate(NEW_ORDER);
    }
  }, []);

  useEffect(() => {
    if (refCode) {
      handleChangeTabIndex(4);
    }
  }, [refCode]);

  const tabView = () => {
    switch (tabIndex) {
      case 1:
        return (
          <div className="">
            <LoginForm />
          </div>
        );
      case 2:
        return (
          <div className="min-h-[calc(100vh-161px)] bg-custom-gradient">
            <ServiceContainer />
          </div>
        );
      case 3:
        return (
          <div className="min-h-[calc(100vh-161px)] bg-custom-gradient">
            <ApiForm />
          </div>
        );
      default:
        return (
          <div className="min-h-[calc(100vh-161px)] bg-custom-gradient">
            <SignUpForm />
          </div>
        );
    }
  };

  const changeTabIndex = (value: number) => {
    setTabIndex(value);
  };

  if (appState.isLogged) return <Navigate to={"/"} />;
  return (
    <div className="login-page-container">
      <div className="header-login-container">
        <Row justify={"center"} className="title-container relative z-10">
          <Typography className="title-text">{hostName}</Typography>
        </Row>
        <Row justify={"center"} className="radio-container z-10 mt-10">
          <Radio.Group defaultValue={1} value={tabIndex} buttonStyle="solid">
            <Radio.Button value={1} onChange={() => changeTabIndex(1)}>
              Sign in
            </Radio.Button>
            <Radio.Button value={2} onChange={() => changeTabIndex(2)}>
              Services
            </Radio.Button>
            <Radio.Button value={3} onChange={() => changeTabIndex(3)}>
              Api
            </Radio.Button>
            <Radio.Button value={4} onChange={() => changeTabIndex(4)}>
              Sign up
            </Radio.Button>
          </Radio.Group>
        </Row>
      </div>
      <div className="overflow-hidden">
        {tabView()}
        {/* <LoginForm /> */}
      </div>
    </div>
  );
};

export default Login;

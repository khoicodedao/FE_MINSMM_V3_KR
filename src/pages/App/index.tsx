import { useEffect, useState } from "react";
import ErrorBoundary from "pages/App/subcomponents/ErrorBoundary";
import publicRoutes from "pages/routes/route.public";
import { FC, Suspense } from "react";
import Loading from "components/Loading";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NOT_FOUND, NEW_ORDER, LOGIN } from "pages/routes/route.constant";
import PageNotFound from "pages/PageNotFound";
import authRoutes from "pages/routes/route.auth";
import Layout from "pages/App/subcomponents/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { authAPI } from "api/auth";
import { login, logout } from "./store/appSlice";
import { message } from "antd";
import { GetApiKey, GetUserName } from "utils/user";
import { RootState } from "configs/configureStore";
import { userAPI } from "api/user";
import { LOCAL_STORAGE_KEY } from "constants/enums";
import { Helmet } from "react-helmet-async";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LandingLayout from "pages/Landing/layout";
import { isTokenExpired } from "utils/jwt";
import { useLocation } from "react-router-dom";

interface SeoData {
  share_title: string;
  site_description: string;
  share_description: string;
  site_logo: string;
  favicon: string;
}

const App = () => {
  const location = useLocation();
  //check token expiration and redirect to login if expired
  useEffect(() => {
    const token = localStorage.getItem("API_KEY");
    const currentPath = location.pathname;
    if ((!token || isTokenExpired(token)) && currentPath !== LOGIN) {
      dispatch(logout());
      localStorage.clear();
      navigate(LOGIN);
      message.info(
        "Your session has expired. Please sign in again to continue",
      );
    }
  }, [location.pathname]);
  const homeRoute = process.env.REACT_APP_HOME_PAGE_ROUTE || NEW_ORDER;

  const appState = useSelector((state: RootState) => state.appSlice);

  const [seoData, setSeoData] = useState<SeoData | null>(null);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await authAPI.getSEO();
        setSeoData(response.data.result);
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };
    fetchSeoData();
  }, []);

  useEffect(() => {
    const updateBalance = async () => {
      try {
        const response = await userAPI.getUserInfor(GetApiKey() || "");
        if (response.data.status === 200) {
          const newBalance = response.data.result.balance;
          localStorage.setItem(LOCAL_STORAGE_KEY.BALANCE_USER, newBalance);
          dispatch(login({ ...appState.account, balance: newBalance }));
        }
      } catch (err: any) {}
    };
    if (appState.isLogged) {
      updateBalance();
    }
  }, [appState.isLogged]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentURL = window.location.href;

  useEffect(() => {
    const username = GetUserName();
    if (!username && !currentURL.includes(LOGIN)) {
      navigate(LOGIN);
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await authAPI.checkSession();
        if (response?.data?.result?.loggedIn) {
          return;
        }
        dispatch(logout());
        localStorage.clear();
        navigate(LOGIN);
        message.info("Session timeout");
      } catch (err) {
        dispatch(logout());
        localStorage.clear();
        navigate(LOGIN);
        message.info("Session timeout");
      }
    };
    const intervalId: any = setInterval(checkSession, 60 * 1000 * 10);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <>
      {seoData && (
        <Helmet>
          <title>
            {seoData.share_title ||
              "MINSMM.com | Hệ thống dịch vụ mạng xã hội đa nền tảng Facebook, Tiktok, Instagram, Youtube, Twitter"}
          </title>
          <meta
            name="description"
            content={
              seoData.site_description ||
              'Hệ thống dịch vụ mạng xã hội đa nền tảng Facebook, Tiktok, Instagram, Youtube, Twitter","share_description":"MINSMM.com | Hệ thống dịch vụ mạng xã hội đa nền tảng Facebook, Tiktok, Instagram, Youtube, Twitter'
            }
          />
          <meta
            property="og:title"
            content={
              seoData.share_title ||
              "MINSMM.com | Hệ thống dịch vụ mạng xã hội đa nền tảng Facebook, Tiktok, Instagram, Youtube, Twitter"
            }
          />
          <meta
            property="og:description"
            content={
              seoData.site_description ||
              'Hệ thống dịch vụ mạng xã hội đa nền tảng Facebook, Tiktok, Instagram, Youtube, Twitter","share_description":"MINSMM.com | Hệ thống dịch vụ mạng xã hội đa nền tảng Facebook, Tiktok, Instagram, Youtube, Twitter'
            }
          />
          <meta
            property="og:image"
            content={
              seoData.site_logo ||
              "https://s3.ap-northeast-1.amazonaws.com/h.files/images/1730491392736_lh4QTyElI6.png"
            }
          />
          <meta property="og:url" content={window.location.href} />
          <link
            rel="icon"
            href={
              seoData.favicon ||
              "https://s3.ap-northeast-1.amazonaws.com/h.files/images/1730491430841_SFSJ2geudz.png"
            }
          />
        </Helmet>
      )}
      <ErrorBoundary>
        <Routes>
          <Route element={<LandingLayout seoData={seoData} />}>
            {publicRoutes.map(({ path, element }) => {
              const Element: FC = element;
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense fallback={<Loading />}>
                      {/* <UnauthenticatedTemplate>
                        <Element />
                      </UnauthenticatedTemplate> */}
                      <Element />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
          <Route element={<Layout seoData={seoData} />}>
            <Route path="/" element={<Navigate to={homeRoute} />} />
            {authRoutes.map(({ path, element }) => {
              const Element: FC = element;
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense fallback={<Loading />}>
                      <Element />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
          <Route
            key={NOT_FOUND}
            path={NOT_FOUND}
            element={
              <Suspense fallback={<Loading />}>
                {/* <UnauthenticatedTemplate>
                    <PageNotFound />
                  </UnauthenticatedTemplate> */}
                <PageNotFound />
              </Suspense>
            }
          />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;

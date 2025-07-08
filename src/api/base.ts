import axios from "axios";
// import { LOCAL_STORAGE_KEY } from "constants/enums";
import { LOGIN } from "pages/routes/route.constant";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const bashURL = process.env.REACT_APP_SERVER_URL;

const authRequest = axios.create({
  baseURL: bashURL,
  headers: {
    "content-type": "application/json",
  },
  timeout: 60000,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params),
});

const request = axios.create({
  baseURL: `${bashURL}/client/api/v1`,
  headers: {
    "content-type": "application/json",
    // Authorization: getAuthorizationHeader(),
  },
  timeout: 60000,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params),
});

const publicRequest = axios.create({
  baseURL: `${bashURL}`,
  headers: {
    "content-type": "application/json",
    // Authorization: getAuthorizationHeader(),
  },
  timeout: 60000,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params),
});

request.interceptors.request.use(
  (response) => response,
  (error) => {
    const navigate = useNavigate();
    if (error.response && error.response.status === 401) {
      // If 401 Unauthorized, redirect to login
      navigate(LOGIN);
    }
    return Promise.reject(error);
  }
);
export { request, authRequest, publicRequest };

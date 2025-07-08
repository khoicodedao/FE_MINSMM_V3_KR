import { lazy } from "react";
import { LOGIN } from "pages/routes/route.constant";
const Login = lazy(() => import("pages/Login"));

export default {
  path: LOGIN,
  element: Login,
};

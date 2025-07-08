import { lazy } from "react";
import { ACCOUNT_SETTING } from "pages/routes/route.constant";
const account_setting = lazy(() => import("pages/AccountSetting"));

export default {
  path: ACCOUNT_SETTING,
  element: account_setting,
};

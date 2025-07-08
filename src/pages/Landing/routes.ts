import { lazy } from "react";
import { DEFAULT, SERVICE_LANDING } from "pages/routes/route.constant";
const landingPage = lazy(() => import("pages/Landing"));

export default {
  path: DEFAULT,
  element: landingPage,
};

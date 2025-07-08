import { lazy } from "react";
import { API } from "pages/routes/route.constant";
const api = lazy(() => import("pages/Api"));

export default {
  path: API,
  element: api,
};

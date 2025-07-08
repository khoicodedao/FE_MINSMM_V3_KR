import { lazy } from "react";
import { AFFILIATES } from "pages/routes/route.constant";
const affiliates = lazy(() => import("pages/Affiliates"));

export default {
  path: AFFILIATES,
  element: affiliates,
};

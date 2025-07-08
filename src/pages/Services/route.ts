import { lazy } from "react";
import { SERVICES } from "pages/routes/route.constant";
const services = lazy(() => import("pages/Services"));

export default {
  path: SERVICES,
  element: services,
};

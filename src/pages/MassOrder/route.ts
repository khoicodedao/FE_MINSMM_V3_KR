import { lazy } from "react";
import { MASS_ORDER } from "pages/routes/route.constant";
const mass_order = lazy(() => import("pages/MassOrder"));

export default {
  path: MASS_ORDER,
  element: mass_order,
};

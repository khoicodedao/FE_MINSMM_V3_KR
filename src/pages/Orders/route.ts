import { lazy } from "react";
import { ORDERS } from "pages/routes/route.constant";
const orders = lazy(() => import("pages/Orders"));

export default {
  path: ORDERS,
  element: orders,
};

import { lazy } from "react";
import { NEW_ORDER } from "pages/routes/route.constant";
const newOrder = lazy(() => import("pages/NewOrder"));

export default {
  path: NEW_ORDER,
  element: newOrder,
};

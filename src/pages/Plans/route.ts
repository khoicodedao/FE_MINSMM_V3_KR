import { PLANS } from "./../routes/route.constant";
import { lazy } from "react";
const plan = lazy(() => import("pages/Plans"));

export default {
  path: PLANS,
  element: plan,
};

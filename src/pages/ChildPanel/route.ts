import { CHILD_PANEL } from "./../routes/route.constant";
import { lazy } from "react";
const childPanel = lazy(() => import("pages/ChildPanel"));

export default {
  path: CHILD_PANEL,
  element: childPanel,
};

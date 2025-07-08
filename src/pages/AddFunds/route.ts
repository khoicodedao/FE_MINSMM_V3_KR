import { lazy } from "react";
import { ADD_FUNDS } from "pages/routes/route.constant";
const addFunds = lazy(() => import("pages/AddFunds"));

export default {
  path: ADD_FUNDS,
  element: addFunds,
};

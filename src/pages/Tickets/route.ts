import { lazy } from "react";
import { TICKETS } from "pages/routes/route.constant";
const ticket = lazy(() => import("pages/Tickets"));

export default {
  path: TICKETS,
  element: ticket,
};

import { lazy } from "react";
import { CONTACT } from "pages/routes/route.constant";
const contact = lazy(() => import("pages/Contact/"));

export default {
  path: CONTACT,
  element: contact,
};

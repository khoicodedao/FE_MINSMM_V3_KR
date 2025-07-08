import loginRoute from "pages/Login/route";
import landingPage from "pages/Landing/routes";
import ServiceLanding from "pages/Landing/service";
import ApiLanding from "../../pages/Landing/api";
import { SERVICE_LANDING } from "./route.constant";

import { API_LANDING } from "./route.constant";

export default [
  landingPage,
  {
    element: ServiceLanding,
    path: SERVICE_LANDING,
  },
  {
    element: ApiLanding,
    path: API_LANDING,
  },
];

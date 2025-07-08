import { GetApiKey } from "utils/user";
import { request } from "./base"; 

export const affiliateAPI = {
  getAffiliateSystem: () => {
    return request(`/affiliates/get-affiliates`, {
      method: "POST",
      data: { key: GetApiKey() },
    });
  },
  getEarningAffiliates: () => {
    return request(`/affiliates/get-earning-affiliates`, {
      method: "POST",
      data: { key: GetApiKey() },
    });
  },
};

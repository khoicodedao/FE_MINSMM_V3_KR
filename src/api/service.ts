import { CommonGetAllParams } from "constants/types/common";
import { request, publicRequest } from "./base";
import { GetApiKey } from "utils/user";

export const serviceAPI = {
  getAllWithCategory: (params: CommonGetAllParams, key: string) => {
    return publicRequest(`/api/v2/category-service`, {
      method: "POST",
      data: { ...params, key: key || GetApiKey() },
    });
  },
  getAll: (key: string) => {
    return request("/services/get-all", {
      method: "POST",
      data: { key: key || GetApiKey() },
    });
  },

  getCategoryService: (params: CommonGetAllParams) => {
    return publicRequest(`/auth/get-category-service`, {
      data: { ...params },
      method: "POST",
    });
  },
};

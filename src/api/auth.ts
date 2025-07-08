import {authRequest} from "./base";
import {CommonGetAllParams} from "../constants/types";

export const authAPI = {
  getSEO: () => {
    return authRequest("/auth/get-seo-web", {
      method: "POST",
    });
  },
  login: (data: any) => {
    return authRequest("/auth/user/login", {
      method: "POST",
      data,
    });
  },
  logout: () => {
    return authRequest("/auth/logout", {
      method: "POST",
    });
  },
  register: (data: any) => {
    return authRequest("/auth/register", {
      method: "POST",
      data,
    });
  },
  checkSession: () => {
    return authRequest("/auth/check-session", {
      method: "POST",
    });
  },
  getCategoryService: (params: CommonGetAllParams) => {
    return authRequest(`/auth/get-category-service`, {
      method: "POST",
      data: { ...params },
    });
  },
  getCategories: () => {
    return authRequest(`/auth/get-categories`, {
      method: "POST",
    });
  },
};

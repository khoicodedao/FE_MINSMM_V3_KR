import { GetApiKey } from "utils/user";
import { request } from "./base";
import { CommonGetAllParams } from "constants/types";

export const userAPI = {
  create: (data: any, key: string) => {
    return request("/user", {
      method: "POST",
      data: { ...data, key: key || GetApiKey() },
    });
  },
  getAll: (params: CommonGetAllParams, key: string) => {
    return request("/user/get-all", {
      method: "POST",
      data: { ...params, key: key || GetApiKey() },
    });
  },
  changePass: (data: any, key: string) => {
    return request("/user/change-pass", {
      method: "POST",
      data: { ...data, key: key || GetApiKey() },
    });
  },
  changeEmail: (data: any, key: string) => {
    return request("/user/change-user", {
      method: "POST",
      data: { ...data, key: key || GetApiKey() },
    });
  },
  refreshToken: (key: string) => {
    return request("/user/refresh-token", {
      method: "POST",
      data: { key: key || GetApiKey() },
    });
  },
  getTimeCreateApiKey: (key: string) => {
    return request("/user/get-created-time-api-key", {
      method: "POST",
      data: { key: key || GetApiKey() },
    });
  },
  getUserInfor: (key: string) => {
    return request("/user/get-user-infor", {
      method: "POST",
      data: { key: key || GetApiKey() },
    });
  },
};

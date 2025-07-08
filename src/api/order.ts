import { CommonGetAllParams, OrderType } from "constants/types";
import { request } from "./base";
import { GetApiKey } from "utils/user";

export const orderAPI = {
  create: (data: OrderType, key: string) => {
    return request("/orders/create", {
      method: "POST",
      data: { ...data, key: key || GetApiKey() },
    });
  },
  getAll: (params: CommonGetAllParams, key: string) => {
    return request("/orders/get-all", {
      method: "POST",
      data: { ...params, key: key || GetApiKey() },
    });
  },
  getOrderByUser: (
    params: CommonGetAllParams,
    user_id: number,
    key: string,
  ) => {
    return request(`/orders/${user_id}`, {
      method: "POST",
      data: { ...params, key: key || GetApiKey() },
    });
  },
  refillOrder: (
    params: any,

    key: string,
  ) => {
    return request(`/orders/refill/`, {
      method: "POST",
      data: { ...params, key: key || GetApiKey() },
    });
  },
  cancelOrder: (
    params: any,

    key: string,
  ) => {
    return request(`/orders/cancel`, {
      method: "POST",
      data: { ...params, key: key || GetApiKey() },
    });
  },
};

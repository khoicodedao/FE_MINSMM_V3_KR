import { CommonGetAllParams, PaymentType } from "constants/types";
import { request } from "./base";
import { GetApiKey } from "utils/user";

export const ticketAPI = {
  create: (data: any, key: string) => {
    return request("/tickets/create", {
      method: "POST",
      data: { ...data, key: key || GetApiKey() },
    });
  },
  getTicket: (params: CommonGetAllParams, key: string) => {
    return request("/tickets/get-all", {
      method: "POST",
      data: { ...params, key: key || GetApiKey() },
    });
  },
  addMessage: (data: any, key: string) => {
    return request("/tickets/add-message", {
      method: "POST",
      data: { ...data, key: key || GetApiKey() },
    });
  },
};

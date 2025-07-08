import { GetApiKey } from "utils/user";
import { request } from "./base";

export const categoryAPI = {
  getAllCategory: (key: string) => {
    return request("/categories/get-all", {
      method: "POST",
      data: { key: key || GetApiKey() },
    });
  },
};

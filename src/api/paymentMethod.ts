import {CommonGetAllParams, PaymentType} from "constants/types";
import {request} from "./base";
import {GetApiKey} from "utils/user";

export const paymentMethodAPI = {
    getAll: (params: CommonGetAllParams, key: string) => {
        return request("/payment-methods/get-all", {
            method: "POST",
            data: {...params, key: key || GetApiKey()},
        });
    },
};

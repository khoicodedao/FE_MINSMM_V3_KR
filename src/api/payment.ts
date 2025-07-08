import {CommonGetAllParams, PaymentType} from "constants/types";
import {request} from "./base";
import {GetApiKey} from "utils/user";

export const paymentAPI = {
    create: (data: PaymentType, key: string) => {
        return request("/payments/create", {
            method: "POST",
            data: { ...data, key: key || GetApiKey() },
        });
    },
    getPaymentsByUser: (
        params: CommonGetAllParams,
        user_id: number,
        key: string
    ) => {
        return request(`/payments/get-payments-by-user`, {
            method: "POST",
            data: {...params, key: key || GetApiKey()},
        });
    },
    getQR: (data: PaymentType, key: string) => {
        return request("/payments/get-qr", {
            method: "POST",
            data: { ...data, key: key || GetApiKey() },
        });
    }
};

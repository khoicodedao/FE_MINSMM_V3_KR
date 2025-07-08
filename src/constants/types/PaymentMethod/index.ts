type PaymentMethodType = {
  id?: number;
  key?: number;
  name: string;
  min_charge: number | null;
  max_charge: number | null;
  image?: string;
  data?: string;
  payment_id?: number;
  visibility?: number;
  type?: number;
  allowNewUser: number | null;
  method_name?: string;
  instruction?: string;
  rate?: number;
};

export type { PaymentMethodType };

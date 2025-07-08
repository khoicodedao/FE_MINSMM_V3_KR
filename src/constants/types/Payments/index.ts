type PaymentType = {
  id?: number;
  key?: number;
  content?: string;
  is_auto?: number;
  pro?: number;
  money?: number | null;
  after_money?: number;
  before_money?: number;
  promotion?: number;
  status?: number;
  payment_method_id?: number | null;
  user_id?: number | null;
  user_name?: string;
  memo?: number | null;
};

export type { PaymentType };

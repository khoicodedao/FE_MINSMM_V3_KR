type OrderType = {
  id?: number;
  charge: number | null;
  link: string | null;
  uid: string | null;
  start_count: number | null;
  quantity: number | null;
  remains: number | null;
  mode: string | null;
  is_call: number | null;
  after_money: number | null;
  before_money: number | null;
  note: string | null;
  reason: string | null;
  priority: number | null;
  status: string | null;
  unit_price: number | null;
  user_id: number | null;
  provider_id: number | null;
  category_id?: number | null;
  service_id: number | null;
  type_provider_service?: any;
};

export type { OrderType };

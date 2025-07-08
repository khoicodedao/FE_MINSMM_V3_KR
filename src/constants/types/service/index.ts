type ServiceType = {
  average_time: number | null;
  key?: number;
  id?: number;
  providerId?: number | null;
  name: string;
  mode: string;
  icon: string;
  status: number | null;
  description: string;
  category_id: number | null;
  type: string;
  rate_1000?: number | null;
  min_order: number | null;
  max_order: number | null;
  increment: number | null;
  overflow: number | null;
  provider_service_id: number | null;
  fixed: number | null;
  is_cancel: number | null;
  is_drip_feed: number | null;
  is_sync_feed: number | null;
  percent: number | null;
  provider_name?: string;
};

type ProviderServiceType = {
  id: number;
  service: string;
  name: string;
  type: string;
  category: string;
  rate: number;
  min: number;
  max: number;
  dripfeed: number;
  refill: number;
  cancel: number;
  status: number;
  provider_id: number;
};

export type { ProviderServiceType, ServiceType };

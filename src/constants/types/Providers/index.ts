type ProvidersType = {
  id?: number;
  alias: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date;
  name: string;
  url: string;
  currency: string;
  rate: number | null;
  status: number | null;
  token: string;
  balance: number | null;
  action?: string | null;
};

enum ServiceProviderActionKey {
  BANLANCE = "balance",
  SERVICE = "service",
}

type ProviderSearchType = {
  keyword?: string;
};

export type { ProvidersType, ProviderSearchType };
export { ServiceProviderActionKey };

import { ServiceType } from "constants/types";

type CategoryType = {
  key?: number;
  id?: number;
  name: string;
  position?: "bottom" | "top" | null;
  order: number | null;
  status: number | null;
  icon?: string;
  services?: Array<ServiceType>
};

export type { CategoryType };

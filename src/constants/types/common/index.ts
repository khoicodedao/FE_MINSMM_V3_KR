type CommonGetAllParams =
  | {
      keyword?: string;
      page?: number;
      limit?: number;
      sortBy?: string;
      sortType?: "ASC" | "DES";
      status?: any;
      search_string?: string;
      search_type?: number;
      category_id?: number;
    }
  | undefined;

export type { CommonGetAllParams };

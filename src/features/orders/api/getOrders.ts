import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { OrderListResponse } from "../types";

export const getOrders = (): Promise<OrderListResponse> => {
  return axios.get(`/order/list`);
};

type QueryFnType = typeof getOrders;

export const useOrders = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });
};

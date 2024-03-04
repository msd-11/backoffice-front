import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";
import { ClientListResponse } from "../types";

export const getClients = (): Promise<ClientListResponse> => {
  return axios.get(`/customers`);
};

type QueryFnType = typeof getClients;

export const useClients = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["clients"],
    queryFn: () => getClients(),
  });
};
